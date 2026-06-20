import type { QuizQuestionOption } from "@/components/quiz/QuizQuestion";

import {
  freshLightImages,
  fruityImages,
  neutralImages,
  slightlySweetImages,
  slightlyTartImages,
} from "@/components/quiz/QuizQuestion/config/beginner/taste-profile";

import {
  dateNightImages,
  dinnerAtHomeImages,
  eveningWithFriendsImages,
  giftImages,
  somethingTastyImages,
} from "@/components/quiz/QuizQuestion/config/beginner/occasion";

import {
  appetizersImages,
  cheeseImages,
  dessertImages,
  fishImages,
  meatImages,
  pastaImages,
  universalImages,
} from "@/components/quiz/QuizQuestion/config/beginner/food-pairing";

import {
  budgetImages,
  higherTierImages,
  midRangeImages,
  neutralWineLevelImages,
} from "@/components/quiz/QuizQuestion/config/beginner/wine-level";

export type QuizQuestionConfig = {
  step: number;
  question: string;
  options: QuizQuestionOption[];
};

export const beginnerQuestions: QuizQuestionConfig[] = [
  {
    step: 2,
    question: "Which taste profile feels closest to you?",
    options: [
      {
        id: "slightly-sweet",
        title: "Slightly Sweet",
        description: "I like my wine soft and pleasant",
        images: slightlySweetImages,
      },
      {
        id: "fruity",
        title: "Fruity",
        description: "I want to taste berries and fruit",
        images: fruityImages,
      },
      {
        id: "fresh-light",
        title: "Fresh and Light",
        description: "Something refreshing",
        images: freshLightImages,
      },
      {
        id: "slightly-tart",
        title: "Slightly Tart",
        description: "I enjoy a bright acidity",
        images: slightlyTartImages,
      },
      {
        id: "neutral",
        title: "Neutral",
        description: "I want something balanced",
        images: neutralImages,
      },
    ],
  },
  {
    step: 3,
    question: "What occasion are you choosing wine for?",
    options: [
      {
        id: "date-night",
        title: "Date Night",
        description: "",
        images: dateNightImages,
      },
      {
        id: "evening-with-friends",
        title: "Evening With Friends",
        description: "",
        images: eveningWithFriendsImages,
      },
      {
        id: "dinner-at-home",
        title: "Dinner At Home",
        description: "",
        images: dinnerAtHomeImages,
      },
      {
        id: "gift",
        title: "A Gift",
        description: "",
        images: giftImages,
      },
      {
        id: "something-tasty",
        title: "I Just Want Something Tasty",
        description: "",
        images: somethingTastyImages,
      },
    ],
  },
  {
    step: 4,
    question: "What are you planning to eat?",
    options: [
      {
        id: "meat",
        title: "Meat",
        description: "",
        images: meatImages,
      },
      {
        id: "fish",
        title: "Fish",
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
        id: "cheese",
        title: "Cheese",
        description: "",
        images: cheeseImages,
      },
      {
        id: "appetizers",
        title: "Appetizers",
        description: "",
        images: appetizersImages,
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
  {
    step: 5,
    question: "What wine level feels comfortable for you?",
    options: [
      {
        id: "budget",
        title: "Budget",
        description: "Affordable but tasty",
        images: budgetImages,
      },
      {
        id: "mid-range",
        title: "Mid-Range",
        description: "Something quality without going overboard",
        images: midRangeImages,
      },
      {
        id: "higher-tier",
        title: "Higher Tier",
        description: "I want something more interesting",
        images: higherTierImages,
      },
      {
        id: "neutral-wine-level",
        title: "Neutral",
        description: "Doesn’t matter, as long as it tastes good",
        images: neutralWineLevelImages,
      },
    ],
  },
  {
  step: 6,
  question: "What type of wine do you prefer?",
  options: [
    {
      id: "premium",
      title: "Premium",
      description: "",
      images: budgetImages,
    },
    {
      id: "red",
      title: "Red",
      description: "",
      images: midRangeImages,
    },
    {
      id: "rose",
      title: "Rosé",
      description: "",
      images: higherTierImages,
    },
    {
      id: "sparkling",
      title: "Sparkling",
      description: "",
      images: neutralWineLevelImages,
    },
    {
      id: "not-sure",
      title: "Recommend something",
      description: "",
      images: neutralWineLevelImages,
    },
  ],
},
];