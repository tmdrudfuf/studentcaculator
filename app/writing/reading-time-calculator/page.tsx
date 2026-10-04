import { ReadingTimeCalculator } from "@/components/calculators/ReadingTimeCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("reading-time-calculator");
export const metadata = createToolMetadata(tool);

export default function ReadingTimeCalculatorPage() {
  return (
    <ToolPageLayout explanation={<><p>Word count is divided by the selected words-per-minute pace.</p><p>Slow, average, and fast presets are centrally configured for consistent estimates.</p></>} tool={tool}>
      <ReadingTimeCalculator />
    </ToolPageLayout>
  );
}
