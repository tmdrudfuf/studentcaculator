import { StudyTimeCalculator } from "@/components/calculators/StudyTimeCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("study-time-calculator");
export const metadata = createToolMetadata(tool);

export default function StudyTimeCalculatorPage() {
  return (
    <ToolPageLayout explanation={<><p>Total study minutes are divided evenly across the days available.</p><p>The result remains in raw minutes internally and is formatted into hours and minutes for display.</p></>} tool={tool}>
      <StudyTimeCalculator />
    </ToolPageLayout>
  );
}
