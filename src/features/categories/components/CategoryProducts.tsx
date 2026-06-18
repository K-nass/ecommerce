import ProductCard from "@/components/ui/ProductCard";
import type { CategoryProduct } from "../types";

interface CategoryProductsProps {
  products: CategoryProduct[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => {
        const discountPercent =
          product.has_discount && product.discount_valid
            ? Math.round(
                (1 - product.current_price / product.price) * 100,
              )
            : 0;

        return (
          <ProductCard
            key={product.id}
            productId={product.id}
            image={product.image.thumbnail}
            title={product.name}
            price={product.current_price}
            originalPrice={product.price}
            discountPercent={discountPercent}
            slug={product.slug}
          />
        );
      })}
    </div>
  );
}
