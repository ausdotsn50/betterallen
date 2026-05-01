import { Outlet } from 'react-router-dom';
import SEO from '../../components/SEO';

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Allen municipality and the BetterGov initiative."
        keywords="Allen, municipality, BetterGov, BetterLGU, local government"
      />
      <main className="grow">
        {/* Child route renders here */}
        <Outlet />
      </main>
    </>
  );
};

export default About;
