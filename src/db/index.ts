import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const initDb = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");

    throw new Error("Database URL is not set");
  }

  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);

  return db;
};

const db = initDb();

export default db 
