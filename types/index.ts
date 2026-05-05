interface Topic {
  titleEn: string;
  titleZh: string;
  contentEn: string;
  contentZh: string;
}

export interface StudyDomain {
  domainEn: string;
  domainZh: string;
  weight: string;
  topics: Topic[];
}

export interface QuizQuestion {
  qEn: string;
  qZh: string;
  optionsEn: string[];
  optionsZh: string[];
  answers: number[];
  expEn: string;
  expZh: string;
}

export type SelectedAnswers = Record<number, number[]>;
