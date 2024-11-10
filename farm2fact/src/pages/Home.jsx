// pages/Home.tsx

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
