// lib/schema.ts
import { pgTable, serial, text } from "drizzle-orm/pg-core";

// Define the Scraps Table
export const scraps = pgTable("scraps", {
  id: serial("id").primaryKey(),
  kindeId: text("kinde_id").notNull(),
  scrapUrl: text("scrap_url").notNull(),
  data: text("data").array().notNull(), // Array of text
});