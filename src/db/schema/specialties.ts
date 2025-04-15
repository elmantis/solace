import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    serial
} from "drizzle-orm/pg-core";
import { advocateSpecialties } from "./advocateSpecialties";

export const specialties = pgTable("specialties", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});


export const specialtiesRelations = relations(specialties, ({ many }) => ({
    advocates: many(advocateSpecialties),
}));