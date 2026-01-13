
import Herobanner from "./components/Herobanner";
import Homeblog from "./components/Homeblog";
import HomeFaq from "./components/Homefaq";
import HomePartnerProgram from "./components/HomePartnerProgram";

import Homeproducts from "./components/Homeproducts";
import TrustedClientsSection from "./components/TrustedClients";

export default function Home() {
  return (
    <>
      <Herobanner />
      <Homeproducts />
      <HomePartnerProgram />
      <TrustedClientsSection />
      <Homeblog />
      {/* <HomeFaq slug={"homepage"} /> */}
    </>
  );
}
