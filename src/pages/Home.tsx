import Hero from '../components/home-sections/Hero';
// import ServicesSection from '../components/home-sections/ServicesSection';
import TourismPreviewSection from '../components/home-sections/TourismPreviewSection';
import GovernmentActivitySection from '../components/home-sections/GovernmentActivitySection';
import AboutSection from '../components/home-sections/AboutSection';
import ContactPreviewSection from '../components/home-sections/ContactPreviewSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description={`Community-driven portal for ${import.meta.env.VITE_GOVERNMENT_NAME || 'Allen'}. Discover tourism attractions, government services, and local information for residents and visitors.`}
        keywords="government, tourism, services, attractions, local government"
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
