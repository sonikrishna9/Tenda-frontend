const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

const formatSegment = (value = "") =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

async function getSingleProductSEO(parentCategory, productTitle) {
  const slug = `product/${parentCategory}/${productTitle}`;

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
    console.error("Single product SEO fetch failed:", error);
    return null;
  }
}

async function getProduct(parentCategory, productTitle) {
  try {
    const res = await fetch(
      `${API_URL}api/product/single-product/${parentCategory}/${productTitle}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const { product } = await res.json();
    return product || null;
  } catch (error) {
    console.error("Single product fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const parentCategory = resolvedParams?.parentCategory || "";
  const productTitle = resolvedParams?.productTitle || "";

  const seo = await getSingleProductSEO(parentCategory, productTitle);

  if (seo) {
    return {
      title: seo.metaTitle || "Product",
      description: seo.metaDescription || "Explore this product.",
    };
  }

  const product = await getProduct(parentCategory, productTitle);

  return {
    title: product?.title || formatSegment(productTitle) || "Product",
    description:
      product?.description?.slice(0, 160) ||
      `Explore ${formatSegment(productTitle)} in ${formatSegment(parentCategory)}.`,
  };
}

export default function ProductDetailLayout({ children }) {
  return children;
}
