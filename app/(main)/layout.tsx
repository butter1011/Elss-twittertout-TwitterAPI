'use client'
import DataProvider from "@/components/Contexts/DataContext";
import TabMenuProvider from "@/components/Contexts/TabMenuContext";
import Navbar from "@/components/Nav";
import { StoreProvider, store } from "@/components/Jotai/store";
import { DevTools } from 'jotai-devtools';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from '@nextui-org/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <DataProvider>
            <TabMenuProvider>
              <StoreProvider>
                <DevTools />
                <div className="h-16 bg-white dark:bg-[#38117F] w-full z-40">
                  <Navbar />
                </div>
                {children}
              </StoreProvider>
            </TabMenuProvider>
          </DataProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}
