import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/AuthProvider';
import { getServerAuthSession } from '@/server/auth';
import ConvexClientProvider from '@/lib/ConvexClientProvider';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'StudentOS',
  description: 'Created by vLimax24',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <AuthProvider session={session}>
        <body className={`font-sans ${inter.variable}`}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
