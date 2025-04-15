import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { advocateSpecialties } from "./advocateSpecialties";

export const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const advocatesRelations = relations(advocates, ({ many }) => ({
  specialties: many(advocateSpecialties),
}));


