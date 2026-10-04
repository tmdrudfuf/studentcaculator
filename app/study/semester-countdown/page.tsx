import { SemesterCountdown } from "@/components/calculators/SemesterCountdown";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("semester-countdown");
export const metadata = createToolMetadata(tool);

export default function SemesterCountdownPage() {
  return (
    <ToolPageLayout explanation={<><p>The countdown uses local calendar dates to avoid time-zone shifts.</p><p>Weekdays exclude Saturdays and Sundays; school holidays are not excluded.</p></>} tool={tool}>
      <SemesterCountdown />
    </ToolPageLayout>
  );
}
