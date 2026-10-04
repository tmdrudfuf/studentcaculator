# Student Survival Tools — Technical Design

**Version:** 1.0  
**Status:** Ready for Implementation  
**Product:** Student Survival Tools  
**Platform:** Web  
**Architecture:** Static-first / Client-side calculators  
**Primary Goal:** SEO-friendly, low-cost, fast student utility website

---

# 1. Technical Goals

이 프로젝트의 기술적 우선순위는 다음 순서다.

1. **Calculation correctness**
2. **SEO**
3. **Page speed**
4. **Mobile usability**
5. **Maintainability**
6. **Near-zero operating cost**

MVP에서는 복잡한 backend architecture를 만들지 않는다.

핵심 구조:

```text
Browser
   ↓
Next.js page
   ↓
React calculator UI
   ↓
Pure TypeScript calculation function
   ↓
Result
```

대부분의 calculator는 서버 요청 없이 동작한다.

---

# 2. Core Technology Stack

## Framework

**Next.js**

사용 목적:

- Static generation
- SEO-friendly routing
- Metadata
- Sitemap
- Fast page delivery
- React ecosystem

App Router를 사용한다.

---

## Language

**TypeScript**

모든 calculator logic과 component를 strict TypeScript로 구현한다.

JavaScript-only source는 사용하지 않는다.

---

## UI

**React**

Calculator form과 interactive result 부분만 client component로 만든다.

가능한 페이지 전체를 client component로 만들지 않는다.

---

## Styling

**Tailwind CSS**

목적:

- 빠른 responsive implementation
- consistent spacing
- utility-first design
- 적은 custom CSS

---

# 3. Architecture Principle

가장 중요한 원칙:

> **Server Components by default, Client Components only where interactivity is required.**

예:

```text
Tool page
├── Server
│   ├── Metadata
│   ├── Header
│   ├── Description
│   ├── FAQ
│   ├── Examples
│   └── Related content
│
└── Client
    └── Calculator
```

Calculator만 browser JavaScript를 사용한다.

이렇게 해서 초기 JS bundle을 최소화한다.

---

# 4. Backend

## MVP Backend

**없음**

사용하지 않는다:

- Express
- NestJS
- Supabase
- Firebase
- PostgreSQL
- MongoDB
- REST API
- GraphQL

MVP calculator에 필요하지 않다.

---

# 5. Authentication

없음.

사용자:

- 로그인하지 않음
- 계정을 만들지 않음
- profile을 만들지 않음

---

# 6. Database

없음.

사용자 GPA, grades, essay 등의 데이터를 server에 저장하지 않는다.

---

# 7. Repository Structure

추천 구조:

```text
student-survival-tools/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── grades/
│   │   ├── page.tsx
│   │   ├── final-grade-calculator/
│   │   │   └── page.tsx
│   │   ├── gpa-calculator/
│   │   │   └── page.tsx
│   │   ├── cumulative-gpa-calculator/
│   │   │   └── page.tsx
│   │   ├── target-gpa-calculator/
│   │   │   └── page.tsx
│   │   ├── weighted-grade-calculator/
│   │   │   └── page.tsx
│   │   └── grade-percentage-calculator/
│   │       └── page.tsx
│   │
│   ├── planning/
│   ├── study/
│   ├── writing/
│   │
│   ├── about/
│   ├── privacy/
│   └── contact/
│
├── components/
│   ├── calculators/
│   ├── forms/
│   ├── results/
│   ├── layout/
│   ├── navigation/
│   ├── tools/
│   └── analytics/
│
├── lib/
│   ├── calculators/
│   ├── validation/
│   ├── analytics/
│   ├── storage/
│   ├── dates/
│   └── seo/
│
├── data/
│   ├── tools.ts
│   ├── grade-scales.ts
│   └── related-tools.ts
│
├── types/
│   ├── calculator.ts
│   ├── tools.ts
│   └── analytics.ts
│
├── tests/
│   ├── calculators/
│   ├── components/
│   └── e2e/
│
└── public/
```

---

# 8. Calculator Architecture

UI와 계산 logic을 반드시 분리한다.

잘못된 형태:

```text
FinalGradeCalculator.tsx

UI
+
formula
+
validation
+
formatting
+
analytics
```

하나에 전부 넣지 않는다.

대신:

```text
UI
↓
Validation
↓
Calculator function
↓
Result model
↓
Result UI
```

구조로 한다.

---

# 9. Pure Calculation Functions

모든 핵심 계산은 **pure function**으로 만든다.

예:

```ts
calculateFinalGrade(input)
```

입력이 같으면 언제나 같은 결과가 나온다.

React에 의존하지 않는다.

DOM에 의존하지 않는다.

LocalStorage를 읽지 않는다.

Analytics를 호출하지 않는다.

따라서 unit test가 매우 쉬워진다.

---

# 10. Shared Calculator Result Model

가능하면 calculator 결과를 공통 패턴으로 맞춘다.

개념적으로:

```ts
type CalculationResult<T> = {
  status: "success" | "impossible" | "already_reached";
  value?: T;
  message: string;
};
```

각 calculator는 필요한 추가 데이터를 확장한다.

예:

```ts
type FinalGradeResult = {
  status:
    | "reachable"
    | "impossible"
    | "already_secured";

  requiredScore: number | null;
  maximumFinalGrade: number;
  scenarios: FinalGradeScenario[];
};
```

---

# 11. Formatting Layer

Calculation function은 가능한 한 raw number를 반환한다.

UI formatting은 별도 helper가 담당한다.

예:

```text
93
→ 93%

93.2564
→ 93.26%

3.700
→ 3.7
```

Shared utilities:

```text
formatPercentage()
formatGpa()
formatDuration()
formatDays()
```

---

# 12. Input Validation

Validation을 component마다 직접 작성하지 않는다.

공통 validation helper를 사용한다.

예:

```text
validatePercentage()
validatePositiveNumber()
validateGpa()
validateDate()
validateCredits()
```

---

# 13. Error Model

Field error:

```ts
{
  field: "finalWeight",
  message: "Final exam weight must be between 1% and 100%."
}
```

Calculation error와 form validation error를 구분한다.

사용자에게 stack trace나 internal error message를 보여주지 않는다.

---

# 14. Final Grade Engine

Input:

```ts
type FinalGradeInput = {
  currentGrade: number;
  finalWeight: number;
  desiredGrade: number;
};
```

Formula:

```text
desired -
(current × remaining weight)

÷ final weight
```

Return:

```ts
type FinalGradeResult = {
  status:
    | "reachable"
    | "already_secured"
    | "impossible";

  requiredScore: number | null;
  maximumPossibleGrade: number;
  minimumPossibleGrade: number;
  scenarios: {
    examScore: number;
    courseGrade: number;
  }[];
};
```

---

# 15. GPA Engine

Grade mapping을 central data file로 관리한다.

```ts
const DEFAULT_GRADE_SCALE = {
  A: 4,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  ...
  F: 0,
};
```

Calculator component 안에 grade mapping을 hardcode하지 않는다.

---

# 16. Semester GPA

Input:

```ts
type CourseGrade = {
  id: string;
  name?: string;
  credits: number;
  grade: GradeLetter;
};
```

Output:

```ts
type SemesterGpaResult = {
  gpa: number;
  totalCredits: number;
  qualityPoints: number;
};
```

Formula:

```text
Σ(grade point × credits)
────────────────────────
Σ credits
```

---

# 17. Cumulative GPA

Input:

```ts
type CumulativeGpaInput = {
  currentGpa: number;
  completedCredits: number;
  semesterGpa: number;
  semesterCredits: number;
};
```

Output:

```ts
{
  newGpa,
  previousGpa,
  change,
  totalCredits
}
```

---

# 18. Target GPA

Input:

```ts
type TargetGpaInput = {
  currentGpa: number;
  completedCredits: number;
  targetGpa: number;
  upcomingCredits: number;
  maxGpa?: number;
};
```

Default:

```text
maxGpa = 4.0
```

Output status:

```text
reachable
impossible
already_reached
```

Impossible일 경우 추가 반환:

```text
maximumPossibleGpa
```

그리고 가능하면:

```text
estimatedCreditsNeededAtMaxGpa
```

를 계산한다.

---

# 19. Weighted Grade

Data:

```ts
type GradeCategory = {
  id: string;
  name?: string;
  weight: number;
  grade: number;
};
```

두 값 모두 계산할 수 있도록 한다.

### Normalized current grade

```text
Σ(weight × grade)
───────────────
Σ(weight)
```

### Overall contribution

```text
Σ(weight × grade)
```

UI에서는 normalized current grade를 primary로 보여준다.

또한:

```text
Entered categories = 75% of course
```

를 보여준다.

---

# 20. Grade Percentage

단순 pure function:

```text
earned / total × 100
```

earned > total 허용.

total <= 0 금지.

---

# 21. Date Utilities

Graduation Countdown, Semester Countdown, Study Time이 동일한 date logic을 공유한다.

파일:

```text
lib/dates/
```

필요 helper:

```text
daysBetween()
weekdaysBetween()
weeksBetween()
isPastDate()
```

날짜 계산은 local calendar date 기준으로 일관되게 처리한다.

시간대 때문에 하루가 달라지는 bug가 없어야 한다.

---

# 22. Study Time Calculator

Output은 raw minutes 기반으로 처리한다.

예:

```ts
{
  daysAvailable: 10,
  totalMinutes: 900,
  minutesPerDay: 90
}
```

UI:

```text
90
→ 1 hr 30 min
```

---

# 23. Word Counter

Word Counter는 매 keystroke마다 동작하므로 효율적이어야 한다.

계산:

```text
wordCount
characterCountWithSpaces
characterCountWithoutSpaces
sentenceCount
paragraphCount
```

Essay text는:

- server 전송 금지
- analytics 금지
- LocalStorage 저장도 MVP에서는 기본적으로 하지 않는다

---

# 24. Reading Time

Reusable helper:

```ts
calculateReadingTime(wordCount, wordsPerMinute)
```

Recommended presets:

```text
Slow
Average
Fast
```

정확한 WPM 수치는 configurable data로 둔다.

Component 안에 magic number로 흩어놓지 않는다.

---

# 25. Tool Registry

사이트의 모든 tool 정보를 central registry로 관리한다.

예:

```ts
type ToolDefinition = {
  slug: string;
  name: string;
  question: string;
  description: string;
  category: ToolCategory;
  href: string;
  relatedTools: string[];
};
```

파일:

```text
data/tools.ts
```

이를 사용해서:

- Homepage
- Category page
- Related Tools
- Navigation

을 생성한다.

같은 정보를 여러 곳에서 수동으로 복사하지 않는다.

---

# 26. Related Tools Architecture

직접 component마다 링크를 hardcode하지 않는다.

예:

```ts
relatedTools: [
  "weighted-grade-calculator",
  "gpa-calculator",
  "grade-percentage-calculator"
]
```

Tool Registry가 실제 URL/title을 resolve한다.

---

# 27. LocalStorage

MVP에서 저장 가능한 데이터:

```text
graduationDate
semesterEndDate
```

선택적으로:

```text
lastGpaCourses
```

는 나중에 추가 가능하다.

초기에는 date settings만 저장하는 것이 좋다.

---

# 28. Storage Schema

Key에 project namespace를 사용한다.

예:

```text
sst:graduation-date
sst:semester-end-date
```

versioning이 필요한 데이터라면:

```ts
{
  version: 1,
  value: ...
}
```

구조를 사용한다.

---

# 29. Privacy

다음 데이터는 analytics로 보내지 않는다.

- GPA
- Grade
- Scores
- Credits
- Essay text
- Course names
- Graduation date
- Semester date

Analytics에는 행동만 보낸다.

예:

```text
calculation_completed

tool = target_gpa
result_state = impossible
```

---

# 30. Analytics Architecture

UI에서 Google Analytics API를 직접 여기저기 호출하지 않는다.

wrapper를 만든다.

```text
lib/analytics/
```

예:

```ts
trackToolViewed()
trackCalculationStarted()
trackCalculationCompleted()
trackCalculationError()
trackRelatedToolClick()
```

Analytics provider를 나중에 교체해도 calculator code가 변경되지 않도록 한다.

---

# 31. Analytics Events

Required:

```text
tool_viewed
calculation_started
calculation_completed
calculation_error
related_tool_clicked
```

Allowed metadata:

```text
tool_name
tool_category
result_state
source_tool
destination_tool
```

Forbidden:

```text
current_gpa
desired_gpa
grade
credits
essay
course_name
```

---

# 32. SEO Architecture

각 page에서 metadata를 작성하되 shared helper를 사용한다.

```text
lib/seo/
```

예:

```ts
createToolMetadata(tool)
```

생성:

- title
- description
- canonical
- Open Graph

---

# 33. Sitemap

Next.js sitemap 기능을 사용한다.

포함:

- homepage
- category pages
- all 12 tool pages
- about
- privacy
- contact

---

# 34. robots.txt

Production에서:

```text
User-agent: *
Allow: /
```

정상 indexing 허용.

Staging 환경은 indexing하지 않도록 설정한다.

---

# 35. Structured Data

필요한 곳에서만 사용한다.

가능한 후보:

- WebSite
- BreadcrumbList

FAQ schema는 실제 검색 정책과 page content에 맞을 때만 고려한다.

Schema markup을 SEO trick처럼 사용하지 않는다.

---

# 36. Tool Content Model

각 tool page에서 다음 데이터를 분리할 수 있다.

```ts
{
  intro,
  example,
  explanation,
  formula,
  faq
}
```

MVP에서는 TypeScript/static content로 충분하다.

CMS는 사용하지 않는다.

---

# 37. Components

Recommended shared components:

```text
ToolPageLayout

CalculatorCard

NumberField

PercentageField

DateField

CourseRow

CategoryRow

PrimaryResult

ResultMessage

ScenarioTable

RelatedTools

ToolCard

CategorySection

Breadcrumbs

FAQSection
```

---

# 38. Result Components

Calculator마다 완전히 다른 result UI를 만드는 대신 기본 pattern을 재사용한다.

예:

```text
PrimaryResult
├── eyebrow
├── value
├── unit
└── explanation
```

예:

```text
You need

93.2%

on your final
```

---

# 39. Form State

복잡한 global state management library는 사용하지 않는다.

사용하지 않음:

- Redux
- Zustand
- MobX

대부분:

```text
React state
```

면 충분하다.

---

# 40. Forms

MVP calculator complexity상 heavy form framework는 필수가 아니다.

React state + shared validation으로 시작한다.

필요성이 명확해질 때만 form library를 추가한다.

---

# 41. Dependency Rule

새 dependency를 추가하기 전 질문:

> 직접 20–50줄로 안전하게 구현할 수 있는가?

YES면 dependency를 추가하지 않는 쪽을 우선한다.

특히:

- percentage formatting
- simple formulas
- date countdown
- word counting

때문에 큰 library를 설치하지 않는다.

---

# 42. Testing Strategy

테스트를 세 단계로 나눈다.

```text
Unit
↓
Component
↓
E2E
```

---

# 43. Unit Tests

가장 중요하다.

모든 calculator pure function은 unit test를 가진다.

최소:

### Final Grade

- normal reachable
- exactly 100 required
- >100 impossible
- already secured
- decimal inputs
- boundary weights

### Semester GPA

- single course
- multiple courses
- mixed credits
- F
- decimals
- zero credit rejection

### Target GPA

- reachable
- impossible
- already reached
- exact 4.0 requirement
- zero upcoming credits rejection

### Weighted Grade

- exactly 100 weight
- partial weights
- decimals
- >100 combined weights handling

### Date calculators

- same day
- future
- past
- leap year
- month boundary

---

# 44. Component Tests

중요한 behavior만 테스트한다.

예:

```text
user enters values
↓
clicks Calculate
↓
correct result appears
```

검증:

- error rendering
- add/remove row
- impossible result
- localStorage loading

---

# 45. End-to-End Tests

Launch-critical flow만 E2E로 테스트한다.

최소:

### Flow 1

Homepage

→ Final Grade Calculator

→ Calculate

→ Related GPA Tool

### Flow 2

Target GPA Calculator

→ impossible target

→ maximum possible GPA shown

### Flow 3

Semester GPA

→ multiple courses

→ result

### Flow 4

Graduation Countdown

→ date

→ persistence after reload

### Flow 5

Word Counter

→ paste text

→ live counts update

---

# 46. Test Tools

Recommended categories:

- Unit/component: lightweight JS/React test framework
- E2E: browser automation framework

구현 시점의 Next.js ecosystem과 호환성이 좋은 mainstream option을 선택한다.

과도한 test dependency는 피한다.

---

# 47. Calculation Accuracy Rule

Calculator 변경은 반드시:

```text
code change
+
unit test
```

를 함께 포함한다.

Formula 변경을 UI snapshot 테스트만으로 승인하지 않는다.

---

# 48. Accessibility Testing

최소 확인:

- keyboard-only calculator completion
- tab order
- input labels
- visible focus
- screen-reader-friendly result
- error association
- contrast

가능하면 automated accessibility 검사도 CI에 포함한다.

---

# 49. Performance

페이지의 주요 content는 server-render/static이어야 한다.

피해야 함:

```text
entire page "use client"
```

이미지 사용을 최소화한다.

Calculator 사이트 특성상 hero image가 꼭 필요하지 않다.

---

# 50. Fonts

가능하면 최적화된 web font 또는 system font를 사용한다.

다수의 font family/weight를 다운로드하지 않는다.

---

# 51. Icons

필요하면 lightweight icon library 하나만 사용한다.

다른 icon package를 여러 개 설치하지 않는다.

---

# 52. Responsive Breakpoints

Mobile-first.

주요 target:

```text
~320px+
phone

tablet

desktop
```

계산 UI는 phone에서도 완전한 기능을 제공해야 한다.

---

# 53. Deployment

추천 우선순위:

## Option A

**Cloudflare**

또는

## Option B

Next.js와 호환성이 좋은 static/serverless hosting provider.

MVP architecture에서는 backend compute 요구가 거의 없다.

실제 deployment provider는 구현 직전 현재 Next.js 지원 상태와 pricing을 확인해서 확정한다.

---

# 54. Environments

최소:

```text
development
production
```

필요하면:

```text
preview
```

도 사용한다.

Preview 환경은 search indexing을 방지한다.

---

# 55. Environment Variables

가능한 적게 사용한다.

예:

```text
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_SITE_URL
```

Secret API key는 MVP에서 없어야 정상이다.

---

# 56. CI

GitHub Actions 또는 hosting provider integration을 사용한다.

Pull Request마다 최소:

```text
lint
typecheck
unit tests
build
```

를 통과해야 한다.

가능하면:

```text
E2E smoke tests
```

도 포함한다.

---

# 57. Code Quality Gates

Merge 전:

```text
lint       PASS
typecheck  PASS
tests      PASS
build      PASS
```

가 기본이다.

---

# 58. Git Strategy

초기 개인 프로젝트이므로 복잡한 Git Flow는 사용하지 않는다.

추천:

```text
main
+
short-lived feature branches
```

예:

```text
feat/final-grade-calculator
feat/gpa-calculator
fix/target-gpa-impossible-state
```

---

# 59. Commit Style

작고 의미 있는 commit.

예:

```text
feat: add final grade calculation engine

test: cover impossible final grade cases

feat: add final grade calculator UI
```

한 commit에 전체 MVP를 넣지 않는다.

---

# 60. Security

공격 surface가 낮지만 기본 보안은 유지한다.

특히 Word Counter에서 입력 text를 HTML로 직접 render하지 않는다.

사용자 text는 escaped plain text로 취급한다.

`dangerouslySetInnerHTML`은 사용하지 않는다.

---

# 61. Dependency Security

불필요한 packages를 줄이는 것이 최선의 protection 중 하나다.

주기적으로 dependency vulnerability를 확인한다.

---

# 62. Error Monitoring

MVP 초기에는 별도 paid monitoring이 필수는 아니다.

Production console error와 analytics를 우선 본다.

Traffic이 증가하면 error monitoring service 추가를 검토한다.

---

# 63. Logging

사용자의 actual academic input을 log하지 않는다.

Bad:

```text
User calculated GPA 2.87
```

Good:

```text
target_gpa calculation completed
status: reachable
```

---

# 64. Tool Page Rendering Strategy

각 page의 static content:

- title
- intro
- example
- FAQ
- related links

은 server/static.

Calculator interactive portion만 client.

---

# 65. Category Pages

다음 page를 만든다.

```text
/grades
/planning
/study
/writing
```

각 category page에:

- short explanation
- relevant tools
- natural internal links

를 제공한다.

---

# 66. Homepage Data

Homepage cards도 Tool Registry를 사용한다.

별도로 calculator 이름을 hardcode하지 않는다.

---

# 67. URL Stability

Launch 후 URL은 최대한 변경하지 않는다.

SEO asset이기 때문이다.

예:

```text
/grades/final-grade-calculator
```

는 stable URL로 취급한다.

---

# 68. 404

Custom 404 page.

내용:

> Couldn't find that tool.

그리고:

- Final Grade
- GPA
- Target GPA

등 인기 tool 링크를 제공한다.

---

# 69. Calculation Roundoff

중요:

내부 계산에서는 중간 단계에서 round하지 않는다.

예:

```text
raw calculation
↓
raw calculation
↓
final result
↓
format for display
```

중간값 rounding으로 GPA 결과가 바뀌는 문제를 방지한다.

---

# 70. Floating Point

일반적인 academic calculation에서는 JS number로 충분하다.

Financial-level decimal library는 필요하지 않다.

단 unit tests에서 tolerance를 사용한다.

---

# 71. Grade Scale

MVP default:

**US 4.0 scale**

명확히 표시한다.

학교별 grade point variation이 있으므로:

> Grade scales can vary by school.

안내 문구를 넣는다.

Custom scale은 MVP 이후 기능이다.

---

# 72. Date Storage

날짜는:

```text
YYYY-MM-DD
```

형태로 저장한다.

timestamp로 저장해서 timezone 때문에 하루가 바뀌는 문제를 피한다.

---

# 73. Analytics + Consent

실제 출시 전에:

- Google Analytics 정책
- AdSense
- target geography
- cookie/consent requirements

를 검토해서 필요한 consent architecture를 적용한다.

광고 적용 전 privacy implementation을 한 번 더 검토한다.

---

# 74. Advertising Architecture

초기 launch에는 광고가 없어도 된다.

나중에:

```text
<AdSlot position="after-result" />
```

같은 abstraction을 만들 수 있게 page layout을 설계한다.

AdSense code를 calculator component 안에 직접 넣지 않는다.

---

# 75. Feature Flags

복잡한 feature flag service는 사용하지 않는다.

필요하면 환경 변수 또는 static config:

```ts
adsEnabled: false
```

정도로 충분하다.

---

# 76. MVP Bundle Philosophy

목표:

> calculator website답게 매우 가볍게.

설치 전에 항상 생각한다.

```text
Do we actually need this package?
```

---

# 77. Codex Development Rule

Codex는 각 milestone 시작 전에:

1. 관련 PRD section 읽기
2. Technical Design 읽기
3. 기존 architecture 확인
4. 구현 계획 작성
5. implementation
6. tests
7. report

순서로 작업한다.

---

# 78. Codex Completion Report

각 milestone마다 다음 형식으로 보고한다.

```text
Implemented
Tests
Files changed
Architecture decisions
Known issues
Deferred items
Manual verification required
Commit SHA
```

---

# 79. Milestone 0 — Foundation

Codex 첫 작업.

## Tasks

- Next.js project setup
- TypeScript strict mode
- Tailwind
- App Router
- Base layout
- Header/Footer
- Homepage skeleton
- Category routes
- Tool registry
- Shared metadata helper
- Shared form primitives
- Shared result primitives
- Analytics abstraction
- Test framework
- CI
- lint/typecheck/test/build

## Done When

```text
npm install
npm test
npm run build
```

등 repository standard commands가 성공하고,

homepage와 empty category pages가 실행된다.

Calculator 구현은 아직 하지 않는다.

---

# 80. Milestone 1 — Grade Core A

구현:

1. Final Grade Calculator
2. Grade Percentage Calculator
3. Weighted Grade Calculator

추가:

- unit tests
- result states
- validation
- related tool placeholders
- responsive UI

---

# 81. Milestone 2 — GPA Core

구현:

1. Semester GPA
2. Cumulative GPA
3. Target GPA

특히 Target GPA의:

```text
reachable
impossible
already reached
```

세 state를 철저히 테스트한다.

---

# 82. Milestone 3 — Planning

구현:

- Credit Completion
- Graduation Countdown
- LocalStorage date persistence

---

# 83. Milestone 4 — Study

구현:

- Study Time
- Semester Countdown
- shared date utilities

---

# 84. Milestone 5 — Writing

구현:

- Word Counter
- Reading Time
- shared text utilities

Essay text가 analytics에 들어가지 않는지 확인한다.

---

# 85. Milestone 6 — Integration

구현:

- Homepage final version
- Category pages
- Related Tools
- Breadcrumbs
- navigation
- shared result design
- consistent validation
- responsive refinement

---

# 86. Milestone 7 — SEO

구현:

- unique metadata
- canonical
- sitemap
- robots
- breadcrumbs
- examples
- explanations
- FAQs
- internal linking
- supported structured data

---

# 87. Milestone 8 — Launch Readiness

실행:

- full unit suite
- E2E
- mobile review
- browser review
- accessibility check
- performance review
- analytics validation
- privacy audit
- console error audit
- production build

---

# 88. Milestone 9 — Deployment

- production host
- custom domain
- HTTPS
- production analytics
- Search Console
- sitemap submission
- crawl verification

광고는 아직 optional.

---

# 89. Technical Definition of Done

MVP 기술적으로 완료된 상태:

```text
12 calculators working

all calculator engines tested

production build passes

mobile usable

SEO pages crawlable

analytics works

no backend required

no account required

no private academic values tracked

Search Console configured

production deployed
```

---

# 90. Final Architecture

최종 MVP 구조:

```text
                 Google
                    ↓
              Static SEO Page
                    ↓
         Interactive Calculator
                    ↓
          Pure TypeScript Engine
                    ↓
             Clear Result
                    ↓
            Related Tool Link
                    ↓
              Another Page
```

Infrastructure:

```text
Next.js
React
TypeScript
Tailwind
Static/server rendering
Browser calculations
LocalStorage
Analytics
No DB
No API
No Auth
```

핵심 원칙:

> **Keep the product simple enough that traffic—not infrastructure—is the primary scaling challenge.**