import { normalizeMediaUrlsDeep } from "@/lib/media";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

async function getNews(slug) {
  try {
    const res = await fetch(`${API_URL}api/news/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const { data } = await res.json();
    return data ? normalizeMediaUrlsDeep(data) : null;
  } catch (error) {
    console.error("News detail metadata fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const news = slug ? await getNews(slug) : null;

  return {
    title: news?.title || "News",
    description: news?.description?.slice(0, 160) || "Read the latest news update.",
  };
}

export default function NewsDetailLayout({ children }) {
  return children;
}
