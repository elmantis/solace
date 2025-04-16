import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { advocates } from "./advocates";
import { relations } from "drizzle-orm";
import { specialties } from "./specialties";

export const advocateSpecialties = pgTable('advocate_specialties', {
    advocateId: integer('advocate_id').notNull().references(() => advocates.id),
    specialtyId: integer('specialty_id').notNull().references(() => specialties.id),
}, (table) => ({
    pk: primaryKey(table.advocateId, table.specialtyId),
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