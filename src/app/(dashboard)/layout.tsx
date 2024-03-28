import "@/styles/globals.css";

export const metadata = {
  title: "StudentOS - Dashboard",
  description: "Dashboard for StudentOS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        {children}
      
    </>
  );
}
