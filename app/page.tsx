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
        <Hero dict={{ ...dict.hero, imageAlt: dict.meta.ogAlt }} />
        <OverOns dict={dict.overOns} />
        <Diensten dict={dict.diensten} />
        <Portfolio dict={dict.portfolio} />
        <Assortiment dict={dict.assortiment} />
        <Openingstijden dict={dict.openingstijden} />
        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
