export type Issue = {
    slug: string;
    monthLabel: string;
    title: string;
    publishedAt: string;
    body: string[];
  };
  
  export type Painting = {
    id: string;
    title: string;
    year?: string;
    medium?: string;
    size?: string;
    priceLabel?: string;
    status?: "Available" | "Sold";
    imageUrl: string;
  };
  
  export const issues: Issue[] = [
    {
      slug: "january-2026",
      monthLabel: "January 2026",
      title: "January Issue: Title Placeholder",
      publishedAt: "2026-01-01",
      body: [
        "This is the opening paragraph of the January issue.",
        "Second paragraph. Each paragraph is its own string.",
        "Third paragraph."
      ]
    },
    {
      slug: "december-2025",
      monthLabel: "December 2025",
      title: "December Issue: Title Placeholder",
      publishedAt: "2025-12-01",
      body: ["Opening paragraph from December.", "Second paragraph from December."]
    }
  ];
  
  export const paintings: Painting[] = [
    {
      id: "p1",
      title: "Untitled No. 1",
      year: "2025",
      medium: "Oil on canvas",
      size: "18 × 24 in",
      priceLabel: "$900",
      status: "Available",
      imageUrl: "https://picsum.photos/seed/painting1/1200/1200"
    },
    {
      id: "p2",
      title: "Untitled No. 2",
      year: "2025",
      medium: "Acrylic on canvas",
      size: "16 × 20 in",
      priceLabel: "$700",
      status: "Available",
      imageUrl: "https://picsum.photos/seed/painting2/1200/1200"
    }
  ];

  