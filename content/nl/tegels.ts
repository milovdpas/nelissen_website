import type { Focus } from "./image-focus";

export type TegelPhoto = {
  /** Stable id, used as the React key. */
  slug: string;
  url: string;
  /** Which part of the photo to keep when the landscape frame crops it. */
  focus?: Focus;
  /** Describes the photo for screen readers and image search. */
  alt: string;
};

/**
 * Photos for the carousel under the assortiment cards.
 *
 * These are impressions, not products, and that is the point. The showroom
 * carries 300-400 different tiles with one or two of each and manufacturers
 * drop a line within a year, so anything resembling a catalogue would be wrong
 * within weeks. Photos here need no relationship to current stock.
 *
 * All Nelissen's own work, supplied October 2026. The set deliberately mixes
 * finished rooms with tiles being laid: the craft is a large part of what makes
 * a visit worth it, and the work-in-progress shots are the most striking ones
 * they have.
 *
 * Every supplied photo that shows tiles is now used here or in the Portfolio.
 * Two were held back at first as "untiled" and both were wrong: what looked like
 * pipe stubs were levelling clips, and what looked like bare plasterboard was
 * large-format tile laid with butt joints.
 */
export const tegels: TegelPhoto[] = [
  {
    slug: "decor-badkamer",
    url: "/images/carousel/96ec67fb-8558-493c-a607-81ce63bed482.jpg",
    alt: "Doucheruimte betegeld met patchwork van decortegels in grijs en bruin",
  },
  {
    slug: "visgraat-handvorm-wand",
    url: "/images/carousel/5f6c6b2c-c16a-4812-8d13-5274204c2a9d.jpg",
    alt: "Tegelzetter legt terracotta handvormtegels in visgraatverband op een wand",
  },
  {
    slug: "octagon-hal",
    url: "/images/carousel/e29e529a-2e8c-4be5-8797-e7ef4e6c1437.jpg",
    alt: "Klassieke zwart-witte octagonvloer met sierrand in een entree",
  },
  {
    slug: "houtlook-vloer",
    url: "/images/houtlook/thumbnail.jpg",
    focus: "bottom",
    alt: "Houtlook vloertegels in lange planken in een lege woonruimte",
  },
  {
    slug: "natuursteenlook-hal",
    url: "/images/carousel/f01b497a-9a78-490d-b196-7b265c6f2465.jpg",
    focus: "bottom",
    alt: "Hal met natuursteenlook vloertegels en bijpassende plinten",
  },
  {
    slug: "houtlook-chevron-bar",
    url: "/images/carousel/5cf783c3-66fe-4681-acf5-a966d95c30d4.jpg",
    // The tiled bar sits in the middle of a working building site.
    focus: "center",
    alt: "Bar bekleed met houtlook tegels in chevronpatroon",
  },
  {
    slug: "visgraat-vloer-leggen",
    url: "/images/carousel/6bdec630-36fa-4354-8acf-3a4e7caf067f.jpg",
    alt: "Houtlook visgraatvloer wordt gelegd met nivelleerclips",
  },
  {
    slug: "bedieningsplaat-betonlook",
    url: "/images/carousel/6d2736b7-18da-45ff-8956-4a81fa4c4d0a.jpg",
    alt: "Bedieningsplaat weggewerkt in een betonlook wandtegel",
  },
  {
    slug: "doucheruimte-schuin-dak",
    // Lives under badkamers/ rather than carousel/: the carousel folder held a
    // byte-identical copy of this file under a placeholder name, which has been
    // removed rather than kept in step with the original.
    url: "/images/badkamers/ddb58f27-89ff-42bb-958c-3df02d127469.jpg",
    alt: "Doucheruimte onder een schuin dak, betegeld met lichtgrijze natuursteenlook tegels en een lijnafvoer",
  },
];
