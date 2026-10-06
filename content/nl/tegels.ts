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
 * Two photos were held back at first as "untiled" and both readings were wrong:
 * what looked like pipe stubs were levelling clips, and what looked like bare
 * plasterboard was large-format tile laid with butt joints. Both are in use now,
 * one here and one in the Portfolio.
 *
 * The folders under public/images still hold more photos than any page uses.
 * They are kept deliberately, as stock for the style pages not yet written, not
 * because they were judged unusable.
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

  // Added 5 October 2026 at Mark's request: "die 19 fotos dachte we voor dat
  // foto ding onder al die kopjes", and "miss wel leuk zon bietje tegelwerk wa
  // gemaakt word laten zien". Three of the nineteen are not here: two are phone
  // screenshots and one is 372x679, so all three would render soft. They go in
  // as soon as the originals arrive.
  {
    slug: "showroom-rekken-grootformaat",
    url: "/images/showroom/6ffbebc1-6004-4227-ba03-b586cc11058b.jpg",
    alt: "Showroomrekken met grootformaat tegels in beton- en natuursteenlook, met sfeerfoto's ertussen",
  },
  {
    slug: "showroom-display-mytime",
    url: "/images/showroom/aad940d2-1c16-4d47-a918-01b9480a3d9d.jpg",
    alt: "Draaibare showroomdisplay met tegelseries in zachte beigetinten en bijpassende mozaïeken",
  },
  {
    slug: "inloopdouche-zitbank-nis",
    url: "/images/badkamers/44f57662-adb3-4662-b0cc-5ebabed4cea9.jpg",
    alt: "Inloopdouche met lichte natuursteenlook wanden, een donkere vloer, een betegelde zitbank en een nis",
  },
  {
    slug: "douche-groene-marmerlook",
    url: "/images/badkamers/c23ba215-9223-45bf-8212-8f77f0b2ad20.jpg",
    alt: "Doucheruimte volledig betegeld met groene marmerlook tegels en een betegelde zitbank",
  },
  {
    slug: "douchevloer-verstek-lijnafvoer",
    url: "/images/badkamers/c72b5649-b286-4032-9068-b688e9fb11aa.jpg",
    // The floor is the subject; the upper third is plain wall.
    focus: "bottom",
    alt: "Douchevloer waarvan de tegels in verstek naar de lijnafvoer zijn gezaagd",
  },
  {
    slug: "marmerlook-wand-houtlook-vloer",
    url: "/images/badkamers/IMG-20230718-WA0008.jpg",
    alt: "Donkere marmerlook wandtegels boven een houtlook vloer in een badkamer",
  },
  {
    slug: "inloopdouche-nis-tussenwand",
    url: "/images/badkamers/IMG-20240706-WA0005.jpg",
    alt: "Inloopdouche met een betegelde nis achter een tussenwand en een lijnafvoer in de vloer",
  },
  {
    slug: "badkamer-bad-twee-waskommen",
    url: "/images/badkamers/IMG-20241010-WA0000.jpg",
    alt: "Afgewerkte badkamer met vrijstaand bad, twee waskommen op een houten meubel en een houtlook vloer",
  },
  {
    slug: "badkamer-schuin-dak-in-aanbouw",
    url: "/images/badkamers/7a85c6a2-1641-441f-a52e-fa797485d1eb.jpg",
    // Open rafters fill the top of the frame; the tiling is below.
    focus: "bottom",
    alt: "Badkamer in aanbouw onder een schuin dak, met donkere marmerlook tegels al gezet",
  },
  {
    slug: "gang-grootformaat-grijs",
    url: "/images/120x120/7158a245-6ece-4d62-8c35-61e0252915f2.jpg",
    alt: "Gang met grote grijze vloertegels tussen ingebouwde kasten",
  },
  {
    slug: "badkamer-grootformaat-raam",
    url: "/images/120x120/IMG-20241011-WA0001.jpg",
    alt: "Langwerpige badkamer met lichte grootformaat tegels op vloer en wanden en een hoog smal raam",
  },
  {
    slug: "slabs-travertinlook-wand",
    url: "/images/slabs/db30ace3-98ca-4f00-aaa2-4d818a2533a4.jpg",
    alt: "Travertinlook slabs over een hele wand gezet, nog met stelclips op de bouwplaats",
  },
  {
    slug: "toiletruimte-grootformaat-aansluitingen",
    url: "/images/voorraad-tegels/6870c468-9516-4aba-9117-8072d5e58796.jpg",
    alt: "Toiletruimte betegeld met lichte grootformaat tegels, met de aansluitingen nog afgedopt",
  },
  {
    slug: "handvorm-visgraat-bruin-toilet",
    url: "/images/handvorm-tegels/de614a42-add1-45d5-a183-bf1e316cf392.jpg",
    alt: "Bruine handvormtegels in visgraatverband op de wand achter een hangend toilet",
  },
  {
    slug: "handvorm-mintgroen-douche",
    url: "/images/handvorm-tegels/fcf253f5-28e4-4ef4-8c04-117c83401aca.jpg",
    alt: "Mintgroene vierkante handvormtegels in een douche, met de groene laserlijnen nog zichtbaar",
  },
  {
    slug: "houtlook-visgraat-stalen-kozijn",
    url: "/images/houtlook/7dbec0e4-363c-42e7-ab48-3c22c9a46815.jpg",
    alt: "Lichte houtlook visgraatvloer die doorloopt tot aan een stalen deurkozijn",
  },
];
