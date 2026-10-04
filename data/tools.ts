import type { CategoryDefinition, ToolCategory, ToolDefinition } from "@/types/tools";

export const categories = [
  {
    slug: "grades",
    name: "Grades",
    description: "Understand where your grades stand and what it takes to reach your goals.",
    href: "/grades",
  },
  {
    slug: "planning",
    name: "Planning",
    description: "Turn academic milestones and deadlines into a plan you can act on.",
    href: "/planning",
  },
  {
    slug: "study",
    name: "Study",
    description: "Make the time you have easier to understand and use well.",
    href: "/study",
  },
  {
    slug: "writing",
    name: "Writing",
    description: "Get quick, private feedback about the shape and length of your writing.",
    href: "/writing",
  },
] as const satisfies readonly CategoryDefinition[];

export const tools = [
  {
    slug: "final-grade-calculator",
    name: "Final Grade Calculator",
    question: "What do I need on my final?",
    description: "Find the exam score needed to finish with a target course grade.",
    category: "grades",
    href: "/grades/final-grade-calculator",
    relatedTools: ["weighted-grade-calculator", "gpa-calculator", "grade-percentage-calculator"],
    status: "available",
  },
  {
    slug: "grade-percentage-calculator",
    name: "Grade Percentage Calculator",
    question: "What percentage did I earn?",
    description: "Convert points earned out of total points into a percentage.",
    category: "grades",
    href: "/grades/grade-percentage-calculator",
    relatedTools: ["final-grade-calculator", "weighted-grade-calculator"],
    status: "available",
  },
  {
    slug: "weighted-grade-calculator",
    name: "Weighted Grade Calculator",
    question: "What is my current weighted grade?",
    description: "Combine weighted course categories into a clear current grade.",
    category: "grades",
    href: "/grades/weighted-grade-calculator",
    relatedTools: ["final-grade-calculator", "grade-percentage-calculator"],
    status: "available",
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    question: "What is my semester GPA?",
    description: "Estimate a semester GPA from grades and course credits.",
    category: "grades",
    href: "/grades/gpa-calculator",
    relatedTools: ["cumulative-gpa-calculator", "target-gpa-calculator"],
    status: "available",
  },
  {
    slug: "cumulative-gpa-calculator",
    name: "Cumulative GPA Calculator",
    question: "How will this semester change my GPA?",
    description: "Combine an existing GPA with a new semester estimate.",
    category: "grades",
    href: "/grades/cumulative-gpa-calculator",
    relatedTools: ["gpa-calculator", "target-gpa-calculator"],
    status: "available",
  },
  {
    slug: "target-gpa-calculator",
    name: "Target GPA Calculator",
    question: "Can I reach my target GPA?",
    description: "Estimate the GPA needed in upcoming credits to reach a goal.",
    category: "grades",
    href: "/grades/target-gpa-calculator",
    relatedTools: ["gpa-calculator", "cumulative-gpa-calculator"],
    status: "available",
  },
  {
    slug: "credit-completion-calculator",
    name: "Credit Completion Calculator",
    question: "How close am I to completing my credits?",
    description: "See completed and remaining credits at a glance.",
    category: "planning",
    href: "/planning/credit-completion-calculator",
    relatedTools: ["graduation-countdown"],
    status: "available",
  },
  {
    slug: "graduation-countdown",
    name: "Graduation Countdown",
    question: "How long until graduation?",
    description: "Count the calendar time remaining until graduation day.",
    category: "planning",
    href: "/planning/graduation-countdown",
    relatedTools: ["credit-completion-calculator", "semester-countdown"],
    status: "available",
  },
  {
    slug: "study-time-calculator",
    name: "Study Time Calculator",
    question: "How much should I study each day?",
    description: "Divide a study goal across the days you have available.",
    category: "study",
    href: "/study/study-time-calculator",
    relatedTools: ["semester-countdown"],
    status: "available",
  },
  {
    slug: "semester-countdown",
    name: "Semester Countdown",
    question: "How much time is left this semester?",
    description: "See the calendar time remaining before the semester ends.",
    category: "study",
    href: "/study/semester-countdown",
    relatedTools: ["study-time-calculator", "graduation-countdown"],
    status: "available",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    question: "How long is my draft?",
    description: "Count words, characters, sentences, and paragraphs privately.",
    category: "writing",
    href: "/writing/word-counter",
    relatedTools: ["reading-time-calculator"],
    status: "available",
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    question: "How long will this take to read?",
    description: "Estimate reading time from a word count and reading pace.",
    category: "writing",
    href: "/writing/reading-time-calculator",
    relatedTools: ["word-counter"],
    status: "available",
  },
] as const satisfies readonly ToolDefinition[];

export function getCategory(category: ToolCategory): CategoryDefinition {
  const definition = categories.find((item) => item.slug === category);

  if (!definition) {
    throw new Error(`Unknown tool category: ${category}`);
  }

  return definition;
}

export function getToolsByCategory(category: ToolCategory): readonly ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

export function getTool(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getRequiredTool(slug: string): ToolDefinition {
  const tool = getTool(slug);

  if (!tool) {
    throw new Error(`Unknown tool: ${slug}`);
  }

  return tool;
}
