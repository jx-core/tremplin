import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import { updateNewsAction } from "@/app/admin/actions";
import { getNewsById } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(Number(id));
  if (!item) notFound();

  const action = updateNewsAction.bind(null, item.id);

  return (
    <div>
      <h1 className="font-display font-semibold text-[28px] text-burgundy-deep mb-6">Modifier l&apos;actualité</h1>
      <NewsForm action={action} item={item} />
    </div>
  );
}
