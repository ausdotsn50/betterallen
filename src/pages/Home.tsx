import Hero from '../components/sections/Hero';
// import ServicesSection from '../components/home/ServicesSection';
import TourismPreviewSection from '../components/home/TourismPreviewSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import AboutSection from '../components/home/AboutSection';
import ContactPreviewSection from '../components/home/ContactPreviewSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Official website of your local government. Access government services, information, and resources."
        keywords="government, local government, services, public services, civic services"
      />
      <main className="grow">
        <Hero />
        {/* <ServicesSection preview={true} /> */}
        <TourismPreviewSection />
        <GovernmentActivitySection />
        <AboutSection />
        <ContactPreviewSection />
      </main>
    </>
  );
};

export default Home;
