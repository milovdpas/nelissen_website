import { BRAND } from "@/content/site";

export type Service = {
  title: string;
  desc: string;
  accent: string;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Tegels zetten bij woningen",
    desc: "Van badkamer tot keuken, hal of woonkamer: wij zetten tegels in elk type woning. Professioneel afgewerkt, op een moment dat u uitkomt.",
    accent: BRAND.yellow,
    points: [
      "Badkamers en doucheruimtes",
      "Keukens en achterwanden",
      "Hallen, woonkamers en terrassen",
      "Vloer- én wandtegels",
    ],
  },
  {
    title: "Tegels zetten bij filialen",
    desc: "Voor winkels, horeca, kantoren en bedrijfspanden verzorgen wij complete tegelwerkzaamheden, ook buiten reguliere werktijden.",
    accent: BRAND.blue,
    points: [
      "Winkels en horeca",
      "Kantoren en bedrijfsruimtes",
      "Showrooms en recepties",
      "Buitenruimtes en entrees",
    ],
  },
  {
    title: "Tegelverkoop via showroom",
    desc: "Kom tegels uitzoeken in onze showroom in Berghem. Wij adviseren u graag over de juiste keuze voor uw project.",
    accent: BRAND.red,
    points: [
      "Breed assortiment vloer- en wandtegels",
      "Persoonlijk advies op maat",
      "Tegels voor binnen en buiten",
      "Natuursteenlook- en decortegels",
    ],
  },
];
