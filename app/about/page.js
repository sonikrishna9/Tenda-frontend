import AboutBanner from "./AboutUi";

// ✅ SEO (server side)

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export async function generateMetadata() {
  const res = await fetch(`${API_URL}api/meta/seo/about`, {
    cache: "no-store",
  });

  const { data } = await res.json();

  return {
    title: data?.metaTitle || "About Us",
    description: data?.metaDescription || "About page",
  };
}

// ✅ Page wrapper
export default function Page() {
  return <AboutBanner/>;
}

