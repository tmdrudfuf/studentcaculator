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
    publishedOn: "2026-10-09",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Creating a Weighted Gradebook with Assignment Groups",
        publisher: "Yale University Canvas Support",
        href: "https://help.canvas.yale.edu/a/914596-creating-weighted-groups-for-assignments",
      },
      {
        title: "Setting Up the Gradebook",
        publisher: "University of Pennsylvania Canvas Support",
        href: "https://infocanvas.upenn.edu/instructors/setting-up-the-gradebook/",
      },
    ],
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
    publishedOn: "2026-10-09",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Calculate GPA",
        publisher: "University of Notre Dame Office of the Registrar",
        href: "https://registrar.nd.edu/exams-grading/grades/calculate-gpa/",
      },
      {
        title: "GPA Calculation",
        publisher: "University of Maryland Office of the University Registrar",
        href: "https://www.registrar.umd.edu/grades-records/grades/gpa-calculation",
      },
    ],
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
    publishedOn: "2026-10-09",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Setting Up the Gradebook",
        publisher: "University of Pennsylvania Canvas Support",
        href: "https://infocanvas.upenn.edu/instructors/setting-up-the-gradebook/",
      },
      {
        title: "How do I create rules for an assignment group?",
        publisher: "Canvas LMS Instructor Guide",
        href: "https://community.instructure.com/en/kb/articles/660670-how-do-i-create-rules-for-an-assignment-group",
      },
    ],
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
    publishedOn: "2026-10-09",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Improving Students' Learning With Effective Learning Techniques",
        publisher: "Psychological Science in the Public Interest",
        href: "https://pubmed.ncbi.nlm.nih.gov/26173288/",
      },
      {
        title: "Improving Students' Learning With Effective Learning Techniques",
        publisher: "Association for Psychological Science",
        href: "https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html",
      },
    ],
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
  {
    slug: "calculate-target-gpa",
    title: "How to calculate the GPA needed in future credits",
    description:
      "Turn a cumulative GPA goal into a required future GPA, test whether the target is reachable, and account for school-specific rules.",
    category: "Grades",
    readingMinutes: 7,
    relatedTools: ["target-gpa-calculator", "cumulative-gpa-calculator", "gpa-calculator"],
    publishedOn: "2026-10-14",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Calculate Your GPA",
        publisher: "University of Illinois Office of the Registrar",
        href: "https://www.registrar.illinois.edu/courses-grades/calculate-your-gpa/",
      },
      {
        title: "GPA Calculation",
        publisher: "University of Maryland Office of the University Registrar",
        href: "https://www.registrar.umd.edu/grades-records/grades/gpa-calculation",
      },
    ],
    sections: [
      {
        heading: "Begin with quality points, not two GPA numbers",
        paragraphs: [
          "A cumulative GPA summarizes courses with different credit values, so the current GPA and a future term GPA cannot usually be averaged directly. First convert the current record back into quality points by multiplying the current cumulative GPA by the GPA credits already attempted. The result represents the weighted grade points behind the displayed average.",
          "Use the GPA credits shown on an official transcript rather than every credit earned toward the degree. Pass/fail courses, withdrawals, transfer work, repeated courses, and other exclusions can count toward graduation without counting in the institutional GPA. A target based on the wrong credit total may look precise while answering the wrong question.",
        ],
        bullets: [
          "Current quality points = current GPA × completed GPA credits.",
          "Target quality points = target GPA × credits after the future term.",
          "Needed future quality points = target quality points − current quality points.",
        ],
      },
      {
        heading: "Solve for the required future GPA",
        paragraphs: [
          "Suppose a student has a 3.00 GPA across 60 GPA credits and wants a 3.20 after completing 30 more credits. The current record contains 180 quality points. A 3.20 across 90 total credits requires 288 quality points, so the next 30 credits must produce 108 quality points. Dividing 108 by 30 gives a required future GPA of 3.60.",
          "The calculated future GPA is an average across all entered future credits, not the grade needed in every class. A student might combine several grades to reach that average. Planning individual courses still requires multiplying each expected grade-point value by its course credits and checking that their total reaches the needed quality points.",
        ],
      },
      {
        heading: "Check whether the target is mathematically reachable",
        paragraphs: [
          "Compare the result with the highest grade-point value allowed by the school's scale. If the required future GPA is above that maximum, the target cannot be reached within the number of future credits entered. Increasing the future-credit window may make the goal possible because more coursework is available to change the cumulative average.",
          "A target below the current GPA can produce a required future GPA below the current average, but that does not mean every lower result is safe. Test a conservative scenario as well as the exact threshold. A buffer helps with rounding, course difficulty, and the possibility that a planned class does not count in the GPA exactly as expected.",
        ],
      },
      {
        heading: "Reconcile the estimate with institutional policy",
        paragraphs: [
          "Schools differ on plus and minus values, grade replacement, forgiven grades, transfer credit, and whether a displayed GPA is rounded or truncated. Professional programs and application services may also recalculate GPA from a different set of courses. The transcript and registrar's published policy control the official result.",
          "Use the target as a planning range, then map it to realistic course outcomes. If the result affects financial aid, academic standing, graduation, or admission, ask an academic adviser to verify the credits and rules before making registration decisions. The calculator is most useful as a transparent what-if model, not as an official promise.",
        ],
      },
    ],
  },
  {
    slug: "track-degree-credit-progress",
    title: "How to track remaining credits toward graduation",
    description:
      "Calculate credit completion without confusing total credits with major, residency, GPA, or course-sequence requirements.",
    category: "Planning",
    readingMinutes: 7,
    relatedTools: ["credit-completion-calculator", "graduation-countdown", "semester-countdown"],
    publishedOn: "2026-10-14",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Degree Planning",
        publisher: "Purdue University Office of the Registrar",
        href: "https://purdue.edu/registrar/records/degree-planning/",
      },
      {
        title: "Undergraduate Degree Checks",
        publisher: "UCLA Registrar's Office",
        href: "https://registrar.ucla.edu/registration-classes/graduation/final-degree-audit/undergraduate-degree-checks",
      },
      {
        title: "34 CFR § 600.2 — Definitions",
        publisher: "Legal Information Institute, Cornell Law School",
        href: "https://www.law.cornell.edu/cfr/text/34/600.2",
      },
    ],
    sections: [
      {
        heading: "Treat the credit total as one requirement among several",
        paragraphs: [
          "Credit completion is the completed applicable credits divided by the credits required for the program. That percentage is useful for a quick progress check, but a degree is not awarded solely because the total reaches 100%. Programs can also require specific courses, minimum grades, residency credits, upper-level credits, a major GPA, and separate general-education blocks.",
          "Start with the official degree audit and catalog year assigned by the institution. A transcript lists courses and credits, while a degree audit attempts to place those courses into requirements. Credits that appear on the transcript may be electives, duplicates, transfer work, or otherwise unable to satisfy the remaining requirement you have in mind.",
        ],
      },
      {
        heading: "Separate earned, in-progress, and planned credits",
        paragraphs: [
          "For a conservative completion percentage, count only credits already earned with an eligible grade. Show in-progress credits separately because they still depend on successful completion. Planned courses belong in a forecast rather than the completed total. This separation makes it easier to see the difference between current standing and an expected end-of-term result.",
          "If 72 of 120 required credits are complete, current credit completion is 60%. Fifteen in-progress credits would raise the projected total to 87, or 72.5%, if all are completed and apply to the degree. That forecast should not be labeled as earned progress until the grades are posted and the audit updates.",
        ],
        bullets: [
          "Current completion = earned applicable credits ÷ required credits.",
          "Projected completion = (earned + eligible in-progress credits) ÷ required credits.",
          "Remaining credits = required credits − applicable completed credits.",
        ],
      },
      {
        heading: "Audit the remaining requirements, not only the number",
        paragraphs: [
          "A student can have enough total credits and still need a prerequisite sequence, capstone, laboratory, internship, or residency block. Open every incomplete section of the degree audit and list the exact requirement, the approved course choices, prerequisites, and usual offering term. A four-credit gap may take longer than a twelve-credit gap if the needed course is offered only once per year.",
          "Check whether a course is being used twice in a planning spreadsheet when the institution permits it to satisfy only one requirement. Also look for minimum-grade rules: a course may award credits while failing to satisfy the major. Ask an adviser about exceptions or substitutions rather than assuming an unplaced course will be moved automatically.",
        ],
      },
      {
        heading: "Use the calculator as a checkpoint",
        paragraphs: [
          "Recalculate after grades post, transfer credits are evaluated, or the academic plan changes. Save a dated copy of the degree audit and note any adviser-approved substitutions. Comparing snapshots helps identify when a requirement changed or a course stopped applying where expected.",
          "The registrar or designated degree auditor determines official completion. Before the final registration period, verify the graduation application deadline, remaining requirements, and expected completion term through the school's process. A percentage is helpful for orientation, but the official audit and final degree check are the decisive records.",
        ],
      },
    ],
  },
  {
    slug: "plan-graduation-timeline",
    title: "How to plan a realistic graduation timeline",
    description:
      "Work backward from a target graduation date while accounting for course sequencing, credit load, deadlines, and schedule risk.",
    category: "Planning",
    readingMinutes: 7,
    relatedTools: ["graduation-countdown", "credit-completion-calculator", "semester-countdown"],
    publishedOn: "2026-10-14",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Degree Planning",
        publisher: "Purdue University Office of the Registrar",
        href: "https://purdue.edu/registrar/records/degree-planning/",
      },
      {
        title: "Degree Audit",
        publisher: "Yale University Registrar's Office",
        href: "https://registrar.yale.edu/student-records/degree-audit",
      },
    ],
    sections: [
      {
        heading: "Choose an official milestone date",
        paragraphs: [
          "A commencement ceremony, final exam, degree-conferral date, and diploma delivery date may all be different. Decide which event the countdown represents, then copy that date from the institution's academic calendar or graduation information. Label it clearly so a number of remaining days is not mistaken for a different deadline.",
          "A countdown creates urgency but does not prove degree eligibility. Pair it with the degree audit, catalog requirements, and graduation application schedule. If the institution has not published a future calendar, mark the date as provisional and replace it when the official date becomes available.",
        ],
      },
      {
        heading: "Map requirements backward by term",
        paragraphs: [
          "List the courses and non-course requirements still needed, then place the final requirements in the intended graduation term. Work backward through every prerequisite. A capstone that requires a methods course, which itself requires a statistics course, can determine the earliest possible finish even when the total remaining credits would fit into fewer terms.",
          "Confirm when each course is normally offered and whether enrollment is guaranteed. Some courses run only in fall or spring, require department approval, or reserve seats for particular majors. A timeline should distinguish confirmed offerings from assumptions so the most fragile part of the plan is visible.",
        ],
        bullets: [
          "Record prerequisites and co-requisites for every required course.",
          "Mark courses offered only once per year or with limited seats.",
          "Include applications, internships, portfolios, and clearance deadlines.",
        ],
      },
      {
        heading: "Test the workload, not just the arithmetic",
        paragraphs: [
          "Divide the remaining applicable credits by the number of available terms to get a rough average load. Then replace that average with actual course combinations. A technically allowed load can still be unrealistic when several writing-intensive, laboratory, clinical, or project courses fall in the same term.",
          "Consider work hours, caregiving, health, commuting, financial aid enrollment rules, and the availability of summer courses. Create a base plan and a lower-load alternative. If the schedule works only when every course is available and every term uses the maximum load, it has no buffer for common disruptions.",
        ],
      },
      {
        heading: "Review the plan at fixed checkpoints",
        paragraphs: [
          "Check the plan before registration opens, after enrollment is confirmed, and after final grades post. Update both the credit forecast and the course sequence. If a class is dropped or failed, immediately inspect downstream prerequisites rather than changing only the total remaining credits.",
          "Meet with an adviser early enough to change the next term's registration. Save the reviewed plan and note who confirmed any exceptions. The countdown can keep the target visible, but the living term-by-term plan is what reveals whether the date remains feasible.",
        ],
      },
    ],
  },
  {
    slug: "estimate-reading-time",
    title: "How to estimate reading time for an assignment",
    description:
      "Estimate how long academic reading will take using word count, personal pace, text difficulty, note-taking, and review time.",
    category: "Writing",
    readingMinutes: 7,
    relatedTools: ["reading-time-calculator", "word-counter", "study-time-calculator"],
    publishedOn: "2026-10-14",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "How many words do we read per minute? A review and meta-analysis of reading rate",
        publisher: "Ghent University Academic Bibliography",
        href: "https://biblio.ugent.be/publication/8647789",
      },
    ],
    sections: [
      {
        heading: "Use words per minute as a starting estimate",
        paragraphs: [
          "Basic reading time equals total words divided by reading speed in words per minute. A 5,000-word chapter at 200 words per minute takes about 25 minutes of uninterrupted reading. That arithmetic is a baseline for moving through the text, not a promise about comprehension or completion of the assignment.",
          "Research averages describe groups, while an individual's rate changes with language, familiarity, purpose, text structure, and difficulty. Technical chapters with equations or unfamiliar terminology often take much longer than narrative text. Choose a conservative rate when the assignment requires close analysis rather than casual reading.",
        ],
      },
      {
        heading: "Measure a personal pace on comparable material",
        paragraphs: [
          "For a better estimate, time ten to fifteen minutes of focused reading from the same course. Count the words or estimate them from several representative pages, then divide words completed by minutes spent. Do not include a section already read or an unusually easy introduction, because it will overstate the pace for the remaining work.",
          "Repeat the sample when the format changes. A research article, textbook chapter, legal case, and primary-source document may require different rates. Keep a small record of predicted and actual time; after several assignments, the personal estimate becomes more useful than a generic default.",
        ],
        bullets: [
          "Reading pace = words completed ÷ focused reading minutes.",
          "Baseline time = assignment words ÷ chosen words per minute.",
          "Plan in blocks and round the estimate upward rather than downward.",
        ],
      },
      {
        heading: "Add time for the work around reading",
        paragraphs: [
          "Academic assignments often require previewing headings, annotating, looking up terms, answering questions, or taking notes. Estimate these tasks separately instead of hiding them inside an unrealistically slow reading rate. For example, add a fixed review block after each section or a percentage buffer based on previous assignments.",
          "If the goal is exam preparation, schedule retrieval after reading: close the text and write what you remember, answer practice questions, or explain the argument. That time does not increase the number of pages completed, but it changes reading from exposure into a learning activity.",
        ],
      },
      {
        heading: "Turn the estimate into a usable schedule",
        paragraphs: [
          "Divide the total into sessions that name both a page or section range and an outcome. A block such as 'read sections 2.1–2.3 and answer the four learning questions' is easier to evaluate than 'study chapter two.' Leave short breaks and a final buffer before the deadline.",
          "After the first session, compare actual progress with the estimate and recalculate the remaining work. If the pace is much slower, reduce optional annotation, seek clarification on the reading purpose, or start earlier. The value of an estimate is the ability to revise the plan before the deadline becomes an emergency.",
        ],
      },
    ],
  },
  {
    slug: "count-words-for-an-assignment",
    title: "How to count words for an assignment accurately",
    description:
      "Understand what a word counter includes, why apps can disagree, and how to verify an essay against an instructor's rules.",
    category: "Writing",
    readingMinutes: 6,
    relatedTools: ["word-counter", "reading-time-calculator", "study-time-calculator"],
    publishedOn: "2026-10-14",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Show word count",
        publisher: "Microsoft Support",
        href: "https://support.microsoft.com/en-us/word/training/show-word-count",
      },
      {
        title: "Count the words in a document",
        publisher: "Google Docs Editors Help",
        href: "https://support.google.com/docs/answer/39003",
      },
    ],
    sections: [
      {
        heading: "Read the assignment's counting rule first",
        paragraphs: [
          "A word limit is not complete unless it says what is included. Instructors may exclude the title page, headings, block quotations, tables, figure captions, footnotes, in-text citations, or reference list. Others may use the document application's total without exclusions. The assignment sheet or rubric takes priority over a general counter.",
          "Write down the target as a range when a tolerance is given. A 1,500-word assignment with a ten-percent allowance may accept 1,350 to 1,650 words, but do not assume that flexibility unless it is stated. Ask for clarification early if penalties depend on the count.",
        ],
      },
      {
        heading: "Know why counters can produce different totals",
        paragraphs: [
          "Programs do not always split text the same way. Hyphenated terms, em dashes, URLs, numbers, contractions, symbols, and words joined by unusual spaces can be counted differently. Headers, footers, footnotes, text boxes, and comments may also be included by one application and excluded by another.",
          "A browser counter is useful for drafts and selected passages, but the final count should come from the required submission format whenever possible. Google Docs notes that its document count excludes headers, footers, and footnotes unless a selection is used, while Microsoft Word exposes additional options and statistics. Those implementation details can explain a small mismatch.",
        ],
      },
      {
        heading: "Verify the body and excluded sections separately",
        paragraphs: [
          "Select only the text that counts under the assignment rule and record that subtotal. Then check any sections that are excluded so you can reproduce the calculation if asked. Saving the final document as a new version prevents later edits from changing the number after you record it.",
          "Watch for pasted text that contains nonbreaking spaces or line breaks, and scan the document for text inside images that no counter can read. If the required platform reports a different total after upload, use its preview and submission guidance rather than assuming the local number will be accepted.",
        ],
        bullets: [
          "Use the same file version for counting and submission.",
          "Select the included body text when the rules exclude front or end matter.",
          "Keep a small buffer instead of writing exactly to the maximum.",
        ],
      },
      {
        heading: "Revise for meaning instead of chasing a number",
        paragraphs: [
          "When a draft is too long, remove repeated claims, unnecessary setup, and evidence that does not advance the argument before cutting useful explanation. When it is too short, identify missing reasoning, examples, counterarguments, or connections to the prompt rather than adding filler phrases.",
          "Run the count again after citations and formatting are complete. A word counter measures length, not quality, accuracy, or originality. Use it as a constraint check alongside the rubric, source requirements, and a final read for clarity.",
        ],
      },
    ],
  },
  {
    slug: "calculate-daily-study-time",
    title: "How to turn a study-hour goal into a daily plan",
    description:
      "Divide a study goal across real available days, choose concrete tasks, add spacing and retrieval, and adjust after missed sessions.",
    category: "Study",
    readingMinutes: 7,
    relatedTools: ["study-time-calculator", "semester-countdown", "reading-time-calculator"],
    publishedOn: "2026-10-14",
    reviewedOn: "2026-10-14",
    sources: [
      {
        title: "Improving Students' Learning With Effective Learning Techniques",
        publisher: "Psychological Science in the Public Interest",
        href: "https://pubmed.ncbi.nlm.nih.gov/26173288/",
      },
      {
        title: "Improving Students' Learning With Effective Learning Techniques",
        publisher: "Association for Psychological Science",
        href: "https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html",
      },
    ],
    sections: [
      {
        heading: "Define the total from tasks, not a hopeful number",
        paragraphs: [
          "List the work needed for the exam or deadline: chapters to read, problems to solve, concepts to retrieve, drafts to revise, and practice tests to review. Estimate a range for each item and add the higher values for unfamiliar work. A total built from tasks is easier to revise than an arbitrary promise to study a certain number of hours.",
          "Separate essential work from optional work. If the schedule becomes tight, this ranking shows what to protect. Include time for checking answers and revisiting errors; practice without feedback can consume hours without showing which ideas still need attention.",
        ],
      },
      {
        heading: "Count days by actual capacity",
        paragraphs: [
          "A calendar may show fourteen days, but work shifts, classes, travel, sleep, and other deadlines reduce the usable time. Assign a realistic capacity to each day. An open Saturday might hold three focused blocks, while a class-heavy weekday may hold only one short review.",
          "Divide the remaining study hours by the sum of usable days for a baseline. Then distribute the work unevenly to match capacity. Twelve hours across eight available days averages ninety minutes per day, but the schedule can use longer weekend blocks and shorter weekday sessions while preserving the same total.",
        ],
        bullets: [
          "Daily baseline = remaining study hours ÷ remaining usable days.",
          "Schedule concrete tasks rather than hours with no outcome.",
          "Reserve at least one buffer block before the deadline.",
        ],
      },
      {
        heading: "Spend the time on methods that reveal learning",
        paragraphs: [
          "Include practice testing and distributed practice instead of filling every session with rereading. Try to recall an answer before looking at notes, solve a problem without the example beside it, or explain a concept from memory. The difficulty of retrieval provides information about what is and is not learned.",
          "Return to important material on more than one day. Spacing creates multiple opportunities to retrieve and correct knowledge. Mix new work, review, and error correction so a long session does not create a misleading sense of fluency from seeing the same material repeatedly.",
        ],
      },
      {
        heading: "Recalculate after every meaningful change",
        paragraphs: [
          "At the end of a session, record what was completed and update the remaining estimate. If a chapter took twice as long as expected, adjust the future blocks immediately. After a missed day, divide the outstanding work across the days that truly remain rather than pretending the original average still applies.",
          "If the new daily requirement is unrealistic, change the scope, seek help, or renegotiate a deadline when that is possible. Protecting sleep and basic routines is part of a workable plan. The calculator can redistribute time, but it cannot make an overloaded schedule physically sustainable.",
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
