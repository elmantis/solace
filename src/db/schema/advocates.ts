import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";
import { specialties } from "./specialties";

export const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const advocatesRelations = relations(advocates, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
  specialties: many(specialties, {
    relationName: 'advocateSpecialties', // Use the name of the relation defined on the advocates table
  }),
}));

export const advocateSpecialties = pgTable('advocate_specialties', {
  advocateId: integer('advocate_id').notNull().references(() => advocates.id),
  specialtyId: integer('specialty_id').notNull().references(() => specialties.id),
}, (advocate) => ({
  pk: primaryKey(advocate.advocateId, advocate.specialtyId),
}));

export const advocateSpecialtiesRelations = relations(advocateSpecialties, ({ one }) => ({
  advocate: one(advocates, {
    fields: [advocateSpecialties.advocateId],
    references: [advocates.id],
  }),
  specialty: one(specialties, {
    fields: [advocateSpecialties.specialtyId],
    references: [specialties.id],
  }),
}));