import type { QuizQuestionConfig } from "@/types/quiz";

import {
  AppetizersIcon,
  BudgetIcon,
  CheeseIcon,
  DateNightIcon,
  DessertIcon,
  DinnerAtHomeIcon,
  EveningWithFriendsIcon,
  FishIcon,
  FreshLightIcon,
  FruityIcon,
  GiftIcon,
  HigherTierIcon,
  MeatIcon,
  MidRangeIcon,
  NeutralWineLevelIcon,
  PastaIcon,
  SlightlySweetIcon,
  SlightlyTartIcon,
  SomethingTastyIcon,
  SpicyFlavorIcon,
  UniversalIcon,
} from "@/components/quiz/QuizQuestion/config/quizIcons";

export const beginnerQuestions: QuizQuestionConfig[] = [
  {
    step: 2,
    question: "What type of wine do you prefer?",
    options: [
      {
        id: "premium",
        title: "Premium",
        description: "",
        Icon: BudgetIcon,
      },
      {
        id: "red",
        title: "Red",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "rose",
        title: "Rosé",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "sparkling",
        title: "Sparkling",
        description: "",
        Icon: NeutralWineLevelIcon,
      },
      {
        id: "not-sure",
        title: "Recommend something",
        description: "",
        Icon: NeutralWineLevelIcon,
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
        Icon: DateNightIcon,
      },
      {
        id: "evening-with-friends",
        title: "Evening With Friends",
        description: "",
        Icon: EveningWithFriendsIcon,
      },
      {
        id: "picnic",
        title: "Picnic",
        description: "",
        Icon: DinnerAtHomeIcon,
      },
      {
        id: "gift",
        title: "A Gift",
        description: "",
        Icon: GiftIcon,
      },
      {
        id: "something-tasty",
        title: "I Just Want Something Tasty",
        description: "",
        Icon: SomethingTastyIcon,
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
        Icon: MeatIcon,
      },
      {
        id: "fish",
        title: "Fish",
        description: "",
        Icon: FishIcon,
      },
      {
        id: "pasta",
        title: "Pasta",
        description: "",
        Icon: PastaIcon,
      },
      {
        id: "cheese",
        title: "Cheese",
        description: "",
        Icon: CheeseIcon,
      },
      {
        id: "appetizers",
        title: "Appetizers",
        description: "",
        Icon: AppetizersIcon,
      },
      {
        id: "dessert",
        title: "Dessert",
        description: "",
        Icon: DessertIcon,
      },
      {
        id: "universal",
        title: "Universal / Not Sure",
        description: "",
        Icon: UniversalIcon,
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
        Icon: BudgetIcon,
      },
      {
        id: "mid-range",
        title: "Mid-Range",
        description: "Something quality without going overboard",
        Icon: MidRangeIcon,
      },
      {
        id: "higher-tier",
        title: "Higher Tier",
        description: "I want something more interesting",
        Icon: HigherTierIcon,
      },
      {
        id: "no-preference",
        title: "No Preference",
        description: "Doesn’t matter, as long as it tastes good",
        Icon: NeutralWineLevelIcon,
      },
    ],
  },
  {
    step: 6,
    question: "Which aroma notes do you prefer?",
    options: [
      {
        id: "fruity",
        title: "Fruity",
        description: "",
        Icon: FruityIcon,
      },
      {
        id: "mineral",
        title: "Mineral",
        description: "",
        Icon: FreshLightIcon,
      },
      {
        id: "oaky-vanilla",
        title: "Oaky / Vanilla",
        description: "",
        Icon: SlightlySweetIcon,
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
        Icon: SlightlyTartIcon,
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
        description: "I’m open to recommendations",
        Icon: NeutralWineLevelIcon,
      },
    ],
  },
];