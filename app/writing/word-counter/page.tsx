import { WordCounter } from "@/components/calculators/WordCounter";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

const tool = getRequiredTool("word-counter");
export const metadata = createToolMetadata(tool);

export default function WordCounterPage() {
  return (
    <ToolPageLayout explanation={<><p>Counts update in your browser as you type.</p><p>Your draft is never sent to a server, stored in LocalStorage, or included in analytics.</p></>} tool={tool}>
      <WordCounter />
    </ToolPageLayout>
  );
}
