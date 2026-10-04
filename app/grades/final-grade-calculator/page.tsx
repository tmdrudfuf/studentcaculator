import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("final-grade-calculator");

export const metadata = createToolMetadata(tool);

export default function FinalGradeCalculatorPage() {
  return (
    <ToolPageLayout
      explanation={
        <>
          <p>The calculator weighs your current grade against the portion of the course already completed.</p>
          <p>It then finds the final exam score needed to reach your desired overall grade.</p>
          <p>Results use full precision internally and round only for display.</p>
        </>
      }
      tool={tool}
    >
      <FinalGradeCalculator />
    </ToolPageLayout>
  );
}
