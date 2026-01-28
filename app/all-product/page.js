import { Suspense } from "react";
import Productbanner from "../components/ProductPages/Productbanner";
import ProductCategoriesPage from "./ProductCategoriesPage";
import ProductContent from "./ProductContent";
import ProductFAQ from "./ProductFAQ";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <>
      <Productbanner />

      {/* ONLY wrap the component using useSearchParams */}
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <ProductCategoriesPage />
      </Suspense>

      <ProductContent />
      <ProductFAQ />
    </>
  );
}
