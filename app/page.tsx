import Link from "next/link";
import { getSupabase } from "./lib/supabase";

type IssueRow = {
  slug: string;
  month_label: string;
  title: string;
  body: string[];
  published_at: string;
};

export default async function HomePage() {
  const supabase = getSupabase();

  // 1) Fetch newest issue (current)
  const { data: currentIssue, error: currentErr } = await supabase
    .from("issues")
    .select("slug, month_label, title, body, published_at")
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle<IssueRow>();

  if (currentErr) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Anna Jane Monthly</h1>
        <p className="text-sm text-neutral-600">
          Error loading current issue: {currentErr.message}
        </p>
      </div>
    );
  }

  if (!currentIssue) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Anna Jane Monthly</h1>
        <Link
          href="/paintings"
          className="text-sm text-neutral-600 underline underline-offset-4"
        >
          Paintings →
        </Link>
        <p className="text-sm text-neutral-600">No issues published yet.</p>
      </div>
    );
  }

  // 2) Fetch up to 3 older issues for homepage preview
  const { data: olderIssues, error: olderErr } = await supabase
    .from("issues")
    .select("slug, month_label, title, published_at")
    .lt("published_at", currentIssue.published_at)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <div className="space-y-12">
      {/* Current Issue */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Anna Jane Monthly</h1>
          <Link
            href="/paintings"
            className="text-sm text-neutral-600 underline underline-offset-4"
          >
            Paintings →
          </Link>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-neutral-600">{currentIssue.month_label}</p>
          <h2 className="text-xl font-medium">{currentIssue.title}</h2>
        </div>

        <article className="space-y-4 leading-7">
          {(currentIssue.body ?? []).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </section>

      {/* Archive Preview */}
      <section className="border-t border-neutral-200 pt-8 space-y-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-medium">Archive</h3>
          <Link href="/archive" className="text-sm underline underline-offset-4">
            View all
          </Link>
        </div>

        {olderErr ? (
          <p className="text-sm text-neutral-600">
            Error loading archive preview: {olderErr.message}
          </p>
        ) : !olderIssues || olderIssues.length === 0 ? (
          <p className="text-sm text-neutral-600">No past issues yet.</p>
        ) : (
          <div className="space-y-3">
            {olderIssues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/issue/${issue.slug}`}
                className="block rounded border border-neutral-200 p-4 hover:bg-neutral-50"
              >
                <div className="text-sm text-neutral-600">{issue.month_label}</div>
                <div className="font-medium">{issue.title}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
