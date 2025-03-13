import { db } from "@/app/lib/ds";
import { users } from "@/app/lib/schema";

export async function GET() {
  const allUsers = await db.select().from(users);
  return Response.json(allUsers);
}
