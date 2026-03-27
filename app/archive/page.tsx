// app/archive/page.tsx
import Link from "next/link";
import { getSupabase } from "../lib/supabase";

type IssueRow = {
  slug: string;
  month_label: string;
  title: string;
  published_at: string;
};

export default async function ArchivePage() {
  const supabase = getSupabase();

  const { data: issues, error } = await supabase
    .from("issues")
    .select("slug, month_label, title, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Archive</h1>
        <p className="text-sm text-neutral-600">Error loading archive: {error.message}</p>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Archive</h1>
        <p className="text-sm text-neutral-600">No issues yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Archive</h1>
        <p className="text-sm text-neutral-600">All past issues.</p>
      </div>

      <div className="space-y-3">
        {(issues as IssueRow[]).map((iss) => (
          <Link
            key={iss.slug}
            href={`/issue/${iss.slug}`}
            className="block rounded border border-neutral-200 p-4 hover:bg-neutral-50"
          >
            <div className="text-sm text-neutral-600">{iss.month_label}</div>
            <div className="font-medium">{iss.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
