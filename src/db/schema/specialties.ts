import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    serial
} from "drizzle-orm/pg-core";
import { advocates, advocateSpecialties } from "./advocates";

export const specialties = pgTable("specialties", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});

export const specialtiesRelations = relations(specialties, ({ many }) => ({
    advocateSpecialties: many(advocateSpecialties),
    advocates: many(advocates, {
        relationName: 'advocateSpecialties',
    }),
}));