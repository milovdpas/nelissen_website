/**
 * Legal documents (Dutch). Drafted as a starting point — placeholders in
 * [square brackets] MUST be reviewed/completed by the company (and ideally
 * checked by a legal professional) before launch.
 */

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  title: string;
  /** Shown as "Laatst bijgewerkt: …". Update when the text changes. */
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacybeleid",
  updated: "[datum invullen, bijv. 1 juli 2026]",
  intro: [
    "V.O.F. Nelissen Tegelhandel & Tegelzettersbedrijf (“wij”, “ons”) hecht veel waarde aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom, en welke rechten u heeft.",
    "Wij verwerken persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).",
  ],
  sections: [
    {
      heading: "Wie zijn wij?",
      paragraphs: [
        "V.O.F. Nelissen Tegelhandel & Tegelzettersbedrijf",
        "St. Willibrordusstraat 2a, 5351 EH Berghem, Noord-Brabant",
        "Telefoon: +31 412 403251 · E-mail: info@tegelhandelnelissen.nl",
        "KvK-nummer: [KvK-nummer invullen]",
      ],
    },
    {
      heading: "Welke gegevens verzamelen wij?",
      paragraphs: ["Wij verzamelen alleen gegevens die u zelf aan ons verstrekt of die nodig zijn voor de werking van de website:"],
      list: [
        "Contactformulier: uw naam, e-mailadres en de inhoud van uw bericht.",
        "Technische gegevens: bij een bezoek aan de website worden tijdelijk technische gegevens verwerkt (zoals IP-adres) voor de werking en beveiliging van de website.",
        "Statistieken: met uw toestemming verzamelen wij via Google Analytics geanonimiseerde gebruiksstatistieken.",
      ],
    },
    {
      heading: "Waarvoor gebruiken wij uw gegevens?",
      list: [
        "Om uw aanvraag of vraag via het contactformulier te beantwoorden (grondslag: uitvoering van of aanloop tot een overeenkomst, en ons gerechtvaardigd belang om te reageren).",
        "Om de website te beveiligen en goed te laten functioneren (grondslag: gerechtvaardigd belang).",
        "Om het gebruik van de website te analyseren en te verbeteren (grondslag: uw toestemming).",
      ],
    },
    {
      heading: "Hoe lang bewaren wij uw gegevens?",
      paragraphs: [
        "Wij bewaren uw gegevens niet langer dan noodzakelijk. Berichten via het contactformulier bewaren wij maximaal [bewaartermijn invullen, bijv. 12 maanden] na afhandeling, tenzij er een overeenkomst tot stand komt of een wettelijke bewaarplicht geldt.",
      ],
    },
    {
      heading: "Delen met derden",
      paragraphs: ["Wij verkopen uw gegevens niet. Wij schakelen wel de volgende verwerkers in:"],
      list: [
        "Onze hostingpartij, voor het draaien van de website.",
        "Onze e-mail-/SMTP-provider, voor het versturen en ontvangen van berichten.",
        "Google (Google Analytics en Google Maps), uitsluitend met uw toestemming. Zie ons cookiebeleid.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Onze website gebruikt cookies. Noodzakelijke cookies worden altijd geplaatst; statistiek- en externe-mediacookies alleen met uw toestemming. Meer informatie vindt u in ons cookiebeleid. U kunt uw voorkeuren op elk moment aanpassen via “Cookievoorkeuren” onderaan de pagina.",
      ],
    },
    {
      heading: "Beveiliging",
      paragraphs: [
        "Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies of onrechtmatig gebruik, waaronder een beveiligde (HTTPS) verbinding.",
      ],
    },
    {
      heading: "Uw rechten",
      paragraphs: ["U heeft het recht om:"],
      list: [
        "uw gegevens in te zien, te corrigeren of te laten verwijderen;",
        "bezwaar te maken tegen de verwerking en uw toestemming in te trekken;",
        "uw gegevens over te laten dragen (dataportabiliteit).",
      ],
    },
    {
      heading: "Vragen of klachten",
      paragraphs: [
        "Voor vragen over dit privacybeleid of het uitoefenen van uw rechten kunt u contact opnemen via info@tegelhandelnelissen.nl. U heeft daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).",
      ],
    },
    {
      heading: "Wijzigingen",
      paragraphs: [
        "Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest actuele versie vindt u altijd op deze pagina.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  title: "Cookiebeleid",
  updated: "[datum invullen, bijv. 1 juli 2026]",
  intro: [
    "Op deze pagina leggen wij uit welke cookies wij gebruiken en waarvoor. Een cookie is een klein tekstbestand dat bij een bezoek aan de website op uw apparaat wordt opgeslagen.",
  ],
  sections: [
    {
      heading: "Noodzakelijke cookies",
      paragraphs: [
        "Deze cookies zijn vereist voor de basiswerking van de website en worden altijd geplaatst. Hieronder valt een cookie die uw cookievoorkeuren onthoudt (“nelissen_consent”, bewaartermijn: 1 jaar). Hiervoor is geen toestemming nodig.",
      ],
    },
    {
      heading: "Statistiekcookies (Google Analytics)",
      paragraphs: [
        "Met uw toestemming gebruiken wij Google Analytics om geanonimiseerd te meten hoe de website wordt gebruikt, zodat wij deze kunnen verbeteren. Google plaatst hiervoor cookies (zoals “_ga”). Deze cookies worden pas geplaatst nadat u toestemming geeft.",
      ],
    },
    {
      heading: "Externe media (Google Maps)",
      paragraphs: [
        "Op de contactpagina tonen wij met uw toestemming een Google Maps-kaart. Google kan hierbij cookies plaatsen. De kaart wordt pas geladen nadat u externe media accepteert.",
      ],
    },
    {
      heading: "Uw toestemming beheren",
      paragraphs: [
        "Bij uw eerste bezoek vragen wij uw toestemming via de cookiebanner. U kunt uw keuze op elk moment wijzigen of intrekken via de knop “Cookievoorkeuren” onderaan elke pagina. Daarnaast kunt u cookies verwijderen via de instellingen van uw browser.",
      ],
    },
  ],
};
