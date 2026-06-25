import type { QuizQuestionConfig } from "@/types/quiz";

import {
  AppetizersIcon,
  BudgetIcon,
  CheeseIcon,
  DessertIcon,
  FishIcon,
  FruityFlavorIcon,
  HigherTierIcon,
  MeatIcon,
  MidRangeIcon,
  NeutralWineLevelIcon,
  PastaIcon,
  SpicyFlavorIcon,
  UniversalIcon,
} from "@/components/quiz/QuizQuestion/config/quizIcons";

export const enthusiastQuestions: QuizQuestionConfig[] = [
  {
    step: 2,
    question: "Which sweetness level do you prefer?",
    options: [
      {
        id: "dry",
        title: "Dry",
        description: "",
        Icon: BudgetIcon,
      },
      {
        id: "semi-dry",
        title: "Semi-Dry",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "semi-sweet",
        title: "Semi-Sweet",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "sweet",
        title: "Sweet",
        description: "",
        Icon: NeutralWineLevelIcon,
      },
      {
        id: "brut",
        title: "Brut",
        description: "",
        Icon: FruityFlavorIcon,
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
        Icon: BudgetIcon,
      },
      {
        id: "france",
        title: "France",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "spain",
        title: "Spain",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "usa",
        title: "USA",
        description: "",
        Icon: FruityFlavorIcon,
      },
      {
        id: "portugal",
        title: "Portugal",
        description: "",
        Icon: NeutralWineLevelIcon,
      },
      {
        id: "australia",
        title: "Australia",
        description: "",
        Icon: BudgetIcon,
      },
      {
        id: "open-to-experiment",
        title: "Open To Experiment",
        description: "",
        Icon: NeutralWineLevelIcon,
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
        Icon: BudgetIcon,
      },
      {
        id: "merlot",
        title: "Merlot",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "pinot-noir",
        title: "Pinot Noir",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "chardonnay",
        title: "Chardonnay",
        description: "",
        Icon: FruityFlavorIcon,
      },
      {
        id: "muscat",
        title: "Muscat",
        description: "",
        Icon: FruityFlavorIcon,
      },
      {
        id: "grenache",
        title: "Grenache",
        description: "",
        Icon: NeutralWineLevelIcon,
      },
      {
        id: "blend",
        title: "Blend",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "open-to-experiment-grape",
        title: "Open To Experiment",
        description: "",
        Icon: MidRangeIcon,
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
        Icon: FruityFlavorIcon,
      },
      {
        id: "mineral",
        title: "Mineral",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "oaky-vanilla",
        title: "Oaky / Vanilla",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "spicy",
        title: "Spicy",
        description: "",
        Icon: SpicyFlavorIcon,
      },
      {
        id: "floral",
        title: "Floral",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "nutty-honey",
        title: "Nutty / Honey",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "no-preference",
        title: "No Preference",
        description: "",
        Icon: NeutralWineLevelIcon,
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
        Icon: MidRangeIcon,
      },
      {
        id: "fish-seafood",
        title: "Fish / Seafood",
        description: "",
        Icon: FishIcon,
      },
      {
        id: "pasta-pizza",
        title: "Pasta / Pizza",
        description: "",
        Icon: PastaIcon,
      },
      {
        id: "appetizers",
        title: "Appetizers",
        description: "",
        Icon: AppetizersIcon,
      },
      {
        id: "cheese",
        title: "Cheese",
        description: "",
        Icon: CheeseIcon,
      },
      {
        id: "dessert",
        title: "Dessert",
        description: "",
        Icon: DessertIcon,
      },
      {
        id: "meat",
        title: "Meat",
        description: "",
        Icon: MeatIcon,
      },
      {
        id: "universal",
        title: "Universal / Not Sure",
        description: "",
        Icon: UniversalIcon,
      },
    ],
  },
];