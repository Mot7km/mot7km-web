import { notFound } from 'next/navigation';
import { allProducts } from '@/data/menu';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductLayout({ children, params }: ProductLayoutProps) {
  const { id } = await params;
  const product = allProducts.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <div className="min-h-screen bg-[var(--color-background)]">{children}</div>;
}