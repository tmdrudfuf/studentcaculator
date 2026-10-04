export type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
};

export type ToolContent = {
  example: string;
  formula: string;
  faq: readonly FrequentlyAskedQuestion[];
};
