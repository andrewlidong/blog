import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andrew&apos;s Blog",
  description: "A personal knowledge base and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white dark:bg-gray-900`}>
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Andrew&apos;s Blog</h1>
              <ThemeToggle />
            </div>
            <Sidebar />
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
