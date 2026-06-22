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
    question: "Which sweetness level do you prefer?",
    options: [
      {
        id: "dry",
        title: "Dry",
        description: "",
        images: budgetImages,
      },
      {
        id: "semi-dry",
        title: "Semi-Dry",
        description: "",
        images: midRangeImages,
      },
      {
        id: "semi-sweet",
        title: "Semi-Sweet",
        description: "",
        images: higherTierImages,
      },
      {
        id: "sweet",
        title: "Sweet",
        description: "",
        images: neutralWineLevelImages,
      },
      {
        id: "brut",
        title: "Brut",
        description: "",
        images: fruityFlavorImages,
      },
    ],
  },
  {
    step: 3,
    question: "Which wine countries do you prefer?",
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
        images: neutralWineLevelImages,
      },
      {
        id: "australia",
        title: "Australia",
        description: "",
        images: budgetImages,
      },
      {
        id: "open-to-experiment",
        title: "Open To Experiment",
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
        images: fruityFlavorImages,
      },
      {
        id: "grenache",
        title: "Grenache",
        description: "",
        images: neutralWineLevelImages,
      },
      {
        id: "blend",
        title: "Blend",
        description: "",
        images: midRangeImages,
      },
      {
        id: "open-to-experiment-grape",
        title: "Open To Experiment",
        description: "",
        images: midRangeImages,
      },
    ],
  },

  {
    step: 5,
    question: "Which aroma notes do you prefer?",
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
      {
        id: "floral",
        title: "Floral",
        description: "",
        images: higherTierImages,
      },
      {
        id: "nutty-honey",
        title: "Nutty / Honey",
        description: "",
        images: higherTierImages,
      },
      {
        id: "no-preference",
        title: "No Preference",
        description: "",
        images: neutralWineLevelImages,
      },
    ],
  },
  {
    step: 6,
    question: "What are you planning to eat?",
    options: [
      {
        id: "light-dishes",
        title: "Light Dishes",
        description: "",
        images: midRangeImages,
      },
      {
        id: "fish-seafood",
        title: "Fish / Seafood",
        description: "",
        images: fishImages,
      },
      {
        id: "pasta-pizza",
        title: "Pasta / Pizza",
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
        id: "meat",
        title: "Meat",
        description: "",
        images: meatImages,
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