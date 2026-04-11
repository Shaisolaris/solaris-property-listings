import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solaris Estates — Property Listings",
  description:
    "Search homes for sale with real filters, photo galleries, and direct agent contact. Modern property search that doesn't fight you.",
  openGraph: {
    title: "Solaris Estates — Property Listings",
    description:
      "Modern property search with filters, galleries, and direct agent messaging.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 font-sans text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
