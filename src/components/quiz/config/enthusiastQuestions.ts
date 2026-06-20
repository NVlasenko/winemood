import {
  budgetImages,
  higherTierImages,
  midRangeImages,
  neutralWineLevelImages,
} from "@/components/quiz/QuizQuestion/config/beginner/wine-level";

import {
  fruityFlavorImages,
  spicyFlavorImages,
} from "@/components/quiz/QuizQuestion/config/enthusiast/flavor-profile";

import {
  appetizersImages,
  cheeseImages,
  dessertImages,
  fishImages,
  meatImages,
  pastaImages,
  universalImages,
} from "@/components/quiz/QuizQuestion/config/beginner/food-pairing";

import type { QuizQuestionConfig } from "./beginnerQuestions";

export const enthusiastQuestions: QuizQuestionConfig[] = [
  {
    step: 2,
    question: "Which wine styles do you usually choose?",
    options: [
      {
        id: "dry-white",
        title: "Dry White",
        description: "",
        images: budgetImages,
      },
      {
        id: "aromatic-white",
        title: "Aromatic White",
        description: "",
        images: midRangeImages,
      },
      {
        id: "light-red",
        title: "Light Red",
        description: "",
        images: higherTierImages,
      },
      {
        id: "full-bodied-red",
        title: "Full-Bodied Red",
        description: "",
        images: neutralWineLevelImages,
      },
      {
        id: "sparkling",
        title: "Sparkling",
        description: "",
        images: fruityFlavorImages,
      },
    ],
  },
  {
    step: 3,
    question: "Which countries do you enjoy?",
    options: [
      {
        id: "italy",
        title: "Italy",
        description: "",
        images: budgetImages,
      },
      {
        id: "france",
        title: "France",
        description: "",
        images: midRangeImages,
      },
      {
        id: "spain",
        title: "Spain",
        description: "",
        images: higherTierImages,
      },
      {
        id: "usa",
        title: "USA",
        description: "",
        images: fruityFlavorImages,
      },
      {
        id: "portugal",
        title: "Portugal",
        description: "",
        images: spicyFlavorImages,
      },
      {
        id: "australia",
        title: "Australia",
        description: "",
        images: budgetImages,
      },
      {
        id: "experiment",
        title: "I Want To Experiment",
        description: "",
        images: neutralWineLevelImages,
      },
    ],
  },
  {
    step: 4,
    question: "Which grape varieties do you like?",
    options: [
      {
        id: "cabernet-sauvignon",
        title: "Cabernet Sauvignon",
        description: "",
        images: budgetImages,
      },
      {
        id: "merlot",
        title: "Merlot",
        description: "",
        images: midRangeImages,
      },
      {
        id: "pinot-noir",
        title: "Pinot Noir",
        description: "",
        images: higherTierImages,
      },
      {
        id: "chardonnay",
        title: "Chardonnay",
        description: "",
        images: fruityFlavorImages,
      },
      {
        id: "muscat",
        title: "Muscat",
        description: "",
        images: spicyFlavorImages,
      },
      {
        id: "grenache",
        title: "Grenache",
        description: "",
        images: neutralWineLevelImages,
      },
      {
        id: "experiment-grape",
        title: "I Want To Experiment",
        description: "",
        images: midRangeImages,
      },
    ],
  },
  {
    step: 5,
    question: "What flavor profile are you looking for?",
    options: [
      {
        id: "fruity",
        title: "Fruity",
        description: "",
        images: fruityFlavorImages,
      },
      {
        id: "mineral",
        title: "Mineral",
        description: "",
        images: midRangeImages,
      },
      {
        id: "oaky-vanilla",
        title: "Oaky / Vanilla",
        description: "",
        images: higherTierImages,
      },
      {
        id: "spicy",
        title: "Spicy",
        description: "",
        images: spicyFlavorImages,
      },
    ],
  },
  {
    step: 6,
    question: "What are you planning to eat?",
    options: [
      {
        id: "steak",
        title: "Steak",
        description: "",
        images: meatImages,
      },
      {
        id: "fish-seafood",
        title: "Fish / Seafood",
        description: "",
        images: fishImages,
      },
      {
        id: "pasta",
        title: "Pasta",
        description: "",
        images: pastaImages,
      },
      {
        id: "appetizers",
        title: "Appetizers",
        description: "",
        images: appetizersImages,
      },
      {
        id: "cheese",
        title: "Cheese",
        description: "",
        images: cheeseImages,
      },
      {
        id: "dessert",
        title: "Dessert",
        description: "",
        images: dessertImages,
      },
      {
        id: "universal",
        title: "Universal / Not Sure",
        description: "",
        images: universalImages,
      },
    ],
  },
];