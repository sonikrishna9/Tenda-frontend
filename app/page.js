
// import Herobanner from "./components/Herobanner";
// import Homeblog from "./components/Homeblog";
// import HomeCategoriesSlider from "./components/HomeCategoriesSlider";
// import HomeFeaturedProducts from "./components/HomeFeaturedProducts";
// import HomePartnerProgram from "./components/HomePartnerProgram";

// import Homeproducts from "./components/Homeproducts";
// import TrustedClientsSection from "./components/TrustedClients";

// export default function Home() {
//   return (
//     <>
//       <Herobanner />
//       {/* <Homeproducts /> */}
//       <HomeCategoriesSlider />
//       <HomeFeaturedProducts />
//       <HomePartnerProgram />
//       <TrustedClientsSection />
//       <Homeblog />
//     </>
//   );
// }


import Herobanner from "./components/Herobanner";
import Homeblog from "./components/Homeblog";
import HomeCategoriesSlider from "./components/HomeCategoriesSlider";
import HomeFeaturedProducts from "./components/HomeFeaturedProducts";
import HomePartnerProgram from "./components/HomePartnerProgram";
import Homeproducts from "./components/Homeproducts";
import TrustedClientsSection from "./components/TrustedClients";

// 🔥 API URL
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

// 🔥 SEO FETCH
async function getSEO() {
  try {
    const res = await fetch(`${API_URL}api/meta/seo/home`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("API failed");

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("SEO Error:", err);
    return null;
  }
}

// 🔥 METADATA
export async function generateMetadata() {
  const seo = await getSEO();

  return {
    title: seo?.metaTitle || "Home Page",
    description: seo?.metaDescription || "Welcome to our website"
  };
}

// 🔥 PAGE
export default function Home() {
  return (
    <>
      <Herobanner />
      {/* <Homeproducts /> */}
      <HomeCategoriesSlider />
      <HomeFeaturedProducts />
      <HomePartnerProgram />
      <TrustedClientsSection />
      <Homeblog />
    </>
  );
}