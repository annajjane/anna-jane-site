// app/paintings/page.tsx
import { getSupabase } from "../lib/supabase";

type PaintingRow = {
  id: string;
  title: string;
  year: string | null;
  medium: string | null;
  size: string | null;
  price_label: string | null;
  status: "Available" | "Sold";
  image_url: string;
  created_at: string;
};

export default async function PaintingsPage() {
  const supabase = getSupabase();

  const { data: paintings, error } = await supabase
    .from("paintings")
    .select("id, title, year, medium, size, price_label, status, image_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Paintings</h1>
        <p className="text-sm text-neutral-600">Error loading paintings: {error.message}</p>
      </div>
    );
  }

  if (!paintings || paintings.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Paintings</h1>
        <p className="text-sm text-neutral-600">No paintings listed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Paintings</h1>
        <p className="text-sm text-neutral-600">Minimal gallery. Checkout will be added later.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {(paintings as PaintingRow[]).map((p) => (
          <div key={p.id} className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image_url}
              alt={p.title}
              className="w-full rounded border border-neutral-200"
            />

            <div className="flex justify-between text-sm">
              <span className="font-medium">{p.title}</span>
              <span className="text-neutral-600">
                {p.status === "Sold" ? "Sold" : p.price_label ?? ""}
              </span>
            </div>

            <div className="text-sm text-neutral-600">
              {[p.year, p.medium, p.size].filter(Boolean).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
