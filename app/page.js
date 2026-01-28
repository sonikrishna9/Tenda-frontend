
import Herobanner from "./components/Herobanner";
import Homeblog from "./components/Homeblog";
import HomeCategoriesSlider from "./components/HomeCategoriesSlider";
import HomeFeaturedProducts from "./components/HomeFeaturedProducts";
import HomePartnerProgram from "./components/HomePartnerProgram";

import Homeproducts from "./components/Homeproducts";
import TrustedClientsSection from "./components/TrustedClients";

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
