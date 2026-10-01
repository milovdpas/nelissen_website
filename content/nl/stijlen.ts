import type { Focus } from "./image-focus";

export type StijlBlock = {
  heading: string;
  paragraphs: string[];
};

export type StijlPhoto = {
  slug: string;
  url: string;
  /** Which part of the photo to keep when the landscape frame crops it. */
  focus?: Focus;
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
  /**
   * One line for the showroom block that closes the page. Specific to this
   * style: every style has a different reason a screen does not do it justice,
   * and eight pages ending on the same sentence reads as boilerplate.
   */
  showroomLine: string;
  /** Photos for the carousel on this page. */
  photos: StijlPhoto[];
  /** Card image on the /assortiment hub. */
  cardUrl: string;
  cardFocus?: Focus;
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
      "De warme uitstraling van hout, met het gemak van een tegel. Houtlook tegels geven een vloer de sfeer van planken, maar zijn ongevoelig voor vocht, krassen en slijtage. Ook in de badkamer, de keuken of de hal.",
    blocks: [
      {
        heading: "Wat zijn houtlook tegels?",
        paragraphs: [
          "Houtlook tegels zijn keramische tegels met een printlaag die de nerf, kleur en structuur van hout nabootst. Door moderne druktechnieken is het verschil met een echte houten vloer op ooghoogte nauwelijks te zien, terwijl de tegel zelf gewoon keramiek blijft.",
          "Dat verschil merkt u vooral in het onderhoud. Waar een houten vloer periodiek geolied of geschuurd moet worden en slecht tegen water kan, neemt een houtlook tegel geen vocht op.",
        ],
      },
      {
        heading: "Visgraat en andere legpatronen",
        paragraphs: [
          "Houtlook leent zich bij uitstek voor een legpatroon. Visgraat is daarvan de bekendste: smalle tegels die haaks op elkaar worden gelegd, waardoor een vloer richting en rust krijgt. Het patroon is tijdloos, maar het vraagt wel vakwerk. De eerste rijen bepalen of de hele vloer strak uitkomt.",
          "Naast visgraat leggen wij houtlook ook in halfsteensverband of wisselend verband. Wat het beste werkt hangt af van de afmetingen van de ruimte, de lichtinval en het formaat van de tegel. Daar denken wij graag in mee voordat u kiest.",
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
      "Vloeren met vloerverwarming, omdat keramiek warmte beter geleidt dan hout",
    ],
    showroomLine:
      "Houtlook leeft van nerf en kleurverloop, en visgraat laat zich pas beoordelen over een paar vierkante meter. In onze showroom in Berghem liggen ze naast elkaar, zodat u ze in hetzelfde licht kunt vergelijken.",
    photos: [
      {
        slug: "houtlook-visgraat",
        url: "/images/houtlook/3b731ae1-6c89-4bf5-ab7b-741b5fa5318a.jpg",
        focus: "bottom",
        alt: "Houtlook vloertegels in visgraatverband bij een openslaande deur",
      },
      {
        slug: "houtlook-planken",
        url: "/images/houtlook/thumbnail.jpg",
        focus: "bottom",
        alt: "Houtlook vloertegels in lange planken in een lege woonruimte",
      },
      {
        slug: "houtlook-visgraat-leggen",
        url: "/images/carousel/6bdec630-36fa-4354-8acf-3a4e7caf067f.jpg",
        alt: "Houtlook visgraatvloer wordt gelegd met nivelleerclips",
      },
    ],
    cardUrl: "/images/houtlook/3b731ae1-6c89-4bf5-ab7b-741b5fa5318a.jpg",
    cardFocus: "bottom",
    cardAlt: "Houtlook vloertegels in visgraatverband bij een openslaande deur",
  },
];

/** Lookup used by the dynamic route and by the homepage cards that link here. */
export function getStijl(slug: string): Stijl | undefined {
  return stijlen.find((s) => s.slug === slug);
}
