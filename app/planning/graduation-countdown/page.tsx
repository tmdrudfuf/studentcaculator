import { GraduationCountdown } from "@/components/calculators/GraduationCountdown";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("graduation-countdown");
export const metadata = createToolMetadata(tool);

export default function GraduationCountdownPage() {
  return (
    <ToolPageLayout explanation={<><p>The countdown compares local calendar dates, not timestamps, so time zones and daylight saving changes do not shift the result.</p><p>Your selected date is stored only in this browser.</p></>} tool={tool}>
      <GraduationCountdown />
    </ToolPageLayout>
  );
}
