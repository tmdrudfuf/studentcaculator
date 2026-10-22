export type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
};

export type WorkedExample = {
  heading: string;
  scenario: string;
  calculation: string;
  takeaway: string;
};

export type ToolContent = {
  overview: readonly string[];
  steps: readonly string[];
  examples: readonly WorkedExample[];
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

export type GuideSource = {
  title: string;
  publisher: string;
  href: string;
};

export type GuideDefinition = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  relatedTools: readonly string[];
  publishedOn: string;
  reviewedOn: string;
  sources: readonly GuideSource[];
  sections: readonly GuideSection[];
};
