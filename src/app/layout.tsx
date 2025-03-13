import {AuthProvider} from './AuthProvider';
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export const metadata = {
  title: 'Kinde Auth',
  description: 'Kinde with Next.js App Router'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>

      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
      </body>
      </html>
    </AuthProvider>
  );
}