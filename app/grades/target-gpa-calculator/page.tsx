import { TargetGpaCalculator } from "@/components/calculators/TargetGpaCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("target-gpa-calculator");
export const metadata = createToolMetadata(tool);

export default function TargetGpaCalculatorPage() {
  return (
    <ToolPageLayout explanation={<><p>The calculator solves for the GPA needed across your upcoming credits.</p><p>If the required GPA exceeds 4.0, it shows the maximum possible result and an estimated credit path.</p></>} tool={tool}>
      <TargetGpaCalculator />
    </ToolPageLayout>
  );
}
