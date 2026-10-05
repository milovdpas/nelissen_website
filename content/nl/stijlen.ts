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
  /**
   * Whether this style is live.
   *
   * `false` keeps a finished page in the repo without publishing it: it is left
   * out of the route, the sitemap, the nav dropdown, the hub and the sibling
   * links, and the URL returns 404. Used for a style whose copy is written but
   * whose photos have not arrived.
   *
   * Do not flip this to `true` until `photos` and `cardUrl` are filled, or the
   * hub renders a card with a broken image.
   */
  active: boolean;
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
 * Mark confirmed on 2 October 2026 that they sell betonlook, natuursteenlook and
 * terrastegels. Betonlook and natuursteenlook are live; terrastegels is written
 * but not. Marmerlook, decor and mozaïek are unconfirmed, so they are not here.
 *
 * Terrastegels is written but inactive: there is not a single outdoor photo in
 * public/images. Mark also asked that outdoor work not be pushed too hard, so
 * this page sells the tiles and never the laying.
 *
 * Export `stijlen` for anything user-facing. `alleStijlen` includes the
 * unpublished ones and is only for tooling that genuinely wants the drafts.
 */
export const alleStijlen: Stijl[] = [
  {
    active: true,
    slug: "houtlook-tegels",
    name: "Houtlook & visgraat",
    metaTitle: "Houtlook tegels & visgraat vloeren",
    metaDescription:
      "Houtlook tegels en visgraat vloeren in onze showroom in Berghem. De warme uitstraling van hout, met het gemak van keramiek. Kom ze in het echt bekijken.",
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
    active: true,
    slug: "betonlook-tegels",
    name: "Betonlook",
    metaTitle: "Betonlook tegels",
    metaDescription:
      "Betonlook tegels in onze showroom in Berghem. De strakke uitstraling van beton, zonder het onderhoud, in formaten tot slabs. Kom ze in het echt bekijken.",
    title: "Betonlook tegels",
    intro:
      "De strakke, rustige uitstraling van beton, zonder het stof, de scheuren en het onderhoud. Betonlook geeft een ruimte een neutrale basis die niet gaat overheersen, en laat de rest van het interieur het werk doen.",
    blocks: [
      {
        heading: "Wat zijn betonlook tegels?",
        paragraphs: [
          "Betonlook tegels zijn keramische tegels waarvan de toplaag de kleur en de wolkige structuur van gladgestreken beton nabootst. Op een paar meter afstand is het verschil met een gietvloer nauwelijks te zien.",
          "Het verschil zit in wat erna komt. Een betonvloer moet uitharden, kan krimpscheuren krijgen en wil geïmpregneerd worden om vlekken buiten te houden. Een keramische tegel neemt vrijwel geen vocht op, dus een gemorste fles olie of wijn trekt er niet in.",
        ],
      },
      {
        heading: "Rustig, en daarom veelzijdig",
        paragraphs: [
          "Omdat betonlook weinig tekening heeft, botst hij met vrijwel niets. Hij werkt onder een eiken keuken net zo goed als bij zwart staal of diepgroene kasten, en hij blijft neutraal als u over tien jaar iets anders in de ruimte zet.",
          "De kleuren lopen van bijna wit en zandbeige tot middengrijs en antraciet. Lichte tinten maken een ruimte groter en vergevingsgezinder voor stof, donkere tinten geven juist rust en diepte, maar laten kalkaanslag en voetafdrukken sneller zien.",
        ],
      },
      {
        heading: "Groot formaat, weinig voegen",
        paragraphs: [
          "Betonlook komt het sterkst tot zijn recht in grote formaten, omdat het beeld dan het dichtst bij een doorlopende betonnen wand of vloer komt. Met 120x120 tegels of slabs houdt u op een doucheruimte maar een paar voegen over.",
          "Minder voegen is ook praktisch: voegen zijn het eerste wat vies wordt en het lastigst schoon te houden. In een badkamer of een toilet scheelt dat echt in het onderhoud.",
        ],
      },
      {
        heading: "Beoordeel het in het licht",
        paragraphs: [
          "Betonlook is subtiel. De structuur zit in lichte kleurverschillen en een fijne reliëfwerking, en die ziet u pas goed als het licht er schuin overheen valt. Op een foto of op een klein staal valt dat weg, en dan lijken alle betonlooktegels op elkaar.",
          "In onze showroom in Berghem liggen ze op ware grootte naast elkaar, zodat u de tinten en structuren in hetzelfde licht kunt vergelijken. Kom vrijblijvend langs. Wij zijn zes dagen per week geopend op afspraak, en op dinsdagmiddag van 15:00 tot 19:00 loopt u zonder afspraak binnen.",
        ],
      },
    ],
    geschiktVoor: [
      "Badkamers en doucheruimtes waar u zo min mogelijk voegen wilt",
      "Woonkamers en keukens die een neutrale basis vragen",
      "Bedrijfspanden en praktijkruimtes, dankzij de slijtvastheid",
      "Vloeren met vloerverwarming, omdat keramiek de warmte goed doorgeeft",
    ],
    showroomLine:
      "Betonlook leeft van subtiel kleurverschil en een fijne structuur, en die ziet u pas als het licht er schuin overheen valt. In onze showroom in Berghem liggen de tinten naast elkaar, van zandbeige tot antraciet.",
    photos: [
      {
        slug: "betonlook-wellness-afgewerkt",
        url: "/images/badkamers/thumbnail.jpg",
        alt: "Wellnessruimte met betonlook tegels op wanden, traptreden en verzonken baden",
      },
      {
        slug: "betonlook-inloopdouche-nis",
        url: "/images/badkamers/IMG-20240706-WA0005.jpg",
        alt: "Inloopdouche met betonlook wandtegels en een betegelde nis achter een tussenwand",
      },
      {
        slug: "betonlook-bedieningsplaat",
        url: "/images/carousel/6d2736b7-18da-45ff-8956-4a81fa4c4d0a.jpg",
        alt: "Bedieningsplaat strak weggewerkt in een betonlook wandtegel",
      },
    ],
    cardUrl: "/images/badkamers/IMG-20240706-WA0005.jpg",
    cardAlt: "Inloopdouche met betonlook wandtegels en een betegelde nis",
  },
  {
    active: true,
    slug: "natuursteenlook-tegels",
    name: "Natuursteenlook",
    metaTitle: "Natuursteenlook tegels",
    metaDescription:
      "Natuursteenlook tegels in onze showroom in Berghem. De tekening van leisteen, travertijn en kalksteen, met het gemak van keramiek. Kom ze in het echt bekijken.",
    title: "Natuursteenlook tegels",
    intro:
      "De tekening en het kleurverloop van natuursteen, zonder het impregneren en de vlekgevoeligheid. Natuursteenlook brengt diepte en warmte in een ruimte, maar blijft gewoon een keramische tegel.",
    blocks: [
      {
        heading: "Wat is natuursteenlook?",
        paragraphs: [
          "Natuursteenlook tegels bootsen de tekening van echte steensoorten na: leisteen, travertijn, kalksteen en zandsteen. Moderne druktechnieken leggen daarbij niet alleen de kleur vast, maar ook de aders, de spikkels en de kleine oneffenheden die steen zijn karakter geven.",
          "Echte natuursteen is poreus. Hij moet geïmpregneerd worden, is gevoelig voor zuur uit citroen of schoonmaakmiddel, en kan verkleuren waar hij vaak nat wordt. Keramiek heeft daar geen last van, en dat scheelt vooral in een badkamer of een keuken.",
        ],
      },
      {
        heading: "Welke steensoort past waar?",
        paragraphs: [
          "Leisteen is donker en heeft een duidelijke structuur, en geeft een ruimte meteen gewicht. Travertijn is warm en beige met typische horizontale lijnen, en werkt goed als u het rustig maar niet koud wilt. Kalksteen zit daartussenin: licht, egaal en terughoudend.",
          "In een kleine ruimte werkt een lichte, rustige steenlook vrijwel altijd beter, omdat een sterke tekening de ruimte optisch voller maakt. Op een grote vloer kunt u juist meer tekening hebben, omdat het patroon dan de ruimte krijgt.",
        ],
      },
      {
        heading: "Let op de herhaling",
        paragraphs: [
          "Het verschil tussen een goedkope en een goede natuursteenlook zit vooral in het aantal verschillende tegelgezichten dat een serie heeft. Bij een eenvoudige serie zijn dat er een stuk of vier, en dan ziet u op een vloer van twintig vierkante meter hetzelfde patroon steeds terugkomen.",
          "Betere series hebben er tientallen, waardoor het toeval van echte steen veel beter benaderd wordt. Dat is iets waar u in de showroom op kunt letten, en waar wij u graag op wijzen voordat u kiest.",
        ],
      },
      {
        heading: "Tekening beoordeelt u niet op één tegel",
        paragraphs: [
          "Eén tegel zegt bij natuursteenlook weinig. Het gaat er juist om hoe de tegels zich tot elkaar verhouden, en dat ziet u pas over een paar vierkante meter. Ook kleurverloop tussen tegels valt op een foto weg.",
          "Daarom liggen er in onze showroom in Berghem meerdere steenlooks naast elkaar, op ware grootte. Kom vrijblijvend langs. Wij zijn zes dagen per week geopend op afspraak, en op dinsdagmiddag van 15:00 tot 19:00 loopt u zonder afspraak binnen.",
        ],
      },
    ],
    geschiktVoor: [
      "Badkamers en doucheruimtes, waar echte natuursteen te veel onderhoud vraagt",
      "Hallen en woonkamers die warmte en tekening nodig hebben",
      "Wanden waar u diepte wilt zonder dat het druk wordt",
      "Vloeren met vloerverwarming, waar steen anders koud zou aanvoelen",
    ],
    showroomLine:
      "Natuursteenlook beoordeelt u niet op één tegel: het gaat om hoe de tekening zich over een vloer verdeelt. In onze showroom in Berghem ziet u de series op ware grootte naast elkaar liggen.",
    photos: [
      {
        slug: "natuursteenlook-hal",
        url: "/images/carousel/f01b497a-9a78-490d-b196-7b265c6f2465.jpg",
        focus: "bottom",
        alt: "Hal met natuursteenlook vloertegels met fijne adering en bijpassende plinten",
      },
      {
        slug: "natuursteenlook-inloopdouche",
        url: "/images/badkamers/44f57662-adb3-4662-b0cc-5ebabed4cea9.jpg",
        alt: "Inloopdouche met lichte natuursteenlook wanden, een donkere vloer, een betegelde zitbank en een nis",
      },
      {
        slug: "natuursteenlook-schuin-dak",
        url: "/images/badkamers/ddb58f27-89ff-42bb-958c-3df02d127469.jpg",
        alt: "Doucheruimte onder een schuin dak met lichtgrijze natuursteenlook tegels en een lijnafvoer",
      },
    ],
    cardUrl: "/images/badkamers/44f57662-adb3-4662-b0cc-5ebabed4cea9.jpg",
    cardAlt: "Inloopdouche met lichte natuursteenlook wanden, een zitbank en een nis",
  },
  {
    active: true,
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
    active: true,
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
    active: true,
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
  {
    // NOT LIVE. To publish: fill `photos` with three outdoor shots, set
    // `cardUrl`/`cardAlt` to one of them, then set `active: true`. Nothing else
    // needs changing: the route, sitemap, nav dropdown, hub and sibling links
    // all read the filtered list.
    //
    // The copy deliberately never offers to lay a terrace. Mark: "make er
    // liever nie teveel reclame over zeker in het tegelwerk maken, leveren kan
    // altijd." So this sells the tile and points at the showroom.
    active: false,
    slug: "terrastegels",
    name: "Terras & buiten",
    metaTitle: "Terrastegels & buitentegels",
    metaDescription:
      "Keramische terrastegels en buitentegels in onze showroom in Berghem. Vorstbestendig, kleurvast en onderhoudsarm, in formaten tot 120x120. Kom ze in het echt bekijken.",
    title: "Terrastegels",
    intro:
      "Keramische terrastegels geven een terras dezelfde rust en uitstraling als een tegelvloer binnen, maar dan bestand tegen vorst, regen en fel zonlicht. Wij leveren ze in uiteenlopende formaten, kleuren en structuren.",
    blocks: [
      {
        heading: "Wat zijn keramische terrastegels?",
        paragraphs: [
          "Keramische terrastegels zijn geperste en op hoge temperatuur gebakken tegels, meestal 2 centimeter dik. Die dikte is wat ze geschikt maakt voor buiten: hij geeft de tegel de sterkte om los op split, op tegeldragers of in een zandbed te liggen.",
          "Omdat de tegel vrijwel geen water opneemt, heeft vorst er weinig vat op en trekken mos, bladeren en groene aanslag er niet in. Een terras van keramiek hoeft dan ook niet geïmpregneerd of in de was gezet te worden, zoals natuursteen of beton wel vraagt.",
        ],
      },
      {
        heading: "Formaten, kleuren en structuur",
        paragraphs: [
          "De meest gevraagde maten zijn 60x60, 80x80 en 100x100, maar ook grotere formaten zijn er. Hoe groter de tegel, hoe minder voegen en hoe rustiger een terras oogt. Op een klein terras werkt een kleiner formaat vaak juist prettiger, omdat er minder gezaagd hoeft te worden.",
          "In uitstraling kan vrijwel alles: betonlook, natuursteenlook, houtlook en gezoet of verouderd marmer. Buitentegels hebben een ruwere toplaag dan hun tegenhangers voor binnen, zodat ze stroef blijven als ze nat zijn.",
        ],
      },
      {
        heading: "Dezelfde tegel binnen en buiten",
        paragraphs: [
          "Veel series bestaan in twee diktes: een dunne variant voor binnen en een van 2 centimeter voor buiten, in precies dezelfde kleur en structuur. Daarmee kunt u de vloer van de woonkamer visueel laten doorlopen tot op het terras.",
          "Dat werkt het sterkst bij een brede pui of schuifdeur, waar binnen en buiten in één oogopslag te zien zijn. Wilt u dit, zeg het dan voordat u kiest: niet van elke serie bestaat een buitenvariant, en het is zonde om daar achteraf achter te komen.",
        ],
      },
      {
        heading: "Kleur verandert buiten",
        paragraphs: [
          "Een terrastegel beoordeelt u lastig op een foto of binnen onder kunstlicht. Daglicht is koeler en veel feller, en een natte tegel ziet er bovendien anders uit dan een droge. Grijstinten die binnen warm ogen, kunnen buiten zomaar blauw uitvallen.",
          "In onze showroom in Berghem liggen de buitenseries op ware grootte, zodat u ze naast elkaar kunt vergelijken. Kom vrijblijvend langs. Wij zijn zes dagen per week geopend op afspraak, en op dinsdagmiddag van 15:00 tot 19:00 loopt u zonder afspraak binnen.",
        ],
      },
    ],
    geschiktVoor: [
      "Terrassen en zitgedeeltes die jarenlang kleurvast moeten blijven",
      "Tuinen waar dezelfde tegel binnen en buiten doorloopt",
      "Tuinpaden en opstapjes rond de woning",
      "Balkons en dakterrassen, waar het lage gewicht per vierkante meter telt",
    ],
    showroomLine:
      "Buiten is het licht koeler en feller dan binnen, en een natte tegel oogt anders dan een droge. In onze showroom in Berghem liggen de buitenseries op ware grootte naast elkaar, zodat u ze rustig kunt vergelijken.",
    // Pending: not one outdoor photo exists in public/images yet.
    photos: [],
    cardUrl: "",
    cardAlt: "",
  },
];

/**
 * The styles that are actually published.
 *
 * Everything user-facing imports this rather than `alleStijlen`, so a style
 * cannot leak into the site by someone forgetting to filter. Adding a draft is
 * therefore safe by default, which is the same fail-closed habit as lib/env.ts.
 */
export const stijlen: Stijl[] = alleStijlen.filter((s) => s.active);

/** Lookup used by the dynamic route and by the homepage cards that link here. */
export function getStijl(slug: string): Stijl | undefined {
  return stijlen.find((s) => s.slug === slug);
}
