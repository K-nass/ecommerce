import { CartPage } from "@/features/cart";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CartPage locale={locale} />;
}