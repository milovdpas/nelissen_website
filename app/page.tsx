import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { OverOns } from "@/components/sections/OverOns";
import { Diensten } from "@/components/sections/Diensten";
import { Portfolio } from "@/components/sections/Portfolio";
import { Assortiment } from "@/components/sections/Assortiment";
import { Openingstijden } from "@/components/sections/Openingstijden";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const dict = getDictionary(defaultLocale);

  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        {/* Order is deliberate: the showroom sells tiles, so the assortiment
            leads and Portfolio backs it up with proof. Diensten and Over ons —
            the sections about us rather than the product — drop to the back, and
            Openingstijden + Contact close as the "come and see it" pair.
            Backgrounds must keep alternating if this order changes; see the note
            in components/sections/Openingstijden.tsx. */}
        <Hero dict={{ ...dict.hero, imageAlt: dict.meta.ogAlt }} />
        <Assortiment dict={dict.assortiment} />
        <Portfolio dict={dict.portfolio} />
        <Diensten dict={dict.diensten} />
        <OverOns dict={dict.overOns} />
        <Openingstijden dict={dict.openingstijden} />
        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
