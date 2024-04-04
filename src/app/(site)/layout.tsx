import { NavBar } from "@/components/containers/NavBar";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

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
