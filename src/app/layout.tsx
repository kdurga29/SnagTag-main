// src/app/layout.tsx
import { AuthProvider } from "./AuthProvider";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata = {
  title: "Kinde Auth",
  description: "Kinde with Next.js App Router",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isAuth = await isAuthenticated(); // Resolve the promise

  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {/* Navigation Bar */}
          <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-end">
              <div className="flex items-center space-x-4">
                {isAuth ? ( // Use the resolved boolean value
                  <a href="/dashboard" className="text-gray-800 hover:text-blue-600">
                    Dashboard
                  </a>
                ) : (
                  <>
                    <LoginLink className="text-gray-800 hover:text-blue-600">
                      Sign In
                    </LoginLink>
                    <RegisterLink className="text-gray-800 hover:text-blue-600">
                      Sign Up
                    </RegisterLink>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}