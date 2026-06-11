import NewsForm from "@/components/admin/NewsForm";
import { createNewsAction } from "@/app/admin/actions";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-[28px] text-burgundy-deep mb-6">Nouvelle actualité</h1>
      <NewsForm action={createNewsAction} />
    </div>
  );
}
