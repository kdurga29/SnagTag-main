// lib/ds.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";
import * as schema from "./schema"; // Import your schema

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });