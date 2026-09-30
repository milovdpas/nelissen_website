export type LocatieBlock = {
  heading: string;
  paragraphs: string[];
};

export type Locatie = {
  /** Route segment. Mirrors what competitors in this region use (/tegels-oss). */
  slug: string;
  /** Place name, used in breadcrumbs and links. */
  plaats: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  blocks: LocatieBlock[];
  /** Short practical facts, rendered as a list. */
  praktisch: string[];
};

/**
 * Pages for the queries people in this region actually type — "tegels Oss",
 * "tegelhandel Berghem". Every competitor that ranks for those has one
 * (grootintegels.nl/tegels-oss, verwijst.nl/tegels-berghem, rbtegels.nl,
 * marbategels.nl, swanenberg.nu); Nelissen had none.
 *
 * ⚠️ These must NOT become the same page with the place name swapped. Google
 * calls that a doorway page and demotes it, and it deserves to be demoted — it
 * is the same page pretending to be several. Each entry here says something
 * genuinely different: Berghem is "this is where we are", Oss is "this is why
 * people drive out here". Do not add a third location unless there is something
 * true and specific to say about it.
 */
export const locaties: Locatie[] = [
  {
    slug: "tegels-berghem",
    plaats: "Berghem",
    metaTitle: "Tegels kopen in Berghem",
    metaDescription:
      "Tegelhandel Nelissen aan de St. Willibrordusstraat 2b in Berghem: showroom met honderden tegels, zes dagen per week op afspraak en dinsdagmiddag vrije inloop.",
    title: "Tegels kopen in Berghem",
    intro:
      "Onze showroom staat in Berghem, aan de St. Willibrordusstraat 2b. Geen webshop en geen magazijn met een balie ervoor, maar een ruimte waar de tegels liggen zoals ze bij u komen te liggen.",
    blocks: [
      {
        heading: "Wat u bij ons vindt",
        paragraphs: [
          "Wij hebben doorgaans drie- tot vierhonderd verschillende tegels in huis: vloer- en wandtegels, houtlook en visgraat, betonlook, handvorm, grote formaten tot 120×120 en alles wat daarbij hoort voor een complete badkamer. Van de meeste soorten liggen er een of twee, omdat het assortiment meebeweegt met wat fabrikanten maken.",
          "Dat betekent ook dat het loont om even langs te komen in plaats van te bellen. Wat er vandaag ligt, ligt er over een half jaar misschien niet meer — en omgekeerd staat er geregeld iets nieuws.",
        ],
      },
      {
        heading: "Zetwerk en verkoop onder één dak",
        paragraphs: [
          "Nelissen is niet alleen een tegelhandel maar ook een tegelzettersbedrijf. Wij verkopen al meer dan veertig jaar tegels in Berghem en omgeving én leggen ze. Wie u in de showroom adviseert, weet dus uit ervaring hoe een tegel zich laat zetten, wat een patroon kost aan snijverlies en waar u in een kleine badkamer tegenaan loopt.",
          "U bent niet verplicht het zetwerk bij ons af te nemen. Veel klanten kopen alleen de tegels, en dat is prima.",
        ],
      },
    ],
    praktisch: [
      "St. Willibrordusstraat 2b, 5351 EH Berghem",
      "Dinsdag 15:00 – 19:00 vrije inloop, zonder afspraak",
      "Maandag tot en met zaterdag op afspraak",
      "Advies over formaat, patroon en hoeveelheid zonder verplichting",
    ],
  },
  {
    slug: "tegels-oss",
    plaats: "Oss",
    metaTitle: "Tegels kopen in Oss e.o.",
    metaDescription:
      "Op een kwartier rijden vanuit Oss: Tegelhandel Nelissen in Berghem. Showroom met honderden tegels, persoonlijk advies en veertig jaar ervaring met tegelzetten.",
    title: "Tegels kopen in Oss en omgeving",
    intro:
      "Berghem hoort bij de gemeente Oss, dus vanuit Oss bent u er zo. Het scheelt een paar minuten rijden ten opzichte van de woonboulevard, en u komt bij een familiebedrijf terecht in plaats van bij een keten.",
    blocks: [
      {
        heading: "Waarom mensen uit Oss de rit maken",
        paragraphs: [
          "Wie tegels zoekt in Oss heeft keus genoeg, en op prijs alleen wint niemand. Waar wij het verschil maken is het advies: wij verkopen niet alleen tegels, wij leggen ze al meer dan veertig jaar. Dezelfde mensen die u in de showroom te woord staan, staan ook op de vloer.",
          "In de praktijk betekent dat concretere gesprekken. Niet alleen welke tegel mooi is, maar of dat formaat in uw hal uitkomt zonder een rand van vier centimeter, wat visgraat doet met uw materiaalverbruik, en of een lichte voeg in een gang met een hond een goed idee is.",
        ],
      },
      {
        heading: "Een tegel beoordeelt u niet op een scherm",
        paragraphs: [
          "Vrijwel iedere klant wil de tegel uiteindelijk in het echt zien. Kleur en glans veranderen met het licht, structuur voelt anders dan hij eruitziet, en een patroon laat zich pas beoordelen over een paar vierkante meter. Daarom zetten wij geen webshop op, maar zorgen wij dat er in de showroom genoeg ligt om te vergelijken.",
          "Kom gerust langs met een foto van de ruimte, de maten en eventueel een stukje van uw vloer of keukenblad. Daar komen wij een stuk verder mee dan met een kleurnaam.",
        ],
      },
    ],
    praktisch: [
      "Vanuit het centrum van Oss ongeveer tien minuten rijden",
      "St. Willibrordusstraat 2b, 5351 EH Berghem (gemeente Oss)",
      "Dinsdag 15:00 – 19:00 vrije inloop, zonder afspraak",
      "Maandag tot en met zaterdag op afspraak",
    ],
  },
  {
    slug: "tegels-nistelrode",
    plaats: "Nistelrode",
    metaTitle: "Tegels kopen in Nistelrode",
    metaDescription:
      "Vanuit Nistelrode een paar minuten rijden: de tegelshowroom van Nelissen in Berghem. Honderden tegels, rustig vergelijken en zo vaak terugkomen als u wilt.",
    title: "Tegels kopen in Nistelrode",
    intro:
      "Nistelrode ligt praktisch naast de deur. Dat klinkt als een detail, maar het verandert wel hoe u een tegel uitzoekt: u hoeft er geen middag voor vrij te maken.",
    blocks: [
      {
        heading: "Eén keer kijken is meestal niet genoeg",
        paragraphs: [
          "De meeste mensen kiezen hun tegel niet in één bezoek. U ziet iets moois, u twijfelt tussen twee kleuren, en thuis blijkt het licht in de badkamer heel anders te vallen dan in de showroom. Dat is normaal — het is een vloer waar u twintig jaar op kijkt.",
          "Omdat u vanuit Nistelrode zo bij ons bent, kunt u dat gewoon rustig doen. Een keer oriënteren, thuis opmeten, terugkomen met foto's of een stukje van uw keukenblad. Wij zetten de kandidaten dan naast elkaar zodat u ze in hetzelfde licht vergelijkt.",
        ],
      },
      {
        heading: "Neem gerust iets mee",
        paragraphs: [
          "Een kleurnaam zegt weinig. Wat wél helpt: een foto van de ruimte, de maten, en als u die heeft een stukje van de vloer, het aanrechtblad of de kozijnen waar de tegel bij moet passen. Daar kunnen wij veel gerichter op adviseren dan op 'iets in beige'.",
          "Heeft u al een aannemer of tegelzetter? Prima. U kunt bij ons alleen de tegels kopen; wij hoeven het werk niet te doen.",
        ],
      },
    ],
    praktisch: [
      "Vanuit Nistelrode een paar minuten rijden",
      "St. Willibrordusstraat 2b, 5351 EH Berghem",
      "Dinsdag 15:00 – 19:00 vrije inloop, zonder afspraak",
      "Maandag tot en met zaterdag op afspraak",
    ],
  },
  {
    slug: "tegels-uden",
    plaats: "Uden",
    metaTitle: "Tegels kopen in Uden e.o.",
    metaDescription:
      "Tegels kopen én laten zetten in Uden en omgeving. De showroom van Nelissen staat in Berghem, op een kwartiertje rijden. Veertig jaar ervaring met tegelzetten.",
    title: "Tegels kopen in Uden en omgeving",
    intro:
      "Vanuit Uden staat u in een kwartiertje bij onze showroom in Berghem. En anders dan bij een tegelhandel die alleen verkoopt, kunt u het zetwerk hier in dezelfde afspraak regelen.",
    blocks: [
      {
        heading: "Verkoop én zetwerk, ook bij u in de buurt",
        paragraphs: [
          "Nelissen is van oorsprong een tegelzettersbedrijf. Wij zetten al meer dan veertig jaar tegels bij woningen en bedrijfspanden in Noord-Brabant, Uden en omstreken inbegrepen, en verkopen daarnaast uit onze eigen showroom.",
          "Voor u scheelt dat een schakel. Geen tegels bestellen bij de één en vervolgens een zetter zoeken die ermee uit de voeten kan, maar één partij die weet wat er geleverd is en hoe het gelegd moet worden. Wilt u alleen tegels? Ook goed — dat is geen voorwaarde.",
        ],
      },
      {
        heading: "Wat een afspraak oplevert",
        paragraphs: [
          "Wij werken op afspraak, zes dagen per week. Dat is geen drempel maar een voordeel: u loopt niet tegen een drukke zaterdag aan waar drie klanten tegelijk om aandacht vragen. U krijgt de tijd om te vergelijken en vragen te stellen.",
          "Komt u liever onaangekondigd? Op dinsdagmiddag tussen 15:00 en 19:00 kunt u zonder afspraak binnenlopen.",
        ],
      },
    ],
    praktisch: [
      "Vanuit Uden ongeveer een kwartier rijden",
      "St. Willibrordusstraat 2b, 5351 EH Berghem",
      "Wij verzorgen ook tegelzetwerk in Uden en omgeving",
      "Dinsdag 15:00 – 19:00 vrije inloop, overige dagen op afspraak",
    ],
  },
  {
    slug: "tegels-rosmalen",
    plaats: "Rosmalen",
    metaTitle: "Tegels kopen in Rosmalen e.o.",
    metaDescription:
      "Tegels voor verbouwing of nieuwbouw, vanuit Rosmalen op ongeveer twintig minuten. Showroom in Berghem met honderden tegels en advies van ervaren tegelzetters.",
    title: "Tegels kopen in Rosmalen en omgeving",
    intro:
      "Of u nu een badkamer uit de jaren tachtig vervangt of een nieuwbouwvloer uitzoekt: het zijn twee verschillende gesprekken. Vanuit Rosmalen bent u in ongeveer twintig minuten bij onze showroom in Berghem.",
    blocks: [
      {
        heading: "Verbouwing of nieuwbouw scheelt in de keuze",
        paragraphs: [
          "Bij een verbouwing ligt er al iets. De hoogte van de bestaande vloer, de staat van de ondergrond en de aansluiting op de gang bepalen mee wat kan. Soms is een dunnere tegel de oplossing, soms is een groot formaat juist onhandig omdat de vloer niet vlak genoeg is.",
          "Bij nieuwbouw is er meer vrijheid, maar spelen andere dingen: vloerverwarming, de hoeveelheid daglicht en het feit dat u de tegel kiest voordat de ruimte er staat. Dan helpt het om formaten op een grotere oppervlakte te zien in plaats van als los staal.",
        ],
      },
      {
        heading: "Vragen waar wij op doorvragen",
        paragraphs: [
          "Wat komt er op de vloer te staan, hoeveel loop is er, en zit er vloerverwarming onder? Wordt het één doorlopende vloer of een overgang per ruimte? Is de badkamer voor twee personen of voor een gezin met kinderen? Het zijn saaie vragen, maar ze bepalen meer dan de kleur.",
          "Omdat wij de tegels ook zelf zetten, weten wij welke keuzes later vervelend worden. Dat vertellen wij liever vooraf dan achteraf.",
        ],
      },
    ],
    praktisch: [
      "Vanuit Rosmalen ongeveer twintig minuten rijden",
      "St. Willibrordusstraat 2b, 5351 EH Berghem",
      "Advies over ondergrond, formaat en vloerverwarming",
      "Dinsdag 15:00 – 19:00 vrije inloop, overige dagen op afspraak",
    ],
  },
  {
    slug: "tegels-den-bosch",
    plaats: "Den Bosch",
    metaTitle: "Tegels kopen in Den Bosch e.o.",
    metaDescription:
      "Tegels voor een karakteristiek of modern interieur, vanuit Den Bosch op ongeveer een halfuur. Visgraat, handvorm en natuursteenlook in onze showroom in Berghem.",
    title: "Tegels kopen in Den Bosch en omgeving",
    intro:
      "Den Bosch en omgeving zit vol woningen met karakter: oudere panden, hoge plinten, een gang die smaller is dan tegenwoordig gebruikelijk. Dat vraagt iets anders van een tegel dan een nieuwbouwvloer.",
    blocks: [
      {
        heading: "Tegels die bij een ouder interieur passen",
        paragraphs: [
          "In een pand met karakter valt een strakke, spiegelende tegel vaak uit de toon. Wat het meestal wél doet: visgraat, handvormtegels met een levendig oppervlak, of natuursteenlook met wat verloop in de kleur. Die hebben onregelmatigheid in zich, en dat sluit aan bij een interieur dat zelf niet uit één stuk komt.",
          "Visgraat vraagt wel om ruimte en om vakwerk. In een smalle gang kan het patroon onrustig worden, en het legwerk kost meer tijd en meer materiaal door het snijverlies. Dat is geen reden om het niet te doen, wel om het vooraf door te rekenen.",
        ],
      },
      {
        heading: "Waarom de rit de moeite waard is",
        paragraphs: [
          "U heeft in Den Bosch keuze genoeg, dus wij gaan niet doen alsof u hier moet zijn. Wat u bij ons vindt is een kleinere showroom waar u dezelfde mensen spreekt die de tegels ook leggen, en een assortiment dat meebeweegt met wat fabrikanten maken in plaats van met wat een inkoopcombinatie afdwingt.",
          "Wij hebben doorgaans drie- tot vierhonderd verschillende tegels liggen, meestal een of twee per soort. Kom langs met de maten en een foto van de ruimte, dan zoeken wij samen wat past.",
        ],
      },
    ],
    praktisch: [
      "Vanuit Den Bosch ongeveer een halfuur rijden",
      "St. Willibrordusstraat 2b, 5351 EH Berghem",
      "Visgraat, handvorm en natuursteenlook op voorraad",
      "Dinsdag 15:00 – 19:00 vrije inloop, overige dagen op afspraak",
    ],
  },
];

export function getLocatie(slug: string): Locatie | undefined {
  return locaties.find((l) => l.slug === slug);
}
