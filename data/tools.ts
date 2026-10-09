import type { CategoryDefinition, ToolCategory, ToolDefinition } from "@/types/tools";

export const categories = [
  {
    slug: "grades",
    name: "Grades",
    description: "Understand where your grades stand and what it takes to reach your goals.",
    href: "/grades",
    overview: [
      "Grade calculations are most useful when the inputs match the rules in your syllabus. A points-based class, a weighted-category class, and a course with a heavily weighted final exam can produce different answers even when the visible scores look similar.",
      "Start by identifying the question you need to answer. Use the percentage calculator for a single assignment, the weighted calculator for course categories, and the GPA tools only after confirming your school's grade-point scale and credit rules.",
    ],
    checklist: [
      "Copy weights and point totals from the official syllabus or gradebook.",
      "Check whether extra credit, dropped scores, or rounding rules apply.",
      "Keep percentages and GPA values separate; they measure different things.",
      "Treat every result as an estimate until it matches the school's official record.",
    ],
  },
  {
    slug: "planning",
    name: "Planning",
    description: "Turn academic milestones and deadlines into a plan you can act on.",
    href: "/planning",
    overview: [
      "Academic planning works best when a large requirement is converted into a measurable next step. Credit totals show progress toward a program, while countdowns make the remaining calendar time visible.",
      "These tools do not know your major requirements, transfer-credit rules, residency requirements, or institutional calendar. Use them to prepare questions and organize a plan, then verify the plan against your degree audit and academic calendar.",
    ],
    checklist: [
      "Use the most recent degree audit rather than an old advising worksheet.",
      "Separate earned credits from credits that are still in progress.",
      "Confirm whether repeated, transferred, or pass/fail courses count.",
      "Review the plan with an adviser before changing registration decisions.",
    ],
  },
  {
    slug: "study",
    name: "Study",
    description: "Make the time you have easier to understand and use well.",
    href: "/study",
    overview: [
      "A useful study plan connects a clear workload with the real number of days available. Dividing hours evenly creates a baseline, but the final schedule should also account for class meetings, work shifts, sleep, and days when concentration will be limited.",
      "Use the calculators to estimate the size of the commitment, then move the result into a calendar as specific study blocks. Short review sessions spread across several days are usually easier to protect than one large session at the end.",
    ],
    checklist: [
      "Estimate the work in hours before dividing it across the calendar.",
      "Reserve extra time for difficult subjects and practice exams.",
      "Leave a buffer day for illness, work, or unexpected assignments.",
      "Recalculate the daily target when the schedule changes.",
    ],
  },
  {
    slug: "writing",
    name: "Writing",
    description: "Get quick, private feedback about the shape and length of your writing.",
    href: "/writing",
    overview: [
      "Length metrics can help you plan and revise a draft, but they do not measure argument quality, evidence, or clarity. A word count answers how much text exists; a reading-time estimate helps you think about the reader's time and the pace of a presentation.",
      "The writing tools run in the browser so the text you enter is not sent to a server. Use the numbers as revision signals, then read the work aloud and compare it with the assignment rubric before submitting.",
    ],
    checklist: [
      "Confirm whether the assignment counts headings, citations, and references.",
      "Use paragraph counts to spot unusually dense or fragmented sections.",
      "Estimate speaking time separately from silent reading time.",
      "Do a content and citation review after meeting the length requirement.",
    ],
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
