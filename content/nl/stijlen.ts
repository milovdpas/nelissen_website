export type StijlBlock = {
  heading: string;
  paragraphs: string[];
};

export type StijlPhoto = {
  slug: string;
  url: string;
  alt: string;
};

export type Stijl = {
  /** Route segment: /assortiment/<slug>. Must not change once published. */
  slug: string;
  /** Short label for cards, breadcrumbs and sibling links. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** Page h1. */
  title: string;
  /** Lead paragraph under the h1. */
  intro: string;
  /** Body: each block renders an h2 plus its paragraphs. */
  blocks: StijlBlock[];
  /** Rendered as a checklist — "waar komt dit goed tot zijn recht". */
  geschiktVoor: string[];
  /** Photos for the carousel on this page. */
  photos: StijlPhoto[];
  /** Card image on the /assortiment hub. */
  cardUrl: string;
  cardAlt: string;
};

/**
 * One page per tile *style*, each targeting a search term people actually type.
 *
 * The style is the durable unit, not the tile: a specific product is
 * discontinued within a year if it sells slowly, but "houtlook tegels" is a
 * search term forever. That is why these pages are editorial and carry no
 * stock, prices or product listings — nothing here goes out of date when a
 * range is dropped.
 *
 * This axis is deliberately NOT the six homepage cards. Those are Mark's
 * merchandising and mix stock ("Voorraad tegels"), format ("120×120"), style
 * ("Handvorm") and room ("Badkamers"). These follow search demand. Where the two
 * overlap, the homepage card links straight here.
 *
 * ⚠️ Only one style is written so far, as a template to agree the shape before
 * writing the rest. Still to add: betonlook, natuursteenlook, marmerlook,
 * decor & handvorm, slabs & 120×120, terras- & buitentegels, badkamertegels.
 * Photos are placeholders until Mark's arrive.
 */
export const stijlen: Stijl[] = [
  {
    slug: "houtlook-tegels",
    name: "Houtlook & visgraat",
    metaTitle: "Houtlook tegels & visgraat vloeren",
    metaDescription:
      "Houtlook tegels en visgraat vloeren in onze showroom in Berghem. De warme uitstraling van hout, met het onderhoudsgemak van keramiek. Kom ze in het echt bekijken.",
    title: "Houtlook tegels",
    intro:
      "De warme uitstraling van hout, met het gemak van een tegel. Houtlook tegels geven een vloer de sfeer van planken, maar zijn ongevoelig voor vocht, krassen en slijtage — ook in de badkamer, de keuken of de hal.",
    blocks: [
      {
        heading: "Wat zijn houtlook tegels?",
        paragraphs: [
          "Houtlook tegels zijn keramische of porseleinen tegels met een printlaag die de nerf, kleur en structuur van hout nabootst. Door moderne druktechnieken is het verschil met een echte houten vloer op ooghoogte nauwelijks te zien, terwijl de tegel zelf gewoon keramiek blijft.",
          "Dat verschil merkt u vooral in het onderhoud. Waar een houten vloer periodiek geolied of geschuurd moet worden en slecht tegen water kan, neemt een houtlook tegel geen vocht op, verkleurt hij niet in de zon en is hij bestand tegen krassen van stoelpoten of hondennagels.",
        ],
      },
      {
        heading: "Visgraat en andere legpatronen",
        paragraphs: [
          "Houtlook leent zich bij uitstek voor een legpatroon. Visgraat is daarvan de bekendste: smalle tegels die haaks op elkaar worden gelegd, waardoor een vloer richting en rust krijgt. Het patroon is tijdloos, maar vraagt vakwerk — de eerste rijen bepalen of de hele vloer strak uitkomt.",
          "Naast visgraat leggen wij houtlook ook in halfsteensverband of recht. Wat het beste werkt hangt af van de afmetingen van de ruimte, de lichtinval en het formaat van de tegel. Daar denken wij graag in mee voordat u kiest.",
        ],
      },
      {
        heading: "Zien hoe het er echt uitziet",
        paragraphs: [
          "Een foto van een houtlook tegel zegt maar de helft. Kleur, glans en structuur veranderen met het licht, en een visgraatpatroon laat zich pas goed beoordelen over een paar vierkante meter. Daarom liggen er in onze showroom in Berghem verschillende houtlooktegels naast elkaar, zodat u ze kunt vergelijken op ware grootte.",
          "Kom vrijblijvend langs. Wij zijn zes dagen per week geopend op afspraak, en op dinsdagmiddag van 15:00 tot 19:00 loopt u zonder afspraak binnen.",
        ],
      },
    ],
    geschiktVoor: [
      "Woonkamers en open keukens die een houten uitstraling moeten hebben",
      "Badkamers en toiletten, waar echt hout te veel te lijden heeft",
      "Hallen en gangen, dankzij de slijtvastheid",
      "Vloeren met vloerverwarming — keramiek geleidt warmte beter dan hout",
    ],
    photos: [
      {
        slug: "houtlook-woonkamer",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&auto=format",
        alt: "Woonkamer met houtlook vloertegels",
      },
      {
        slug: "houtlook-hal",
        url: "https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&h=800&fit=crop&auto=format",
        alt: "Hal met vloertegels in een legpatroon",
      },
      {
        slug: "houtlook-keuken",
        url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&h=800&fit=crop&auto=format",
        alt: "Keuken met vloertegels in houtlook",
      },
    ],
    cardUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop&auto=format",
    cardAlt: "Woonkamer met houtlook vloertegels",
  },
];

/** Lookup used by the dynamic route and by the homepage cards that link here. */
export function getStijl(slug: string): Stijl | undefined {
  return stijlen.find((s) => s.slug === slug);
}
