import CategoryNav from "./CategoryNav";
import DeliveryModes from "./DeliveryModes";
import MainNav from "./MainNav";

export default function Header({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <header className="header-gradient header-shadow">
      <div className="container mx-auto px-4 flex flex-col gap-3 p-2.5 md:gap-4">
        <DeliveryModes />
        <MainNav />
        <CategoryNav params={params} />
      </div>
    </header>
  );
}
