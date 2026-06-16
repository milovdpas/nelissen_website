import { services } from "@/content/nl/services";
import { assortiment } from "@/content/nl/assortiment";
import { portfolio } from "@/content/nl/portfolio";

/**
 * Dutch dictionary: every translatable string + the section content arrays.
 * Components read from this shape, never from hardcoded strings.
 */
export const nl = {
  meta: {
    title: "Tegelhandel Nelissen | Tegelzettersbedrijf & showroom in Berghem",
    description:
      "Nelissen Tegelhandel & Tegelzettersbedrijf in Berghem (Noord-Brabant). Al 25+ jaar vakkundig tegels zetten bij woningen en bedrijfspanden, plus een eigen showroom. Vraag vrijblijvend een offerte aan.",
    ogAlt: "Showroom van Nelissen Tegelhandel & Tegelzettersbedrijf in Berghem",
  },

  nav: {
    links: [
      { href: "#over-ons", label: "Over ons" },
      { href: "#diensten", label: "Diensten" },
      { href: "#portfolio", label: "Portfolio" },
      { href: "#assortiment", label: "Assortiment" },
      { href: "#openingstijden", label: "Openingstijden" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Offerte aanvragen",
    home: "#hero",
    menuLabel: "Menu",
  },

  hero: {
    titleLine1: "Vakmanschap",
    titleLine2: "in elke tegel.",
    body: "Al jaren zetten wij tegels bij woningen en bedrijfspanden in Noord-Brabant. Met oog voor detail, op afspraak, zes dagen per week. Bezoek onze showroom of vraag direct een offerte aan.",
    ctaPrimary: "Offerte aanvragen",
    ctaSecondary: "Showroom bezoeken",
    stats: [
      { num: "25+", label: "Jaar ervaring" },
      { num: "Ma–Za", label: "Zetwerk op afspraak" },
      { num: "Di 15–19", label: "Showroom open" },
    ],
  },

  overOns: {
    label: "Over ons",
    titleLine1: "Een familiebedrijf",
    titleLine2: "met vakmanschap.",
    paragraphs: [
      "Nelissen Tegelhandel & Tegelzettersbedrijf is een V.O.F. gevestigd in Berghem, Noord-Brabant. Al meer dan 25 jaar zetten wij tegels bij particulieren en bedrijfspanden, altijd met vakkundige aandacht voor het werk en de klant.",
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

  portfolio: {
    label: "Portfolio",
    title: "Ons werk, voor u.",
    items: portfolio,
  },

  assortiment: {
    label: "Assortiment",
    title: "Tegels voor elk project.",
    items: assortiment,
    footnotePrefix: "Bezoek onze showroom voor het volledige assortiment: ",
    footnoteStrong: "iedere dinsdag van 15:00 tot 19:00 uur.",
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
      subtitle: "St. Willibrordusstraat 2a, Berghem",
      highlightDay: "Dinsdag",
      highlightHours: "15:00 – 19:00",
      rows: [
        { label: "Overige dagen", value: "Op afspraak" },
        { label: "Zondag", value: "Gesloten" },
      ],
      noteLead: "Showroom uitsluitend geopend op ",
      noteStrong: "dinsdag 15:00–19:00",
      noteTail: ". Buiten deze tijd op afspraak.",
    },
  },

  contact: {
    label: "Contact",
    title: "Neem contact op.",
    fields: {
      naam: { label: "Naam", placeholder: "Uw volledige naam" },
      email: { label: "E-mailadres", placeholder: "uw@emailadres.nl" },
      bericht: { label: "Bericht", placeholder: "Beschrijf uw project of vraag..." },
    },
    submit: "Verstuur bericht",
    sending: "Versturen...",
    success: {
      title: "Bericht ontvangen!",
      body: "Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.",
    },
    error:
      "Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.",
    details: {
      adres: "Adres",
      telefoon: "Telefoon",
      email: "E-mail",
      showroom: "Showroom",
      showroomValue: "Dinsdag 15:00 – 19:00\nOverige dagen op afspraak",
    },
    mapTitle: "Locatie Nelissen Tegelhandel Berghem",
  },

  footer: {
    navHeading: "Navigatie",
    hoursHeading: "Openingstijden",
    tegelzetterTitle: "Tegelzettersbedrijf",
    tegelzetterValue: "Maandag t/m zaterdag, op afspraak",
    showroomTitle: "Showroom tegelverkoop",
    rightsReserved: "Alle rechten voorbehouden.",
  },
} as const;

export type Dictionary = typeof nl;
