import CategoryNav from "./CategoryNav";
import DeliveryModes from "./DeliveryModes";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <header className="header-gradient header-shadow py-2">
      <div className="container mx-auto px-4">
        <DeliveryModes />
        <MainNav />
        <CategoryNav />
      </div>
    </header>
  );
}