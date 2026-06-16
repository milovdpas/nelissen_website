export type PortfolioItem = {
  /** Image URL. Currently Unsplash stock — swap for the company's own photos. */
  url: string;
  alt: string;
  label: string;
  /** Intrinsic aspect ratio hints kept for next/image. */
  width: number;
  height: number;
};

export const portfolio: PortfolioItem[] = [
  {
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop&auto=format",
    alt: "Moderne badkamer met grote grijze tegels",
    label: "Badkamer renovatie",
    width: 800,
    height: 600,
  },
  {
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=1000&fit=crop&auto=format",
    alt: "Marmerlook vloertegels woonkamer",
    label: "Woonkamer vloer",
    width: 800,
    height: 1000,
  },
  {
    url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=600&fit=crop&auto=format",
    alt: "Witte wandtegels keuken",
    label: "Keuken achterwand",
    width: 800,
    height: 600,
  },
  {
    url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&h=900&fit=crop&auto=format",
    alt: "Buitentegels terras",
    label: "Terras buiten",
    width: 800,
    height: 900,
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&auto=format",
    alt: "Douche met mozaïek tegels",
    label: "Mozaïek douche",
    width: 800,
    height: 600,
  },
  {
    url: "https://images.unsplash.com/photo-1564540583246-934409427776?w=800&h=700&fit=crop&auto=format",
    alt: "Hal met grote formaat tegels",
    label: "Hal grote formaat",
    width: 800,
    height: 700,
  },
];
