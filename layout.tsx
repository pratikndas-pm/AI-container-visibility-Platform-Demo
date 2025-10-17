import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Container Visibility",
  description: "Predictive ETA & delay risk for container logistics."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800/70">
          <div className="container py-5 flex items-center justify-between">
            <a href="/" className="font-bold tracking-wide">🚢 AI Container Visibility</a>
            <nav className="flex gap-4">
              <a className="hover:underline" href="/demo">Demo</a>
              <a className="hover:underline" href="https://github.com/pratikndas-pm" target="_blank">GitHub</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
      </body>
    </html>
  );
}