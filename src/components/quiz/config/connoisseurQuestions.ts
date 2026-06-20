import {
  freshLightImages,
  fruityImages,
  neutralImages,
  slightlyTartImages,
} from "@/components/quiz/QuizQuestion/config/beginner/taste-profile";

import {
  dinnerAtHomeImages,
  eveningWithFriendsImages,
  somethingTastyImages,
} from "@/components/quiz/QuizQuestion/config/beginner/occasion";

import {
  universalImages,
} from "@/components/quiz/QuizQuestion/config/beginner/food-pairing";

import {
  budgetImages,
  higherTierImages,
  midRangeImages,
  neutralWineLevelImages,
} from "@/components/quiz/QuizQuestion/config/beginner/wine-level";

import type { QuizQuestionConfig } from "./beginnerQuestions";

export const connoisseurQuestions: QuizQuestionConfig[] = [
  {
    step: 2,
    question: "Which regions are you interested in?",
    options: [
      {
        id: "burgundy",
        title: "Burgundy",
        description: "",
        images: higherTierImages,
      },
      {
        id: "bordeaux",
        title: "Bordeaux",
        description: "",
        images: midRangeImages,
      },
      {
        id: "piedmont",
        title: "Piedmont",
        description: "",
        images: neutralImages,
      },
      {
        id: "rioja",
        title: "Rioja",
        description: "",
        images: higherTierImages,
      },
      {
        id: "niche-regions",
        title: "Niche Regions",
        description: "",
        images: somethingTastyImages,
      },
    ],
  },
  {
    step: 3,
    question: "What type of aging do you prefer?",
    options: [
      {
        id: "french-oak",
        title: "French Oak",
        description: "",
        images: higherTierImages,
      },
      {
        id: "american-oak",
        title: "American Oak",
        description: "",
        images: midRangeImages,
      },
      {
        id: "stainless-steel",
        title: "Stainless Steel",
        description: "",
        images: freshLightImages,
      },
      {
        id: "amphora-concrete",
        title: "Amphora / Concrete",
        description: "",
        images: neutralImages,
      },
    ],
  },
  {
    step: 4,
    question: "Which characteristics matter most to you?",
    options: [
      {
        id: "tannins",
        title: "Tannins",
        description: "",
        images: freshLightImages,
      },
      {
        id: "acidity",
        title: "Acidity",
        description: "",
        images: slightlyTartImages,
      },
      {
        id: "body",
        title: "Body",
        description: "",
        images: higherTierImages,
      },
      {
        id: "long-finish",
        title: "Long Finish",
        description: "",
        images: neutralWineLevelImages,
      },
      {
        id: "balance",
        title: "Balance",
        description: "",
        images: universalImages,
      },
    ],
  },
  {
    step: 5,
    question: "Which varieties do you want to explore?",
    options: [
      {
        id: "nebbiolo",
        title: "Nebbiolo",
        description: "",
        images: freshLightImages,
      },
      {
        id: "sangiovese",
        title: "Sangiovese",
        description: "",
        images: dinnerAtHomeImages,
      },
      {
        id: "syrah-shiraz",
        title: "Syrah / Shiraz",
        description: "",
        images: higherTierImages,
      },
      {
        id: "gewurztraminer",
        title: "Gewürztraminer",
        description: "",
        images: fruityImages,
      },
      {
        id: "chenin-blanc",
        title: "Chenin Blanc",
        description: "",
        images: freshLightImages,
      },
    ],
  },
  {
    step: 6,
    question: "What kind of experience are you looking for?",
    options: [
      {
        id: "niche-rare",
        title: "Niche / Rare",
        description: "",
        images: budgetImages,
      },
      {
        id: "high-quality-classics",
        title: "High-Quality Classics",
        description: "",
        images: higherTierImages,
      },
      {
        id: "wines-for-comparative-tasting",
        title: "Wines For Comparative Tasting",
        description: "",
        images: eveningWithFriendsImages,
      },
      {
        id: "wines-for-deep-analysis",
        title: "Wines For Deep Analysis",
        description: "",
        images: neutralWineLevelImages,
      },
      {
        id: "wines-with-aging-potential",
        title: "Wines With Aging Potential",
        description: "",
        images: somethingTastyImages,
      },
    ],
  },
];