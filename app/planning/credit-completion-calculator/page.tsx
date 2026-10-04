import { CreditCompletionCalculator } from "@/components/calculators/CreditCompletionCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("credit-completion-calculator");
export const metadata = createToolMetadata(tool);

export default function CreditCompletionCalculatorPage() {
  return (
    <ToolPageLayout explanation={<><p>Completed credits are divided by your program requirement.</p><p>Check your degree audit for the official requirement and any course-specific rules.</p></>} tool={tool}>
      <CreditCompletionCalculator />
    </ToolPageLayout>
  );
}
