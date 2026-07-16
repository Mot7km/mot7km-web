// app/[locale]/(with-header)/layout.tsx
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}