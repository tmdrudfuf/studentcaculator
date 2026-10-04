import { CategoryPage } from "@/components/tools/CategoryPage";
import { getCategory } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

const category = getCategory("study");

export const metadata = createMetadata({
  title: `${category.name} Tools`,
  description: category.description,
  path: category.href,
});

export default function StudyPage() {
  return <CategoryPage category="study" />;
}
