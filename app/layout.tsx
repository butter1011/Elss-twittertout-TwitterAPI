import type { Metadata } from "next";
import ToastProvider from "@/components/Contexts/ToastContext";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TwitterTouts Platform",
  description: "This is betting prediction aggregator Platform. Users can view the betting predictions and can sort the feeds according to the winrate when subscribes the membership.",
  metadataBase: new URL('https://twittertoutv2.vercel.app'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
        <body>
          <AuthProvider session={session}>
            <ToastProvider>
                {children}
            </ToastProvider>
          </AuthProvider>
        </body>
    </html>
  );
}