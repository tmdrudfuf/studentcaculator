import { CumulativeGpaCalculator } from "@/components/calculators/CumulativeGpaCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("cumulative-gpa-calculator");
export const metadata = createToolMetadata(tool);

export default function CumulativeGpaCalculatorPage() {
  return (
    <ToolPageLayout explanation={<><p>Your existing and semester GPAs are converted into quality points using their credit totals.</p><p>The combined quality points are divided by all completed credits.</p></>} tool={tool}>
      <CumulativeGpaCalculator />
    </ToolPageLayout>
  );
}
