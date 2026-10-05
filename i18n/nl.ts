import { services } from "@/content/nl/services";
import { assortiment } from "@/content/nl/assortiment";
import { portfolio } from "@/content/nl/portfolio";
import { tegels } from "@/content/nl/tegels";
import { stijlen } from "@/content/nl/stijlen";

/** A nav entry, optionally with a submenu. Typed explicitly so that `as const`
 *  does not narrow each entry into its own shape, which would leave `children`
 *  missing from the ones that have no submenu. */
export type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

/**
 * Dutch dictionary: every translatable string + the section content arrays.
 * Components read from this shape, never from hardcoded strings.
 */
export const nl = {
  meta: {
    // 51 characters. The old one ran to 64 and Google cut it mid-word around
    // 60. "Tegelzettersbedrijf" came out rather than the showroom: the site is
    // here to sell tiles, and zetwerk is still in the h1, the body and the
    // schema.org name.
    title: "Tegelhandel Nelissen | Tegels & showroom in Berghem",
    description:
      "Tegelhandel Nelissen in Berghem (Noord-Brabant): al 40+ jaar tegels zetten bij woningen en bedrijven, met eigen showroom. Maak vrijblijvend een afspraak.",
    ogAlt: "Showroom van Nelissen Tegelhandel & Tegelzettersbedrijf in Berghem",
  },

  nav: {
    // Root-relative on purpose: these render on /over-ons as well as on the
    // homepage, so a bare "#assortiment" would look for a section that is not
    // on the current page. Nav.tsx and Footer.tsx both render this array.
    links: [
      // `children` renders as a dropdown. The style pages only earn their
      // rankings if they are reachable from every page, and the sitemap alone
      // does not do that.
      {
        href: "/assortiment",
        label: "Assortiment",
        children: stijlen.map((s) => ({ href: `/assortiment/${s.slug}`, label: s.name })),
      },
      { href: "/over-ons", label: "Over ons" },
      { href: "/contact", label: "Contact" },
    ] as NavLink[],
    cta: "Afspraak maken",
    // The page, not the homepage anchor: from a sub-page the anchor would send
    // people back to the homepage to find a form that is already on the page
    // they are reading.
    ctaHref: "/contact",
    home: "/",
    menuLabel: "Menu",
  },

  // Copy below the H1 supplied by Mark. It leads with the product and the
  // showroom instead of the zetwerk: they have more than enough tile-setting
  // work and want to sell more tiles.
  hero: {
    titleLine1: "Vakmanschap",
    titleLine2: "in elke tegel.",
    body: "Van badkamer tot woonkamer en van woning tot bedrijfspand: wij leveren een ruime collectie tegels in diverse stijlen, formaten en uitvoeringen.",
    showroomLine: "Ontdek onze collectie in de showroom. Zes dagen per week geopend op afspraak.",
    ctaPrimary: "Afspraak maken",
    // Points at #assortiment, which now sits directly below the fold.
    ctaSecondary: "Bekijk onze tegels",
    // Leads on showroom availability. The old pair ("Zetwerk op afspraak" /
    // "Showroom open Di 15–19") sold the zetwerk and made the showroom look like
    // a four-hour-a-week operation, which is the opposite of the goal.
    stats: [
      { num: "40+", label: "Jaar ervaring" },
      { num: "Ma–Za", label: "Showroom op afspraak" },
      { num: "Di 15–19", label: "Vrije inloop" },
    ],
  },

  overOns: {
    label: "Over ons",
    titleLine1: "Een familiebedrijf",
    titleLine2: "met vakmanschap.",
    paragraphs: [
      "Nelissen Tegelhandel & Tegelzettersbedrijf is een V.O.F. gevestigd in Berghem, Noord-Brabant. Al meer dan 40 jaar zetten wij tegels bij particulieren en bedrijfspanden, altijd met vakkundige aandacht voor het werk en de klant.",
      "Ons team werkt flexibel: maandag tot en met zaterdag, op afspraak. Naast het zetwerk beschikt u bij ons ook over een showroom waar u tegels kunt bekijken en kopen. Elke dinsdag van 15:00 tot 19:00 uur.",
    ],
    checklist: [
      "Tegelzetten bij woningen en appartementen",
      "Tegelzetten bij winkels en bedrijfspanden",
      "Eigen showroom met breed assortiment",
      "Persoonlijk advies en maatwerk",
    ],
    imageAlt: "Nelissen bedrijfsbus, V.O.F. Tegelhandel & Tegelzettersbedrijf",
  },

  diensten: {
    label: "Diensten",
    title: "Wat wij voor u doen.",
    items: services,
  },

  // Chrome shared by /assortiment and /assortiment/[slug]. The per-style copy
  // lives in content/nl/stijlen.ts.
  assortimentPage: {
    name: "Assortiment",
    metaTitle: "Tegelassortiment",
    metaDescription:
      "Het tegelassortiment van Nelissen in Berghem: houtlook en visgraat, slabs, handvorm, betonlook en meer. Kom de tegels in het echt bekijken in onze showroom.",
    title: "Ons tegelassortiment",
    intro:
      "Wij voeren tegels voor vrijwel iedere toepassing, van vloer tot wand en van klein formaat tot slabs. Hieronder vindt u de stijlen die wij het meest verkopen. Het volledige assortiment staat in onze showroom in Berghem, waar u de tegels op ware grootte en in echt licht ziet.",
    breadcrumbLabel: "Kruimelpad",
    suitableLabel: "Waar het goed tot zijn recht komt",
    siblingsLabel: "Andere stijlen",
  },

  // The showroom section. Deliberately claims no floor area or "X tegels op
  // display" — those numbers have to come from Mark, and an invented one on a
  // page whose whole job is getting people through the door is the last place
  // to guess. The 300–400 figure is his own.
  showroom: {
    label: "Showroom",
    title: "Kom de tegels in het echt zien.",
    paragraphs: [
      "Bijna iedere klant wil een tegel uiteindelijk in het echt zien. Kleur en glans veranderen met het licht, structuur voelt anders dan hij eruitziet, en een patroon beoordeelt u pas goed over een paar vierkante meter. Daarom hebben wij geen webshop maar een showroom.",
      "In Berghem liggen doorgaans drie- tot vierhonderd verschillende tegels. Van de meeste soorten een of twee, want het assortiment beweegt mee met wat fabrikanten maken. Wat er nu ligt, ligt er over een half jaar misschien niet meer. Daarom loont het om gewoon even langs te komen.",
    ],
    points: [
      "Drie- tot vierhonderd verschillende tegels",
      "Advies van mensen die de tegels ook zelf zetten",
      "Zes dagen per week op afspraak, dinsdagmiddag vrije inloop",
    ],
    cta: "Plan uw bezoek",
    imageAlt:
      "Showroom van Tegelhandel Nelissen in Berghem, met rekken vol tegelstalen in diverse formaten en kleuren",
    // Shorter variant for /over-ons, so the two pages do not carry the same
    // block of prose twice.
    compactTitle: "Kom langs in de showroom.",
    compactBody:
      "Onze showroom in Berghem staat vol tegels die u in het echt kunt zien en vergelijken. Zes dagen per week op afspraak, op dinsdagmiddag loopt u zonder afspraak binnen.",
  },

  // Chrome shared by the location pages. The per-place copy lives in
  // content/nl/locaties.ts and is deliberately different per page.
  locatiePage: {
    praktischLabel: "Praktisch",
    assortimentLink: "Bekijk ons assortiment",
  },

  // Page-level chrome for /contact. The form, details and map come from the
  // shared Contact section; only the heading and metadata live here.
  contactPage: {
    metaTitle: "Contact & route",
    metaDescription:
      "Contact met Tegelhandel Nelissen in Berghem: showroom aan de St. Willibrordusstraat 2b, telefoon, e-mail en een vrijblijvende offerteaanvraag.",
    label: "Contact",
    title: "Kom langs of neem contact op.",
    intro:
      "Vragen over tegels, een offerte nodig, of wilt u de showroom bezoeken? Bel of mail ons, of laat hieronder uw gegevens achter. U vindt ons aan de St. Willibrordusstraat 2b in Berghem.",
  },

  // Page-level metadata for /over-ons. The sections themselves keep their own
  // dictionary blocks — only the <title>/<meta> live here.
  overOnsPage: {
    metaTitle: "Over ons",
    metaDescription:
      "Nelissen Tegelhandel & Tegelzettersbedrijf: familiebedrijf in Berghem, al meer dan 40 jaar tegels zetten bij woningen en bedrijfspanden, met eigen showroom.",
    // The page needs its own h1: the three sections below it are built as
    // homepage sections and all open at h2, so without this the page would have
    // no h1 at all.
    label: "Over ons",
    // Deliberately no founding year: the only sourced claim anywhere on the
    // site or in content/site.ts is "40+ jaar", and a specific year would be
    // invented. Ask Mark if he wants one here.
    title: "Al meer dan 40 jaar vakmanschap.",
    intro:
      "Al meer dan 40 jaar zetten wij tegels bij woningen en bedrijfspanden in Noord-Brabant, vanuit onze eigen showroom in Berghem. Hieronder leest u wie wij zijn, wat wij voor u doen en wat wij eerder hebben opgeleverd.",
  },

  portfolio: {
    label: "Portfolio",
    title: "Ons werk, voor u.",
    items: portfolio,
  },

  assortiment: {
    label: "Assortiment",
    // Mark's line. It lives here rather than in the hero: as the second section
    // it is still the first h2 on the page, so the product-led heading stays
    // high up without saying the same thing twice.
    title: "Tegels voor ieder interieur.",
    items: assortiment,
    // Impressions from the showroom, shown under the category cards. Not a
    // catalogue — see the note in content/nl/tegels.ts.
    hubLink: "Toon hele assortiment",
    carouselItems: tegels,
    carousel: {
      label: "Tegels uit onze showroom",
      prev: "Vorige foto",
      next: "Volgende foto",
      goTo: "Ga naar foto",
      // Lightbox. `view` is the accessible name of each slide's button, so it
      // gets the alt text appended and has to read well in front of one.
      view: "Bekijk foto op volledig formaat:",
      close: "Sluiten",
      counterOf: "van",
    },
    footnotePrefix: "Bezoek onze showroom voor het volledige assortiment: ",
    footnoteStrong: "zes dagen per week op afspraak, dinsdag 15:00–19:00 vrije inloop.",
  },

  openingstijden: {
    label: "Openingstijden",
    title: "Wanneer zijn wij bereikbaar?",
    intro:
      "Wij maken onderscheid tussen de openingstijden van onze showroom en de beschikbaarheid voor tegelzetwerk op afspraak.",
    tegelzetter: {
      title: "Tegelzettersbedrijf",
      subtitle: "Woningen & bedrijfspanden",
      rows: [
        { label: "Maandag t/m zaterdag", value: "Op afspraak", highlight: true },
        { label: "Zondag", value: "Gesloten", highlight: false },
      ],
      note: "Bel of mail ons om een afspraak te plannen. Wij werken met flexibele tijden.",
    },
    showroom: {
      title: "Showroom tegelverkoop",
      subtitle: "St. Willibrordusstraat 2b, Berghem",
      // The showroom is open six days a week on appointment, with free walk-in
      // on Tuesday afternoon. The old wording ("uitsluitend geopend op dinsdag")
      // advertised four hours a week, which undersells it badly for a site whose
      // whole job is getting people through the door.
      highlightDay: "Dinsdag, vrije inloop",
      highlightHours: "15:00 – 19:00",
      rows: [
        { label: "Maandag t/m zaterdag", value: "Op afspraak" },
        { label: "Zondag", value: "Gesloten" },
      ],
      noteLead: "Zes dagen per week geopend ",
      noteStrong: "op afspraak",
      noteTail: ". Op dinsdagmiddag loopt u zonder afspraak binnen.",
    },
  },

  contact: {
    label: "Contact",
    title: "Neem contact op.",
    // An appointment needs more from the visitor than a question does, so the
    // extra fields only appear once "Afspraak showroom" is selected.
    type: {
      legend: "Waarvoor neemt u contact op?",
      appointment: "Afspraak showroom",
      question: "Algemene vraag",
    },
    fields: {
      name: { label: "Naam", placeholder: "Uw volledige naam" },
      email: { label: "E-mailadres", placeholder: "uw@emailadres.nl" },
      phone: { label: "Telefoonnummer (optioneel)", placeholder: "06 12345678" },
      date: {
        label: "Voorkeursdatum (optioneel)",
        placeholder: "Kies een datum",
        open: "Kies een voorkeursdatum",
        previousMonth: "Vorige maand",
        nextMonth: "Volgende maand",
        clear: "Wissen",
        closedNote: "Zondag gesloten",
      },
      dayparts: {
        label: "Dagdeel (meerdere mogelijk)",
        options: [
          { value: "ochtend", label: "Ochtend" },
          { value: "middag", label: "Middag" },
          { value: "avond", label: "Avond" },
        ],
      },
      message: { label: "Bericht", placeholder: "Beschrijf uw project of vraag..." },
      messageAppointment: {
        label: "Toelichting (optioneel)",
        // "tegels" on every example on purpose: this is the showroom-visit
        // form, so the prompt should read as something to buy. "terras" on its
        // own invited a request to lay one.
        placeholder: "Waar bent u naar op zoek? Bijvoorbeeld badkamertegels, vloertegels of terrastegels...",
      },
    },
    // Sets the expectation that this is a request, not a confirmed booking.
    appointmentNote:
      "De showroom is maandag tot en met zaterdag geopend op afspraak; op dinsdag van 15:00 tot 19:00 uur loopt u zonder afspraak binnen. Wij bevestigen uw afspraak per e-mail of telefoon.",
    submit: "Verstuur bericht",
    submitAppointment: "Afspraak aanvragen",
    sending: "Versturen...",
    success: {
      title: "Bericht ontvangen!",
      body: "Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.",
    },
    successAppointment: {
      title: "Afspraakverzoek ontvangen!",
      body: "Bedankt voor uw aanvraag. Wij bevestigen uw afspraak zo snel mogelijk per e-mail of telefoon.",
    },
    error:
      "Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.",
    // Shown under the offending field when the API rejects the submission. The
    // wording must match the limits in app/api/contact/route.ts.
    validation: {
      name: "Vul uw naam in (minimaal 2 tekens).",
      email: "Vul een geldig e-mailadres in.",
      phone: "Vul een geldig telefoonnummer in.",
      date: "Kies een datum vanaf vandaag. Op zondag zijn wij gesloten.",
      dayparts: "Kies een geldig dagdeel.",
      message: "Uw bericht moet minimaal 5 tekens bevatten.",
    },
    rateLimited:
      "U heeft zojuist een bericht verstuurd. Wacht even en probeer het opnieuw.",
    details: {
      address: "Adres",
      phone: "Telefoon",
      email: "E-mail",
      showroom: "Showroom",
      // Same reframe as everywhere else: availability first, Tuesday as the
      // bonus. This one sits in the Contact section, which now renders on five
      // pages — so the old "overige dagen" wording was the most visible of the
      // three copies that survived.
      showroomValue: "Ma t/m za op afspraak\nDinsdag 15:00 – 19:00 vrije inloop",
    },
    mapTitle: "Locatie Nelissen Tegelhandel Berghem",
  },

  footer: {
    navHeading: "Navigatie",
    regioHeading: "Werkgebied",
    hoursHeading: "Openingstijden",
    tegelzetterTitle: "Tegelzettersbedrijf",
    tegelzetterValue: "Maandag t/m zaterdag, op afspraak",
    showroomTitle: "Showroom tegelverkoop",
    showroomValue: "Ma t/m za",
    showroomStrong: "op afspraak",
    showroomNote: "Dinsdag 15:00–19:00 vrije inloop",
    rightsReserved: "Alle rechten voorbehouden.",
    legal: {
      privacy: "Privacybeleid",
      cookies: "Cookiebeleid",
      preferences: "Cookievoorkeuren",
    },
  },

  cookies: {
    banner: {
      title: "Cookievoorkeuren",
      body: "Wij gebruiken noodzakelijke cookies voor de werking van de website. Met uw toestemming gebruiken wij ook cookies voor statistieken (Google Analytics) en het tonen van externe media zoals Google Maps.",
      privacyLink: "Lees ons cookiebeleid",
      acceptAll: "Alles accepteren",
      rejectAll: "Alleen noodzakelijk",
      preferences: "Voorkeuren",
      save: "Voorkeuren opslaan",
    },
    always: "Altijd actief",
    categories: {
      necessary: {
        title: "Noodzakelijk",
        desc: "Vereist voor de basisfunctionaliteit van de website, waaronder het onthouden van uw cookievoorkeuren.",
      },
      analytics: {
        title: "Statistieken",
        desc: "Google Analytics, om het gebruik van de website anoniem te meten en te verbeteren.",
      },
      media: {
        title: "Externe media",
        desc: "Ingesloten content van derden, zoals de Google Maps-kaart.",
      },
    },
    map: {
      title: "Kaart niet geladen",
      body: "Om de Google Maps-kaart te tonen plaatsen wij cookies van Google. Accepteer externe media om de kaart te laden.",
      button: "Kaart laden",
    },
  },
} as const;

export type Dictionary = typeof nl;
