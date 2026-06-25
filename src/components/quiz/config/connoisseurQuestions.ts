import type { QuizQuestionConfig } from "@/types/quiz";

import {
  BudgetIcon,
  EveningWithFriendsIcon,
  FreshLightIcon,
  FruityFlavorIcon,
  HigherTierIcon,
  MidRangeIcon,
  NeutralIcon,
  NeutralWineLevelIcon,
  SlightlyTartIcon,
  SomethingTastyIcon,
  UniversalIcon,
} from "@/components/quiz/QuizQuestion/config/quizIcons";

export const connoisseurQuestions: QuizQuestionConfig[] = [
  {
    step: 2,
    question: "Which regions are you interested in?",
    options: [
      {
        id: "burgundy",
        title: "Burgundy",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "bordeaux",
        title: "Bordeaux",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "piedmont",
        title: "Piedmont",
        description: "",
        Icon: NeutralIcon,
      },
      {
        id: "rioja",
        title: "Rioja",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "niche-regions",
        title: "Niche Regions",
        description: "",
        Icon: SomethingTastyIcon,
      },
      {
        id: "provence",
        title: "Provence",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "ribera-del-duero",
        title: "Ribera del Duero",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "open-to-experiment-region",
        title: "Open To Experiment",
        description: "",
        Icon: NeutralWineLevelIcon,
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
        Icon: HigherTierIcon,
      },
      {
        id: "organic",
        title: "Organic",
        description: "",
        Icon: MidRangeIcon,
      },
      {
        id: "sustainable",
        title: "Sustainable",
        description: "",
        Icon: FreshLightIcon,
      },
      {
        id: "no-preference",
        title: "No Preference",
        description: "",
        Icon: NeutralIcon,
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
        Icon: FreshLightIcon,
      },
      {
        id: "medium-bodied",
        title: "Medium Bodied",
        description: "",
        Icon: SlightlyTartIcon,
      },
      {
        id: "full-bodied",
        title: "Full Bodied",
        description: "",
        Icon: HigherTierIcon,
      },
      {
        id: "no-preference",
        title: "No Preference",
        description: "",
        Icon: UniversalIcon,
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
    step: 6,
    question: "What aging potential are you looking for?",
    options: [
      {
        id: "drink-now",
        title: "Drink Now",
        description: "I want a wine that is ready to enjoy now",
        Icon: BudgetIcon,
      },
      {
        id: "short-term-aging",
        title: "Short-Term Aging",
        description: "I want a wine that can improve over the next few years",
        Icon: HigherTierIcon,
      },
      {
        id: "long-term-aging",
        title: "Long-Term Aging",
        description: "I want a wine that can develop over time",
        Icon: EveningWithFriendsIcon,
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