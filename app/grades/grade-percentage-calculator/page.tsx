import { GradePercentageCalculator } from "@/components/calculators/GradePercentageCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("grade-percentage-calculator");

export const metadata = createToolMetadata(tool);

export default function GradePercentageCalculatorPage() {
  return (
    <ToolPageLayout
      explanation={
        <>
          <p>Divide points earned by total points possible, then multiply by 100.</p>
          <p>Scores above 100% are allowed so extra credit works as expected.</p>
        </>
      }
      tool={tool}
    >
      <GradePercentageCalculator />
    </ToolPageLayout>
  );
}
