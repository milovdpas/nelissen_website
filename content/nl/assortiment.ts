export type AssortimentItem = {
  label: string;
  /** Image URL. Currently Unsplash stock — swap for the company's own photos. */
  url: string;
  desc: string;
};

export const assortiment: AssortimentItem[] = [
  {
    label: "Vloertegels",
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop&auto=format",
    desc: "Keramische en porcellanaat vloertegels in alle formaten en uitvoeringen.",
  },
  {
    label: "Wandtegels",
    url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&h=400&fit=crop&auto=format",
    desc: "Strakke wandtegels voor badkamer, keuken en toilet.",
  },
  {
    label: "Buitentegels",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    desc: "Antislip terrastegels en bestrating voor buitenruimtes.",
  },
  {
    label: "Natuursteenlook en decor",
    url: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&h=400&fit=crop&auto=format",
    desc: "Tegels met de uitstraling van natuursteen of een decoratief patroon, zonder het onderhoud.",
  },
  {
    label: "Groot formaat",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&auto=format",
    desc: "Strakke uitstraling met tegels vanaf 60×60 cm en groter.",
  },
  {
    label: "Sanitair",
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=400&fit=crop&auto=format",
    desc: "Bijpassend sanitair en accessoires voor de complete badkamer.",
  },
];
