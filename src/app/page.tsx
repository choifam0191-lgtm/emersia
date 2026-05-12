import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProductsSection } from "@/components/ProductsSection";
import { CatalogSection } from "@/components/CatalogSection";
import { ContactSection } from "@/components/ContactSection";

export default function Page() {
  return (
    <main id="top">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <CatalogSection />
      <ContactSection />
    </main>
  );
}
