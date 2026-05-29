import Image from "next/image";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  currency?: string;
}

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  currency = "EGP",
}: ProductCardProps) {
  const priceStr = price.toString();
  const integerPart = priceStr.split(".")[0];
  const decimalPart = priceStr.includes(".")
    ? "." + priceStr.split(".")[1]
    : ".00";

  return (
    <div className="max-w-42.5">
      <div className="relative  w-fit p-2 border-2 border-border-subtle rounded-2xl">
        <div className="absolute top-0 left-0 bg-discount text-white font-bold text-xs px-2.5 py-1 z-10 rounded-br-[16px] rounded-tl-[14px]">
          10% OFF
        </div>
        <Image
          className="object-contain"
          src={image}
          width={150}
          height={150}
          alt={title}
        />
        <button className="absolute right-0 bottom-0 bg-primary rounded-full w-10 h-10 text-white font-medium text-2xl border border-white">
          +
        </button>
      </div>
      <div>
        <p className="text-sm leading-4 font-medium line-clamp-2 text-left md:text-md">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex mt-1">
          <span className="text-lg leading-5 font-bold md:text-xl">
            {integerPart}
          </span>
          <div className="flex flex-col">
            <div className="text-sm font-bold leading-2.5">{decimalPart}</div>
            <div className="text-[10px] font-medium leading-2.5">
              {currency}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm leading-4 font-medium text-gray-500 text-left self-center line-through">
            {currency} {originalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
