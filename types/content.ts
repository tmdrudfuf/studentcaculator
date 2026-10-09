export type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
};

export type ToolContent = {
  overview: readonly string[];
  steps: readonly string[];
  example: string;
  formula: string;
  interpretation: readonly string[];
  limitations: readonly string[];
  commonMistakes: readonly string[];
  faq: readonly FrequentlyAskedQuestion[];
};

export type GuideSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type GuideDefinition = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  relatedTools: readonly string[];
  sections: readonly GuideSection[];
};
