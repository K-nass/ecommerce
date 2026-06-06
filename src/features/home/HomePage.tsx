import HeroSwiper from "./components/HeroSwiper";
import { homePageService } from "./services/homePageService";
import type { HomePageSection } from "./types";

function renderSection(section: HomePageSection) {
  switch (section.type) {
    case "banners":
      return <HeroSwiper key={section.id} endpoint={section.endpoint} />;
  }
}

export async function HomePage() {
  const sections = await homePageService.getHomePageSections();

  return (
    <main className="flex flex-col gap-y-5">
      {sections.map(renderSection)}
    </main>
  );
}
