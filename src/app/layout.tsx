import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/AuthProvider";
import type { Session } from "next-auth";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "StudentOS",
  description: "Created by vLimax24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  session
  
}: {
  children: React.ReactNode;
  session: Session
}) {
  return (
    <html lang="en">
      <AuthProvider session={session}>
        <body className={`font-sans ${inter.variable}`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
