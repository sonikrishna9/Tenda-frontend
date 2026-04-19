// app/blogs/[slug]/page.js

import BlogDetail from "./BlogDetail";
import { normalizeMediaUrlsDeep } from "@/lib/media";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

// fetch function
async function getBlog(slug) {
  const res = await fetch(`${API_URL}api/blog/single/${slug}`, {
    next: { revalidate: 60 },
  });

  const json = await res.json();
  return normalizeMediaUrlsDeep(json.data);
}

// ✅ metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ correct

  const blog = await getBlog(slug);

  return {
    title: blog?.title || "Blog",
    description:
      blog?.excerpt ||
      blog?.content?.slice(0, 150),
  };
}

// ✅ page render
export default async function Page({ params }) {
  const { slug } = await params;  // ✅ yahan bhi fix lagana hai

  const blog = await getBlog(slug); // ❌ params.slug nahi

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <BlogDetail blog={blog} />;
}
