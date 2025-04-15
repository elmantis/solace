import db from "../../../db";
import { advocates } from "../../../db/schema/advocates";
import { specialties } from "../../../db/schema/specialties";
import * as seed from "../../../db/seed/advocates";

export async function POST() {
  const specialtiesMap = new Map<string, number>();
  const insertedSpecialties = await db.insert(specialties).values(seed.specialties.map((name) => ({ name }))).returning({ id: specialties.id, name: specialties.name });
  insertedSpecialties.forEach((spec) => specialtiesMap.set(spec.name, spec.id));
  const advocatesWithSpecialties = seed.advocateData.map((advocate) => {
    const advocateSpecialtiesSet = new Set<string>()

    seed.randomSpecialtyIndex(seed.specialties.length).forEach((index) => advocateSpecialtiesSet.add(seed.specialties[index]))

    const selectedSpecialtyNames: string[] = Array.from(advocateSpecialtiesSet)
    const specialtyIds = selectedSpecialtyNames.map((name) => specialtiesMap.get(name))

    return { ...advocate, specialties: specialtyIds };
  });
  const insertedAdvocates = await db.insert(advocates).values(advocatesWithSpecialties).returning();


  return Response.json({ data: { message: 'successfully imported data' } });
}
