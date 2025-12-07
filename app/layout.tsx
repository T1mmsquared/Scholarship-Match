import type { Metadata } from "next";
import { Inter, Rubik, Fjalla_One } from "next/font/google";
import "./globals.css";

// Primary font: Inter (body text, UI elements)
const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Secondary font: Rubik (headings)
const rubik = Rubik({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Display font: Fjalla One (CTAs, hero text)
const fjallaOne = Fjalla_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scholarship Matcher - Find Your Perfect Scholarships",
  description: "A gamified scholarship matching platform for high school and college students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rubik.variable} ${fjallaOne.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
