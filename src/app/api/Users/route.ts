// app/api/users/route.ts
import { db } from "@/app/lib/ds";
import { scraps } from "@/app/lib/schema"; // Import scraps instead of users

export async function GET() {
  const allScraps = await db.select().from(scraps); // Query scraps instead of users
  return Response.json(allScraps);
}