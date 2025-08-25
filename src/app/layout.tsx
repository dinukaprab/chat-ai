import type { Metadata } from "next";
import Main from "@/app/Main";

export const metadata: Metadata = {
  title: "Chat AI",
  description: "Smart AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Main children={children} />
    </html>
  );
}
