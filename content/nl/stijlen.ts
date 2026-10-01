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
  {
    slug: "handvorm-tegels",
    name: "Handvorm tegels",
    metaTitle: "Handvorm tegels",
    metaDescription:
      "Handvorm tegels in onze showroom in Berghem. Levendig oppervlak en kleurverschil per tegel, in visgraat of halfsteensverband. Kom ze in het echt bekijken.",
    title: "Handvorm tegels",
    intro:
      "Geen twee tegels precies gelijk. Handvorm tegels hebben een licht golvend oppervlak en kleurverschil per stuk, waardoor een wand gaat leven in plaats van vlak te blijven.",
    blocks: [
      {
        heading: "Waar het verschil zit",
        paragraphs: [
          "Handvormtegels worden in een mal gevormd in plaats van strak geperst. Daardoor lopen de randen iets ongelijk, varieert de glazuurlaag en vangt het oppervlak het licht overal net anders. Dat is precies de bedoeling: over een hele wand ontstaat diepte die een machinaal geperste tegel niet heeft.",
          "Het betekent ook dat u niet op één tegel kunt afgaan. Twee tegels uit dezelfde doos verschillen al, dus de kleur die u kiest beoordeelt u over een groter vlak.",
        ],
      },
      {
        heading: "Het verband bepaalt het karakter",
        paragraphs: [
          "Visgraat is de klassieker en maakt van een achterwand meteen het middelpunt van de keuken. Halfsteensverband is rustiger en werkt beter als de tegel zelf al veel kleurverschil heeft. Verticaal gelegd, in smalle stroken, doet het goed op een lage wand of een kookeiland.",
          "Wij hebben handvorm onder andere verwerkt op een gebogen kookeiland, waarbij iedere rij apart op maat is gesneden. Dat soort werk valt of staat bij het zetten, niet bij de tegel.",
        ],
      },
      {
        heading: "Onderhoud en toepassing",
        paragraphs: [
          "Handvorm is geglazuurd en daarmee goed schoon te houden. In een douche of achter een fornuis is het prima toepasbaar. Het voegen vraagt wel iets meer aandacht, omdat de randen niet kaarsrecht lopen en de voegbreedte dus niet overal gelijk is.",
        ],
      },
    ],
    geschiktVoor: [
      "Keukenachterwanden, waar het kleurverschil het meest opvalt",
      "Badkamers en toiletten die niet strak en wit hoeven te worden",
      "Accentwanden en kookeilanden",
      "Oudere woningen, waar een machinale tegel vaak te vlak oogt",
    ],
    showroomLine:
      "Handvorm beoordeelt u niet op één tegel. Het kleurverschil per stuk ziet u pas over een groter vlak, en dat ligt in onze showroom in Berghem klaar.",
    photos: [
      {
        slug: "handvorm-keuken-groen",
        url: "/images/handvorm-tegels/2ff944e3-ccf4-4867-8ef0-867d3dea3e08.jpg",
        alt: "Keukenachterwand van groene handvormtegels in visgraatverband",
      },
      {
        slug: "handvorm-kookeiland-blauw",
        url: "/images/handvorm-tegels/4a07ed29-ddb2-441b-89e9-ba82df936f55.jpg",
        alt: "Gebogen kookeiland bekleed met lichtblauwe handvormtegels",
      },
      {
        slug: "handvorm-badkamer-terracotta",
        url: "/images/handvorm-tegels/thumbnail.jpg",
        alt: "Terracotta handvormtegels in visgraatverband boven een bad",
      },
    ],
    cardUrl: "/images/handvorm-tegels/4a07ed29-ddb2-441b-89e9-ba82df936f55.jpg",
    cardAlt: "Gebogen kookeiland bekleed met lichtblauwe handvormtegels",
  },
  {
    slug: "slabs-grootformaat",
    name: "Slabs & grootformaat",
    metaTitle: "Slabs en grootformaat tegels",
    metaDescription:
      "Slabs en tegels vanaf 120x120 in onze showroom in Berghem. Minimale voegen, doorlopende tekening en advies over wat de ondergrond aankan.",
    title: "Slabs en grootformaat tegels",
    intro:
      "Hoe groter de tegel, hoe minder voegen. Bij slabs en formaten vanaf 120 bij 120 verdwijnt het raster bijna helemaal en wordt een vloer of wand één doorlopend vlak.",
    blocks: [
      {
        heading: "Wat een slab anders maakt",
        paragraphs: [
          "Een slab is een keramische plaat die veel groter is dan een gewone tegel. Het materiaal is hetzelfde porselein, maar door het formaat loopt de tekening door over de hele plaat. Op een wand achter een bad of in een doucheruimte levert dat een beeld op dat met losse tegels niet te maken is.",
          "Wij verwerken ze ook op maat: om een trapgat heen, in een nis, of doorlopend van de vloer de wand op.",
        ],
      },
      {
        heading: "Wat het vraagt van de ondergrond",
        paragraphs: [
          "Grote formaten zijn onverbiddelijk. Waar een tegel van 30 bij 60 een oneffenheid in de vloer nog kan opvangen, legt een plaat van 120 bij 120 die juist bloot. De ondergrond moet dus vlak zijn voordat er iets gelegd wordt, en bij een verbouwing is dat vaker een punt dan bij nieuwbouw.",
          "Daarnaast is het letterlijk zwaar werk. Een slab tilt u niet alleen, en het zetten gebeurt met zuignappen en stelsystemen om de plaat vlak en op lijn te krijgen.",
        ],
      },
      {
        heading: "Waar het goed uitpakt",
        paragraphs: [
          "In kleinere ruimtes werkt groot formaat vaak beter dan mensen verwachten. Minder voeglijnen maken een badkamer juist rustiger en optisch ruimer. In open woonruimtes loopt een doorlopende vloer door tot in de keuken zonder zichtbare overgang.",
        ],
      },
    ],
    geschiktVoor: [
      "Badkamerwanden, waar minimale voegen het meest opvallen",
      "Doorlopende woonvloeren zonder overgangen",
      "Kleinere ruimtes die rustiger moeten ogen",
      "Vloeren met vloerverwarming",
    ],
    showroomLine:
      "Een plaat van deze afmetingen beoordeelt u niet op een foto. In onze showroom staan ze rechtop, zodat u de tekening op ware grootte ziet lopen.",
    photos: [
      {
        slug: "slab-marmerlook",
        url: "/images/slabs/thumbnail.jpg",
        focus: "top",
        alt: "Wand bekleed met een slab met uitgesproken marmertekening",
      },
      {
        slug: "slab-travertijn-douche",
        url: "/images/slabs/8b83b609-35db-41b8-9227-b40465b741af.jpg",
        alt: "Doucheruimte onder een schuin dak bekleed met travertijnlook slabs",
      },
      {
        slug: "slab-plaatsen",
        url: "/images/carousel/bd5be949-3b25-4b23-821f-5aeb9261dff9.jpg",
        alt: "Slab wordt met zuignappen en laser op de wand gezet",
      },
    ],
    cardUrl: "/images/slabs/thumbnail.jpg",
    cardFocus: "top",
    cardAlt: "Wand bekleed met een slab met uitgesproken marmertekening",
  },
  {
    slug: "badkamertegels",
    name: "Badkamertegels",
    metaTitle: "Badkamertegels",
    metaDescription:
      "Badkamertegels uitzoeken in Berghem: vloer, wand en accent naast elkaar in onze showroom, met advies van tegelzetters die de badkamer ook zelf afwerken.",
    title: "Badkamertegels",
    intro:
      "De badkamer is de ruimte waar tegels het hardst werken: vocht, temperatuurwisselingen en dagelijks gebruik. Het is meestal ook de kleinste ruimte van het huis, waardoor iedere keuze meteen opvalt.",
    blocks: [
      {
        heading: "Vloer, wand en douche vragen elk iets anders",
        paragraphs: [
          "Op de vloer telt stroefheid, zeker in een inloopdouche. Op de wand telt vooral het beeld, en in de douche komt daar de waterdichte opbouw van de ondergrond bij. Overal dezelfde tegel gebruiken kan prima, maar het is een keuze en geen vanzelfsprekendheid.",
          "Wij adviseren meestal om met de vloer te beginnen. Die zet de toon, en er is minder keuze in stroeve vloertegels dan in wandtegels.",
        ],
      },
      {
        heading: "Nissen, afvoeren en afwerking",
        paragraphs: [
          "De details bepalen hoe een badkamer er over tien jaar uitziet. Een nis komt het mooiste uit op hele tegels, een lijnafvoer vraagt afschot in de vloer, en hoeken ogen strakker in verstek dan afgewerkt met een profiel.",
          "Dat is werk dat vooraf uitgetekend moet worden. Daarom vragen wij liever naar de maten van de ruimte dan alleen naar de gewenste kleur.",
        ],
      },
      {
        heading: "Groot of klein formaat",
        paragraphs: [
          "Grote tegels geven rust en minder voegen, kleine formaten en handvorm geven karakter. In een kleine badkamer pakt groot formaat vaak beter uit dan verwacht, en een accentwand in visgraat of decor voorkomt dat het geheel vlak wordt.",
        ],
      },
    ],
    geschiktVoor: [
      "Inloopdouches, met stroeve vloertegels en een lijnafvoer",
      "Kleine badkamers die ruimer moeten ogen",
      "Gastentoiletten, waar een accentwand snel effect heeft",
      "Complete verbouwingen van vloer tot plafond",
    ],
    showroomLine:
      "Een badkamer kiest u niet per tegel maar als geheel: vloer, wand en accent naast elkaar. Daar is onze showroom in Berghem op ingericht.",
    photos: [
      {
        slug: "badkamer-inloopdouche",
        url: "/images/120x120/0e6566b9-7a11-48bd-ae2d-80ca61b5e27e.jpg",
        alt: "Inloopdouche met grootformaat tegels, twee nissen en een lijnafvoer",
      },
      {
        slug: "badkamer-decorwand",
        url: "/images/carousel/96ec67fb-8558-493c-a607-81ce63bed482.jpg",
        alt: "Doucheruimte betegeld met een patchwork van decortegels",
      },
      {
        slug: "badkamer-betonlook",
        url: "/images/badkamers/thumbnail.jpg",
        alt: "Badkamer met betonlook tegels op vloer en wanden en verzonken baden",
      },
    ],
    cardUrl: "/images/120x120/0e6566b9-7a11-48bd-ae2d-80ca61b5e27e.jpg",
    cardAlt: "Inloopdouche met grootformaat tegels, twee nissen en een lijnafvoer",
  },
];

/** Lookup used by the dynamic route and by the homepage cards that link here. */
export function getStijl(slug: string): Stijl | undefined {
  return stijlen.find((s) => s.slug === slug);
}
