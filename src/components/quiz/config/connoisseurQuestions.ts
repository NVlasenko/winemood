import {
  freshLightImages,
  neutralImages,
  slightlyTartImages,
} from "@/components/quiz/QuizQuestion/config/beginner/taste-profile";

import {
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

import {
  fruityFlavorImages,
} from "@/components/quiz/QuizQuestion/config/enthusiast/flavor-profile";

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
      {
        id: "provence",
        title: "Provence",
        description: "",
        images: higherTierImages,
      },
      {
        id: "ribera-del-duero",
        title: "Ribera del Duero",
        description: "",
        images: midRangeImages,
      },
      {
        id: "open-to-experiment-region",
        title: "Open To Experiment",
        description: "",
        images: neutralWineLevelImages,
      },
    ],
  },
  {
    step: 3,
    question: "Do you have any wine values preferences?",
    options: [
      {
        id: "vegan",
        title: "Vegan",
        description: "",
        images: higherTierImages,
      },
      {
        id: "organic",
        title: "Organic",
        description: "",
        images: midRangeImages,
      },
      {
        id: "sustainable",
        title: "Sustainable",
        description: "",
        images: freshLightImages,
      },
      {
        id: "no-preference",
        title: "No preference",
        description: "",
        images: neutralImages,
      },
    ],
  },
  {
    step: 4,
    question: "Which wine style do you prefer?",
    options: [
      {
        id: "light-bodied",
        title: "Light Bodied",
        description: "",
        images: freshLightImages,
      },
      {
        id: "medium-bodied",
        title: "Medium Bodied",
        description: "",
        images: slightlyTartImages,
      },
      {
        id: "full-bodied",
        title: "Full Bodied",
        description: "",
        images: higherTierImages,
      },
      {
        id: "no-preference",
        title: "No preference",
        description: "",
        images: universalImages,
      },
    ],
  },
 {
     step: 5,
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
    step: 6,
    question: "What aging potential are you looking for?",
    options: [
      {
        id: "drink-now",
        title: "Drink Now",
        description: "I want a wine that is ready to enjoy now",
        images: budgetImages,
      },
      {
        id: "short-term-aging",
        title: "Short-Term Aging",
        description: "I want a wine that can improve over the next few years",
        images: higherTierImages,
      },
      {
        id: "long-term-aging",
        title: "Long-Term Aging",
        description: "I want a wine that can develop over time",
        images: eveningWithFriendsImages,
      },
      {
        id: "no-preference",
        title: "No Preference",
        description: "I’m open to recommendations",
        images: neutralWineLevelImages,
      },
    ],
  },
];