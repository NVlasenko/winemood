import type { Wine } from "../types/wine";

import wineImage from "../assets/images/wine2.svg";

export const wines: Wine[] = [
  {
    id: 1,
    name: "Barolo Riserva",
    bottleVolume: 750,
    grapeVariety: "Nebbiolo",
    image: wineImage,
    description: "Elegant red wine with cherry, rose, leather and spice notes.",
    rating: 5,
    agingYears: 5,
    alcoholByVolume: 14.5,
    appellation: "Barolo DOCG",
    fermentation: "Oak barrel fermentation",
    vintage: 2010,
    category: {
      id: 1,
      title: "Red Wines",
      type: "RED",
    },
    region: {
      id: 1,
      name: "Piedmont",
    },
    country: {
      id: 1,
      name: "Italy",
    },
    sweetness: "SEMI_SWEET",
    ecoAttributes: ["ORGANIC"],
    aromaticNotes: "Cherry, rose, leather, spice",
    producer: {
      id: 1,
      name: "Casa Vinicola Rossi",
    },
    foods: [
      {
        id: 1,
        name: "Beef steak",
      },
      {
        id: 2,
        name: "Aged cheese",
      },
    ],
  },
  {
    id: 2,
    name: "Chianti Classico",
    bottleVolume: 750,
    grapeVariety: "Sangiovese",
    image: wineImage,
    description: "Bright acidity with red fruits and herbal notes.",
    rating: 4.7,
    agingYears: 3,
    alcoholByVolume: 13.5,
    appellation: "Chianti Classico DOCG",
    fermentation: "Stainless steel",
    vintage: 1999,
    category: {
      id: 1,
      title: "Red Wines",
      type: "RED",
    },
    region: {
      id: 2,
      name: "Tuscany",
    },
    country: {
      id: 1,
      name: "Italy",
    },
    sweetness: "DRY",
    ecoAttributes: ["SUSTAINABLE"],
    aromaticNotes: "Red cherry, violet, herbs",
    producer: {
      id: 2,
      name: "Tenuta Verona",
    },
    foods: [
      {
        id: 3,
        name: "Pasta",
      },
      {
        id: 4,
        name: "Roasted vegetables",
      },
    ],
  },
  {
    id: 3,
    name: "Provence Rosé",
    bottleVolume: 750,
    grapeVariety: "Grenache",
    image: wineImage,
    description: "Fresh rosé with strawberry, citrus and floral notes.",
    rating: 4.6,
    agingYears: 1,
    alcoholByVolume: 12.5,
    appellation: "Côtes de Provence AOC",
    fermentation: "Cold fermentation",
    vintage: 2005,
    category: {
      id: 3,
      title: "Rosé",
      type: "ROSE",
    },
    region: {
      id: 3,
      name: "Provence",
    },
    country: {
      id: 2,
      name: "France",
    },
    sweetness: "DRY",
    ecoAttributes: ["VEGAN"],
    aromaticNotes: "Strawberry, citrus, flowers",
    producer: {
      id: 3,
      name: "Maison Claire",
    },
    foods: [
      {
        id: 5,
        name: "Seafood",
      },
      {
        id: 6,
        name: "Salad",
      },
    ],
  },
  {
    id: 4,
    name: "Brut Sparkling",
    bottleVolume: 750,
    grapeVariety: "Chardonnay",
    image: wineImage,
    description: "Crisp sparkling wine with apple, brioche and mineral finish.",
    rating: 4.8,
    agingYears: 4,
    alcoholByVolume: 12,
    appellation: "Champagne AOC",
    fermentation: "Traditional method",
    vintage: 2007,
    category: {
      id: 4,
      title: "Sparkling",
      type: "SPARKLING",
    },
    region: {
      id: 4,
      name: "Champagne",
    },
    country: {
      id: 2,
      name: "France",
    },
    sweetness: "BRUT",
    ecoAttributes: ["SUSTAINABLE"],
    aromaticNotes: "Apple, brioche, citrus",
    producer: {
      id: 4,
      name: "Domaine Blanc",
    },
    foods: [
      {
        id: 5,
        name: "Seafood",
      },
      {
        id: 7,
        name: "Soft cheese",
      },
    ],
  },
  {
    id: 5,
    name: "Riesling Kabinett",
    bottleVolume: 750,
    grapeVariety: "Riesling",
    image: wineImage,
    description: "Aromatic white wine with peach, lime and honey notes.",
    rating: 4.5,
    agingYears: 2,
    alcoholByVolume: 10.5,
    appellation: "Mosel Qualitätswein",
    fermentation: "Stainless steel",
    vintage: 2003,
    category: {
      id: 2,
      title: "White Wines",
      type: "WHITE",
    },
    region: {
      id: 5,
      name: "Mosel",
    },
    country: {
      id: 3,
      name: "Germany",
    },
    sweetness: "SEMI_SWEET",
    ecoAttributes: ["ORGANIC"],
    aromaticNotes: "Peach, lime, honey",
    producer: {
      id: 5,
      name: "Weingut Keller",
    },
    foods: [
      {
        id: 8,
        name: "Fish",
      },
      {
        id: 9,
        name: "Asian food",
      },
    ],
  },

  {
    id: 6,
    name: "Rioja Reserva",
    bottleVolume: 750,
    grapeVariety: "Tempranillo",
    image: wineImage,
    description: "Rich wine with vanilla, plum, tobacco and oak notes.",
    rating: 4.8,
    agingYears: 6,
    alcoholByVolume: 14,
    appellation: "Rioja DOCa",
    fermentation: "Oak barrel",
    vintage: 2005,
    category: {
      id: 1,
      title: "Red Wines",
      type: "RED",
    },
    region: {
      id: 6,
      name: "Rioja",
    },
    country: {
      id: 4,
      name: "Spain",
    },
    sweetness: "DRY",
    ecoAttributes: ["SUSTAINABLE"],
    aromaticNotes: "Vanilla, plum, oak",
    producer: {
      id: 6,
      name: "Bodega Real",
    },
    foods: [
      {
        id: 10,
        name: "Lamb",
      },
      {
        id: 11,
        name: "Steak",
      },
    ],
  },

  {
    id: 7,
    name: "Pinot Noir Reserve",
    bottleVolume: 750,
    grapeVariety: "Pinot Noir",
    image: wineImage,
    description: "Silky red wine with raspberry, cherry and earthy notes.",
    rating: 4.7,
    agingYears: 3,
    alcoholByVolume: 13,
    appellation: "Bourgogne AOC",
    fermentation: "Open-top fermentation",
    vintage: 2008,
    category: {
      id: 1,
      title: "Red Wines",
      type: "RED",
    },
    region: {
      id: 7,
      name: "Burgundy",
    },
    country: {
      id: 2,
      name: "France",
    },
    sweetness: "DRY",
    ecoAttributes: ["VEGAN"],
    aromaticNotes: "Cherry, raspberry, earth",
    producer: {
      id: 7,
      name: "Domaine Laurent",
    },
    foods: [
      {
        id: 12,
        name: "Duck",
      },
      {
        id: 13,
        name: "Mushrooms",
      },
    ],
  },

  {
    id: 8,
    name: "Sauvignon Blanc",
    bottleVolume: 750,
    grapeVariety: "Sauvignon Blanc",
    image: wineImage,
    description: "Fresh white wine with tropical fruit and grassy aromas.",
    rating: 4.6,
    agingYears: 1,
    alcoholByVolume: 12.8,
    appellation: "Marlborough GI",
    fermentation: "Stainless steel",
    vintage: 2009,
    category: {
      id: 2,
      title: "White Wines",
      type: "WHITE",
    },
    region: {
      id: 8,
      name: "Marlborough",
    },
    country: {
      id: 5,
      name: "New Zealand",
    },
    sweetness: "DRY",
    ecoAttributes: ["ORGANIC"],
    aromaticNotes: "Tropical fruits, citrus, herbs",
    producer: {
      id: 8,
      name: "Cloud Estate",
    },
    foods: [
      {
        id: 14,
        name: "Oysters",
      },
      {
        id: 15,
        name: "Goat cheese",
      },
    ],
  },

  {
    id: 9,
    name: "Amarone Classico",
    bottleVolume: 750,
    grapeVariety: "Corvina",
    image: wineImage,
    description: "Powerful red wine with dried cherry, chocolate and spice.",
    rating: 4.9,
    agingYears: 8,
    alcoholByVolume: 15.5,
    appellation: "Amarone della Valpolicella DOCG",
    fermentation: "Appassimento method",
    vintage: 2011,
    category: {
      id: 1,
      title: "Red Wines",
      type: "RED",
    },
    region: {
      id: 9,
      name: "Veneto",
    },
    country: {
      id: 1,
      name: "Italy",
    },
    sweetness: "DRY",
    ecoAttributes: ["SUSTAINABLE"],
    aromaticNotes: "Dried cherry, chocolate, spice",
    producer: {
      id: 9,
      name: "Villa Verona",
    },
    foods: [
      {
        id: 16,
        name: "Game meat",
      },
      {
        id: 17,
        name: "Blue cheese",
      },
    ],
  },

  {
    id: 10,
    name: "Cava Brut Nature",
    bottleVolume: 750,
    grapeVariety: "Macabeo",
    image: wineImage,
    description: "Dry sparkling wine with citrus, almond and mineral notes.",
    rating: 4.4,
    agingYears: 2,
    alcoholByVolume: 11.8,
    appellation: "Cava DO",
    fermentation: "Traditional method",
    vintage: 2003,
    category: {
      id: 4,
      title: "Sparkling",
      type: "SPARKLING",
    },
    region: {
      id: 10,
      name: "Catalonia",
    },
    country: {
      id: 4,
      name: "Spain",
    },
    sweetness: "BRUT",
    ecoAttributes: ["VEGAN"],
    aromaticNotes: "Citrus, almond, минералы",
    producer: {
      id: 10,
      name: "Bodega Sol",
    },
    foods: [
      {
        id: 18,
        name: "Tapas",
      },
      {
        id: 19,
        name: "Seafood",
      },
    ],
  },
];
