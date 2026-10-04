import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("weighted-grade-calculator");

export const metadata = createToolMetadata(tool);

export default function WeightedGradeCalculatorPage() {
  return (
    <ToolPageLayout
      explanation={
        <>
          <p>Each category grade is multiplied by its course weight.</p>
          <p>The primary result normalizes the categories entered, so partial course weights still give a useful current grade.</p>
          <p>Combined weights above 100% are rejected.</p>
        </>
      }
      tool={tool}
    >
      <WeightedGradeCalculator />
    </ToolPageLayout>
  );
}
