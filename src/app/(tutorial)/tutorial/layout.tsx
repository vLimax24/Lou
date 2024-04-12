import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"

export const metadata = {
  title: "StudentOS",
  description: "Created by vLimax24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 

  return (
      <main className={`font-open-sans antialiased`}>
        {children}
        <Toaster />
      </main>
      
  )
}
