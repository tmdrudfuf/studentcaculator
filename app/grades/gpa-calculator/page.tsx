import { SemesterGpaCalculator } from "@/components/calculators/SemesterGpaCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("gpa-calculator");
export const metadata = createToolMetadata(tool);

export default function GpaCalculatorPage() {
  return (
    <ToolPageLayout explanation={<><p>Each letter grade maps to the standard US 4.0 scale.</p><p>Grade points are multiplied by course credits, then divided by total credits.</p></>} tool={tool}>
      <SemesterGpaCalculator />
    </ToolPageLayout>
  );
}
