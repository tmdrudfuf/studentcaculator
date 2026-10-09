import type { GuideDefinition } from "@/types/content";

export const guides = [
  {
    slug: "calculate-final-grade",
    title: "How to calculate the grade you need on a final exam",
    description:
      "Learn the weighted-grade formula behind final exam targets, check the result by hand, and interpret targets above 100%.",
    category: "Grades",
    readingMinutes: 6,
    relatedTools: ["final-grade-calculator", "weighted-grade-calculator", "grade-percentage-calculator"],
    sections: [
      {
        heading: "Start with the grading rule, not the calculator",
        paragraphs: [
          "A final-exam target is only meaningful when the current grade and final weight describe the same grading system. Check the syllabus or gradebook to confirm whether the displayed current grade already includes ungraded work. Some systems temporarily ignore the final exam; others count the missing exam as a zero. Those two displays require different inputs.",
          "The standard calculation assumes that your current grade represents all work completed so far and that the final exam is the only remaining graded item. If projects, attendance, or extra credit are still ungraded, include those items in a broader weighted-grade calculation first.",
        ],
        bullets: [
          "Current grade: the percentage earned on the completed portion of the course.",
          "Final weight: the percentage of the overall course assigned to the final exam.",
          "Desired grade: the overall course percentage you want after the final.",
        ],
      },
      {
        heading: "Work through the formula",
        paragraphs: [
          "Convert the final weight to a decimal and subtract it from one to find the completed-course weight. Multiply the current grade by that completed weight. Subtract the result from the desired overall grade, then divide by the final weight.",
          "For example, suppose your current grade is 80%, the final is worth 20%, and your target is 84%. The completed work contributes 80 × 0.80, or 64 points, to the final course grade. You still need 20 course points from the final. Dividing 20 by 0.20 gives a required final score of 100%.",
        ],
        bullets: [
          "Completed contribution = current grade × (1 − final weight).",
          "Needed contribution = desired grade − completed contribution.",
          "Required final score = needed contribution ÷ final weight.",
        ],
      },
      {
        heading: "Interpret the answer before making a plan",
        paragraphs: [
          "A required score below zero means the target is already secured under the stated assumptions. A score between zero and 100% is mathematically reachable, although the amount of preparation required depends on the subject and exam format. A result above 100% means the final alone cannot produce the target unless extra credit is available.",
          "When a target is unreachable, calculate the maximum possible course grade using a 100% final score. That number is more useful than repeatedly changing inputs because it shows the best outcome available from the remaining exam. You can then compare that outcome with grade boundaries or ask the instructor whether other work remains.",
        ],
      },
      {
        heading: "Check school-specific details",
        paragraphs: [
          "Rounding can change a letter grade near a boundary, but do not assume every instructor rounds. A displayed 89.95% may become an A in one course and remain a B in another. Curves, dropped assignments, replacement exams, and category caps can also invalidate the simple formula.",
          "Use the calculator as a planning estimate, save a copy of the syllabus rule, and confirm unusual cases with the instructor. The official gradebook and published course policy always take priority over a general-purpose calculator.",
        ],
      },
    ],
  },
  {
    slug: "calculate-college-gpa",
    title: "How college GPA calculations work",
    description:
      "Understand grade points, credit weighting, cumulative GPA, repeated courses, and why a school GPA can differ from a quick estimate.",
    category: "Grades",
    readingMinutes: 7,
    relatedTools: ["gpa-calculator", "cumulative-gpa-calculator", "target-gpa-calculator"],
    sections: [
      {
        heading: "GPA is a credit-weighted average",
        paragraphs: [
          "A grade point average is not usually the simple average of letter grades. Each letter grade maps to a numeric value, and that value is multiplied by the course credits. The products are called quality points. Total quality points divided by total GPA credits gives the GPA.",
          "This weighting matters because a four-credit course contributes twice as much as a two-credit course. If both courses receive the same grade, the effect is easy to miss. If the grades differ, averaging the two grade-point values directly produces the wrong answer.",
        ],
        bullets: [
          "Convert each letter grade using the school's published scale.",
          "Multiply grade points by the credits for that course.",
          "Add quality points and divide by the included credits.",
        ],
      },
      {
        heading: "Example with unequal course credits",
        paragraphs: [
          "Suppose a student earns an A worth 4.0 points in a three-credit course and a B worth 3.0 points in a one-credit course. The courses produce 12 and 3 quality points, for a total of 15. Dividing by four credits gives a 3.75 GPA. A simple average of 4.0 and 3.0 would incorrectly report 3.50.",
          "Plus and minus grades require the exact values used by the institution. One school may assign 3.7 to an A−, another may use 3.67, and some programs may not use plus or minus grades at all. A standard 4.0 calculator is an estimate unless its scale matches the transcript policy.",
        ],
      },
      {
        heading: "Combine a new term with a cumulative GPA",
        paragraphs: [
          "To update a cumulative GPA, first recover the existing quality points by multiplying the current GPA by the completed GPA credits. Calculate quality points for the new term, add both amounts, and divide by the combined credits. Averaging the old GPA and new GPA is only correct when both represent exactly the same number of credits.",
          "A target-GPA calculation reverses this process. It finds the quality points needed after the upcoming credits and subtracts the quality points already earned. Dividing the difference by upcoming credits gives the required GPA for that future work.",
        ],
      },
      {
        heading: "Know what the school includes",
        paragraphs: [
          "Pass/fail courses, withdrawals, transfer courses, remedial courses, and repeated classes may be treated differently. Some schools replace an earlier grade after a repeat; others keep both attempts. Institutional GPA, major GPA, financial-aid GPA, and application-service GPA can also use different course sets.",
          "Use the credit totals and quality points printed on an official transcript whenever possible. If a calculator estimate disagrees with the school record, review the inclusion rules before assuming either arithmetic result is wrong.",
        ],
      },
    ],
  },
  {
    slug: "weighted-grades-explained",
    title: "Weighted grades explained with practical examples",
    description:
      "Learn the difference between points and category weights, calculate a current grade, and avoid common gradebook mistakes.",
    category: "Grades",
    readingMinutes: 6,
    relatedTools: ["weighted-grade-calculator", "grade-percentage-calculator", "final-grade-calculator"],
    sections: [
      {
        heading: "Points and weighted categories answer different questions",
        paragraphs: [
          "In a points-based course, every earned point is added and divided by every possible point. A 100-point exam therefore matters ten times as much as a 10-point quiz. In a category-weighted course, the syllabus assigns fixed shares to categories such as exams, homework, and participation. The raw number of points inside a category does not change that category's overall share.",
          "Before calculating, look for language such as 'exams 50%, homework 30%, projects 20%.' If those percentages exist, calculate the percentage inside each category and then apply the category weight. Do not add all raw points unless the syllabus explicitly uses total points.",
        ],
      },
      {
        heading: "Calculate a weighted course grade",
        paragraphs: [
          "Multiply each category percentage by its weight written as a decimal, then add the contributions. A 90% exam category worth 40% contributes 36 percentage points. An 80% assignment category worth 60% contributes 48 points. Together they produce an 84% course grade.",
          "When entered category weights total less than 100%, decide whether you want a grade for completed work or a contribution to the full course. Normalizing by the entered weights reports performance on the categories available so far. Leaving the result unnormalized shows how many points those categories currently contribute to the final course grade.",
        ],
        bullets: [
          "Category contribution = category grade × category weight.",
          "Full-course contribution = sum of the category contributions.",
          "Normalized current grade = contributions ÷ entered weights.",
        ],
      },
      {
        heading: "Why online gradebooks can look surprising",
        paragraphs: [
          "Many gradebooks temporarily exclude empty categories. A project category worth 30% may not affect the displayed grade until its first score is posted. The current grade can then change sharply even when the student's recent performance is consistent.",
          "Gradebooks may also treat missing work differently from ungraded work. A true zero should reduce the category grade, while a blank item may be ignored. Confirm the status of every missing item before copying category percentages into a calculator.",
        ],
      },
      {
        heading: "Audit the result",
        paragraphs: [
          "Make sure the weights add to the total stated in the syllabus and that every percentage belongs to the correct category. Check whether the instructor drops a low score, applies extra credit, or rounds category values before combining them.",
          "A manual estimate is useful for planning, but the official course policy controls the final grade. If the result differs from the gradebook, compare one category at a time rather than changing several inputs at once.",
        ],
      },
    ],
  },
  {
    slug: "build-realistic-study-plan",
    title: "How to build a realistic daily study plan",
    description:
      "Turn a study-hour goal into a schedule that includes priorities, buffer time, retrieval practice, and regular adjustments.",
    category: "Study",
    readingMinutes: 7,
    relatedTools: ["study-time-calculator", "semester-countdown", "graduation-countdown"],
    sections: [
      {
        heading: "Estimate the work before dividing the time",
        paragraphs: [
          "A daily study target begins with a workload estimate. List the tasks required for the exam or project: reading, practice problems, flashcards, drafting, review, and a practice test. Assign a rough time range to each task and add the upper estimates when the material is unfamiliar.",
          "Next count the days that are genuinely available. A ten-day calendar window does not provide ten full study days if work shifts, travel, or other exams occupy part of it. Remove unavailable days or give them a smaller capacity before calculating an average.",
        ],
      },
      {
        heading: "Use the daily average as a baseline",
        paragraphs: [
          "Dividing total hours by available days creates a baseline, not a rigid promise. Fifteen hours over ten days equals ninety minutes per day. You might schedule two hours on open days, forty-five minutes on busy days, and preserve the same total.",
          "Place the study blocks on a calendar with a specific subject and task. 'Study biology' is difficult to start; 'complete 20 genetics problems and review errors' has a visible finish line. Schedule demanding work during the part of the day when concentration is strongest.",
        ],
        bullets: [
          "Give each block one subject and one concrete outcome.",
          "Use shorter blocks for recall and longer blocks for practice sets or drafting.",
          "Protect sleep and meals instead of treating them as spare time.",
        ],
      },
      {
        heading: "Build in retrieval, spacing, and feedback",
        paragraphs: [
          "Rereading can feel productive because the material becomes familiar, but familiarity is not the same as recall. Include time to answer questions without notes, solve new problems, explain a concept aloud, or write what you remember before checking the source.",
          "Return to important material on multiple days. Spacing sessions gives you repeated chances to retrieve the information and reveals what was forgotten. Review mistakes soon after practice, then test the same skill again later rather than only reading the correction.",
        ],
      },
      {
        heading: "Recalculate when reality changes",
        paragraphs: [
          "At the end of each day, compare completed work with the plan. Move unfinished tasks deliberately instead of silently carrying them forward. If three planned hours remain after a missed day and only two days are available, the new baseline is ninety minutes per day.",
          "Leave a buffer before the deadline whenever possible. The buffer absorbs illness, difficult chapters, and underestimated tasks. If the required daily time becomes unrealistic, reduce lower-priority work, ask for help, or change the goal rather than planning an all-night session that is unlikely to happen.",
        ],
      },
    ],
  },
] as const satisfies readonly GuideDefinition[];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getRequiredGuide(slug: string): GuideDefinition {
  const guide = getGuide(slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);
  return guide;
}
