import { CategoryPage } from "@/components/tools/CategoryPage";
import { getCategory } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

const category = getCategory("grades");

export const metadata = createMetadata({
  title: `${category.name} Tools`,
  description: category.description,
  path: category.href,
});

export default function GradesPage() {
  return <CategoryPage category="grades" />;
}
