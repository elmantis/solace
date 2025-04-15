import db from "../../../db";
import { advocates } from "../../../db/schema/advocates";
import { specialties } from "../../../db/schema/specialties";
import { advocateSpecialties } from "../../../db/schema/advocateSpecialties";
import * as seed from "../../../db/seed/advocates";


type AdvocateSpecialtyInsert = {
  advocateId: number;
  specialtyId: number;
};

export async function POST() {
  const specialtiesMap = new Map<string, number>();
  const insertedSpecialties = await db.insert(specialties).values(seed.specialties.map((name) => ({ name }))).returning();
  const insertedAdvocates = await db.insert(advocates).values(seed.advocateData.map((advocate) => {

    return { ...advocate, phoneNumber: `${advocate.phoneNumber}` };
  })).returning();
  insertedSpecialties.forEach((spec) => specialtiesMap.set(spec.name, spec.id));

  const advocateSpecialtiesData: AdvocateSpecialtyInsert[] = insertedAdvocates.flatMap((advocate) => {
    const advocateSpecialtiesSet = new Set<string>()

    seed.randomSpecialtyIndex(seed.specialties.length).forEach((index) => advocateSpecialtiesSet.add(seed.specialties[index]))

    const selectedSpecialtyNames: string[] = Array.from(advocateSpecialtiesSet)
    const advocateSpecialties = selectedSpecialtyNames
      .map((name) => ({
        specialtyId: specialtiesMap.get(name),
        advocateId: advocate.id,
      }))
      .filter((entry): entry is AdvocateSpecialtyInsert => entry.specialtyId !== undefined);

    return advocateSpecialties
  })

  await db.insert(advocateSpecialties).values(advocateSpecialtiesData)

  return Response.json({ data: { message: 'successfully imported data' } });
}
