// Product detail page - displays individual product
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      {/* Product detail content */}
    </div>
  );
}
