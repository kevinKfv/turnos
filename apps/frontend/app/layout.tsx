import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookFlow - SaaS Appointment Scheduling",
  description: "The modern multi-tenant appointment booking system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
