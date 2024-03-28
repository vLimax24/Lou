import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google";
import { NavBar } from "@/components/containers/NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "StudentOS",
  description: "Created by vLimax24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className='bg-foreground h-full w-full min-h-screen text-white'>
        <NavBar />
        {children}
        <Toaster />
      </main>
      
  );
}
