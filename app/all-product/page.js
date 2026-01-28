"use client";
import Productbanner from "../components/ProductPages/Productbanner";
import ProductCategoriesPage from "./ProductCategoriesPage";
import ProductContent from "./ProductContent";
import ProductFAQ from "./ProductFAQ";
import ProductSwiper from "./ProductSwiper";

export default function ProductsPage() {


  return (
    <>
      <Productbanner />
      <ProductCategoriesPage />
      {/* <ProductSwiper /> */}
      <ProductContent />
      <ProductFAQ />
    </>
  );
}