// src/app/dashboard/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardClient from "./dashboardclient";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser(); // Fetch user data on the server

  return <DashboardClient user={user} />; // Pass user data to the client component
}