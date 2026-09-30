import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Assortiment } from "@/components/sections/Assortiment";
import { Showroom } from "@/components/sections/Showroom";
import { Openingstijden } from "@/components/sections/Openingstijden";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const dict = getDictionary(defaultLocale);

  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        {/* A four-section funnel, deliberately short: what we sell, when you can
            come, how to reach us. Over ons, Diensten and Portfolio moved to
            /over-ons — the business has more than enough tile-setting work and
            wants the homepage selling tiles.
            Backgrounds must keep alternating if this order changes; see the note
            in components/sections/Openingstijden.tsx. */}
        <Hero dict={{ ...dict.hero, imageAlt: dict.meta.ogAlt }} />
        <Assortiment dict={dict.assortiment} />
        <Showroom dict={dict.showroom} />
        <Openingstijden dict={dict.openingstijden} />
        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
