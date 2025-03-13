import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "../lib/ds";
import { users } from "../lib/schema";
import { eq } from "drizzle-orm";

const quotes = [
  "Save more!!!"
];

// Function to fetch user details
const fetchUserDetails = async () => {
  const { getUser } = getKindeServerSession();
  const userSession = await getUser();
  if (!userSession?.email) return null;

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, userSession.email)) // Matching by email
      .execute();

    return result.length ? result[0] : null;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

// Welcome Component
const Greet = async () => {
  const user = await fetchUserDetails();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="text-center my-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.name || "Guest"}!</h1>
      <p className="text-gray-600 italic mt-2">"{randomQuote}"</p>
    </div>
  );
};

// URL Input Component
const UrlInput = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <input
        type="text"
        placeholder="Paste your URL here..."
        className="border border-gray-300 rounded-lg p-3 w-3/4"
      />
      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Submit
      </button>
    </div>
  );
};

// Dashboard Page
export default function Dashboard() {
  return (
    <div className="flex flex-col items-center p-8">
      <Greet />
      <UrlInput />
    </div>
  );
}
