import { FAQCategoryView } from '@/components/faq/view/faq-category-page';

export default function FAQCategoryPage({ params }: { params: { category: string } }) {
  return <FAQCategoryView params={params} />;
}
