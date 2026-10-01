import type { Focus } from "./image-focus";

export type PortfolioItem = {
  /** Stable id, used as the React key. */
  slug: string;
  url: string;
  /** Which part of the photo to keep in the fixed-height card. */
  focus?: Focus;
  alt: string;
  label: string;
};

/**
 * Work actually carried out by Nelissen, supplied October 2026.
 *
 * Until then this section was headed "Ons werk, voor u." above six Unsplash
 * stock photos labelled as the company's own jobs — the one genuinely untrue
 * thing on the site. These replace them.
 *
 * Weighted towards work in progress rather than finished rooms, which suits the
 * heading: this is the section about what they do, and a tiler setting a slab
 * with suction cups and laser levels says more about craft than an empty room
 * does. Finished results are shown in the assortiment carousel.
 */
export const portfolio: PortfolioItem[] = [
  {
    slug: "handvorm-visgraat-wand",
    url: "/images/carousel/5f6c6b2c-c16a-4812-8d13-5274204c2a9d.jpg",
    alt: "Tegelzetter legt terracotta handvormtegels in visgraatverband",
    label: "Handvorm in visgraat",
  },
  {
    slug: "slab-plaatsen",
    url: "/images/carousel/bd5be949-3b25-4b23-821f-5aeb9261dff9.jpg",
    alt: "Grote travertijnlook slab wordt met zuignappen en laser op de wand gezet",
    label: "Slab plaatsen",
  },
  {
    slug: "octagon-entree",
    url: "/images/carousel/e29e529a-2e8c-4be5-8797-e7ef4e6c1437.jpg",
    alt: "Klassieke zwart-witte octagonvloer met sierrand in een entree",
    label: "Klassieke entreevloer",
  },
  {
    slug: "wellness-betonlook",
    url: "/images/carousel/d142c55d-b98c-43f7-a742-56cc13cbede3.jpg",
    alt: "Betonlook tegels op wanden en traptreden rond verzonken baden",
    label: "Baden en traptreden",
  },
  {
    slug: "houtlook-chevron-bar",
    url: "/images/carousel/5cf783c3-66fe-4681-acf5-a966d95c30d4.jpg",
    alt: "Bar bekleed met houtlook tegels in chevronpatroon",
    label: "Bar in chevronpatroon",
  },
  {
    slug: "visgraat-vloer",
    url: "/images/carousel/6bdec630-36fa-4354-8acf-3a4e7caf067f.jpg",
    alt: "Grote houtlook visgraatvloer wordt gelegd met nivelleerclips",
    label: "Visgraatvloer",
  },
  {
    slug: "toiletruimte-grootformaat",
    url: "/images/carousel/50d797bb-7090-42c3-8f37-0b43278ceb95.jpg",
    alt: "Toiletruimte betegeld met grootformaat tegels, met uitsparingen voor de bedieningsplaat en de aansluitingen",
    label: "Grootformaat met uitsparingen",
  },
];
