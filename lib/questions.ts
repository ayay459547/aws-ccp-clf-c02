import type { QuizQuestion } from "@/types";

import QUIZ_DATA1 from "@/data/QUIZ_DATA-1.json";
import QUIZ_DATA2 from "@/data/QUIZ_DATA-2.json";

import QuizQuestion1 from "@/data/QuizQuestion-1.json";
import QuizQuestion2 from "@/data/QuizQuestion-2.json";
import QuizQuestion3 from "@/data/QuizQuestion-3.json";
import QuizQuestion4 from "@/data/QuizQuestion-4.json";
import QuizQuestion5 from "@/data/QuizQuestion-5.json";
import QuizQuestion6 from "@/data/QuizQuestion-6.json";
import QuizQuestion7 from "@/data/QuizQuestion-7.json";
import QuizQuestion8 from "@/data/QuizQuestion-8.json";

export const FULL_AWS_QUIZ_DATA: QuizQuestion[] = [
  ...QUIZ_DATA1,
  ...QUIZ_DATA2,

  ...QuizQuestion1,
  ...QuizQuestion2,
  ...QuizQuestion3,
  ...QuizQuestion4,
  ...QuizQuestion5,
  ...QuizQuestion6,
  ...QuizQuestion7,
  ...QuizQuestion8,
];
