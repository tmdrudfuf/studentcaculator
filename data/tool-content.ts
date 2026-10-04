import type { ToolContent } from "@/types/content";

export const toolContent = {
  "final-grade-calculator": {
    example: "If your current grade is 80%, the final is worth 20%, and you want an 84%, you need 100% on the final.",
    formula: "Required score = (desired grade − current grade × remaining weight) ÷ final weight",
    faq: [
      { question: "What if the required score is above 100%?", answer: "The target is not reachable from the final alone. The calculator shows your maximum possible course grade instead." },
      { question: "Does the calculator round during the calculation?", answer: "No. Full precision is kept internally and the final values are rounded only for display." },
    ],
  },
  "grade-percentage-calculator": {
    example: "Earning 45 out of 50 points gives a grade of 90%.",
    formula: "Percentage = points earned ÷ total points × 100",
    faq: [
      { question: "Can the result be above 100%?", answer: "Yes. Points earned may exceed the total when extra credit is available." },
      { question: "Can total points be zero?", answer: "No. A percentage cannot be calculated when the total is zero or negative." },
    ],
  },
  "weighted-grade-calculator": {
    example: "A 90% category worth 40% and an 80% category worth 60% produce an 84% weighted grade.",
    formula: "Normalized grade = sum of weight × grade ÷ sum of entered weights",
    faq: [
      { question: "Can I enter only part of my course?", answer: "Yes. The primary result normalizes the categories entered and also shows their contribution to the full course." },
      { question: "Can category weights exceed 100%?", answer: "No. Combined weights above 100% are rejected as an input error." },
    ],
  },
  "gpa-calculator": {
    example: "A three-credit A and a three-credit B produce a 3.5 semester GPA on the default scale.",
    formula: "Semester GPA = sum of grade points × credits ÷ total credits",
    faq: [
      { question: "Which grade scale is used?", answer: "The calculator uses a standard US 4.0 scale. Your school's scale may differ." },
      { question: "Are courses weighted by credits?", answer: "Yes. A course with more credits contributes more to the semester GPA." },
    ],
  },
  "cumulative-gpa-calculator": {
    example: "A 3.0 across 60 credits plus a 4.0 across 15 credits produces a new cumulative GPA of 3.2.",
    formula: "New GPA = previous quality points + semester quality points ÷ combined credits",
    faq: [
      { question: "Does this replace my school's official GPA?", answer: "No. It is an estimate based on the values entered and the standard 4.0 scale." },
      { question: "Why are credits required?", answer: "Credits determine how strongly each GPA contributes to the combined result." },
    ],
  },
  "target-gpa-calculator": {
    example: "With a 3.0 over 60 credits, reaching 3.2 after 15 more credits requires a 4.0 in those credits.",
    formula: "Required GPA = target total quality points − current quality points ÷ upcoming credits",
    faq: [
      { question: "What does impossible mean?", answer: "It means the required GPA is above the selected maximum of 4.0 for the upcoming credits entered." },
      { question: "What if I already reached my target?", answer: "The result reports that the target is already reached instead of calculating a required GPA." },
    ],
  },
  "credit-completion-calculator": {
    example: "Completing 72 of 120 required credits means the program is 60% complete with 48 credits remaining.",
    formula: "Completion = completed credits ÷ required credits × 100",
    faq: [
      { question: "Can completed credits exceed the requirement?", answer: "Yes. The calculator allows extra credits and reports zero remaining credits." },
      { question: "Does this check degree requirements?", answer: "No. Use your official degree audit to confirm required courses and residency rules." },
    ],
  },
  "graduation-countdown": {
    example: "A graduation date 100 calendar days from today produces a countdown of 100 days.",
    formula: "Days remaining = graduation calendar date − today's local calendar date",
    faq: [
      { question: "Where is my graduation date stored?", answer: "It is stored only in this browser using LocalStorage and is not sent with analytics." },
      { question: "Why use calendar dates?", answer: "Calendar-date math avoids one-day errors caused by time zones and daylight saving changes." },
    ],
  },
  "study-time-calculator": {
    example: "A 15-hour study goal across 10 days becomes 1 hour 30 minutes per day.",
    formula: "Minutes per day = total study minutes ÷ days available",
    faq: [
      { question: "Are partial hours supported?", answer: "Yes. Decimal hours are converted into minutes before the daily target is calculated." },
      { question: "Should every day have the same study time?", answer: "The result is an even baseline. You can redistribute time to fit your schedule." },
    ],
  },
  "semester-countdown": {
    example: "If the semester ends in 14 calendar days, the result shows 14 days plus the weekdays remaining.",
    formula: "Days remaining = semester end date − today's local calendar date",
    faq: [
      { question: "Do weekdays exclude holidays?", answer: "No. Saturdays and Sundays are excluded, but school holidays are not known to the calculator." },
      { question: "Is the semester date private?", answer: "Yes. It is stored only in your browser and is not included in analytics." },
    ],
  },
  "word-counter": {
    example: "Typing a draft updates words, characters, sentences, and paragraphs immediately.",
    formula: "Words are groups of non-whitespace characters separated by whitespace.",
    faq: [
      { question: "Is my writing uploaded?", answer: "No. Counting happens in your browser, and the text is not sent, logged, or saved." },
      { question: "How are paragraphs counted?", answer: "Paragraphs are non-empty text blocks separated by one or more blank lines." },
    ],
  },
  "reading-time-calculator": {
    example: "A 1,000-word article at 200 words per minute takes about 5 minutes to read.",
    formula: "Reading time = word count ÷ words per minute",
    faq: [
      { question: "Which reading pace should I choose?", answer: "Use slow for dense material, average for general prose, and fast for familiar or easy text." },
      { question: "Is the estimate exact?", answer: "No. Vocabulary, complexity, and reader familiarity can all change actual reading time." },
    ],
  },
} as const satisfies Record<string, ToolContent>;

export function getToolContent(slug: string): ToolContent {
  const content = toolContent[slug as keyof typeof toolContent];
  if (!content) throw new Error(`Missing content for tool: ${slug}`);
  return content;
}
