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
        description={`Official website of ${import.meta.env.VITE_GOVERNMENT_NAME || 'Allen'}. Discover tourism attractions, government services, and local information for residents and visitors.`}
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
