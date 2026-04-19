import Productbanner from "../../components/ProductPages/Productbanner";
import ProductFAQ from "../ProductFAQ";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

const formatSegment = (value = "") =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

async function getProductSEO(slugSegments = []) {
  const normalizedSegments = Array.isArray(slugSegments)
    ? slugSegments.filter(Boolean)
    : [];
  const slug =
    normalizedSegments.length > 0
      ? `products/${normalizedSegments.join("/")}`
      : "products";

  try {
    const res = await fetch(
      `${API_URL}api/meta/seo-entry?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const { data } = await res.json();
    return data && Object.keys(data).length ? data : null;
  } catch (error) {
    console.error("Product SEO fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugSegments = Array.isArray(resolvedParams?.slug)
    ? resolvedParams.slug
    : [];
  const seo = await getProductSEO(slugSegments);

  if (seo) {
    return {
      title: seo.metaTitle || "Products",
      description: seo.metaDescription || "Browse our products",
    };
  }

  const fallbackTitle =
    slugSegments.length > 0
      ? `${formatSegment(slugSegments[slugSegments.length - 1])} | Products`
      : "Products";

  const fallbackDescription =
    slugSegments.length > 1
      ? `Explore products in ${formatSegment(slugSegments[1])} under ${formatSegment(slugSegments[0])}.`
      : slugSegments.length === 1
        ? `Explore products in ${formatSegment(slugSegments[0])}.`
        : "Browse our product categories and subcategories.";

  return {
    title: fallbackTitle,
    description: fallbackDescription,
  };
}

export default function ProductsPage() {
  return (
    <>
      <Productbanner />
      <ProductFAQ />
    </>
  );
}
