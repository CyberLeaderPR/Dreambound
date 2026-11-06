import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dreambound.royalmanny787.chatgpt.site"),
  title: "Dreambound · Build your own kind of rich",
  description: "A two-player life strategy game. Start small, choose your path, and build your dream across 100 levels.",
  manifest: "/manifest.webmanifest",
  openGraph: {title:"Dreambound · Your life. Your choices.",description:"Race a friend, try today’s challenge, or build your 100-level dream. Play in your browser.",images:["/town.webp"]},
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
