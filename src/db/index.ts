import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates, advocatesRelations } from "./schema/advocates";
import { specialties, specialtiesRelations } from "./schema/specialties";
import { advocateSpecialties, advocateSpecialtiesRelations } from "./schema/advocateSpecialties";


const initDb = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");

    throw new Error("Database URL is not set");
  }

  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient, {
    schema: {
      advocates,
      specialties,
      advocatesRelations,
      specialtiesRelations,
      advocateSpecialties,
      advocateSpecialtiesRelations
    }
  });

  return db;
};

const db = initDb();

export default db 
