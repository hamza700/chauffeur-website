import localFont from 'next/font/local';
import '../globals.css';
import Header from '@/sections/header/header';
import Footer from '@/sections/footer/footer';
import { AuthProvider as SupabaseAuthProvider } from '@/auth/context/supabase';
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const AuthProvider = SupabaseAuthProvider;

export const metadata = {
  title: 'Chauffeur Website',
  description: 'Chauffeur Website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
