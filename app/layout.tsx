import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Health Metrics",
  description: "A health metrics tracking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <body className="bg-background text-foreground">
        <NavBar />
        <main className="flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}