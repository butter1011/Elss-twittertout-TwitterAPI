import Sidebar from "@/components/Nav/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page_content bg-gray-100 dark:bg-[#38117F] flex gap-4 flex-row p-4">
      <Sidebar />
      {children}
    </div >
  );
}