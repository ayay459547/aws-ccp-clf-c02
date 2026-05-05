import type { QuizQuestion } from "@/types";
import data1 from "@/data/AWS_QUIZ_DATA-1.json";
import data2 from "@/data/AWS_QUIZ_DATA-2.json";

export const FULL_AWS_QUIZ_DATA: QuizQuestion[] = [...data1, ...data2];
