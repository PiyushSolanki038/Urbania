import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Overview from "./components/Overview.jsx";
import InDetail from "./components/InDetail.jsx";
import FeaturesAnatomy from "./components/FeaturesAnatomy.jsx";
import Variants from "./components/Variants.jsx";
import Gallery from "./components/Gallery.jsx";
import Pricing from "./components/Pricing.jsx";
import Enquiry from "./components/Enquiry.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div id="top" style={{ position: "relative" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Overview />
      <InDetail />
      <FeaturesAnatomy />
      <Variants />
      <Gallery />
      <Pricing />
      <Enquiry />
      <Footer />
    </div>
  );
}
