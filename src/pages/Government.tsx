import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import ElectedOfficialsNav from '../components/government/ElectedOfficialsNav';
import PageBanner from '@/components/ui/PageBanner';
import GovernmentNav from '@/components/government/GovernmentNav';

const Government: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isElectedOfficialsRoute = currentPath.startsWith(
    '/government/elected-officials'
  );

  // FIX: Safety Redirect. If user hits exactly /government, bounce them to elected-officials
  if (currentPath === '/government' || currentPath === '/government/') {
    return <Navigate to="/government/elected-officials" replace />;
  }

  // Fallback for the environment variable to prevent TS errors if it's undefined
  const govName = import.meta.env.VITE_GOVERNMENT_NAME || 'our municipality';

  return (
    <>
      <SEO
        title="Government"
        description={`Access information on elected leaders, municipal departments, and the component barangays of ${govName}.`}
        keywords="government, elected officials, municipal offices, barangays, local government"
      />

      <PageBanner
        title="Government"
        description="Access information on elected leaders, municipal departments, and the component barangays of Allen."
      />
      <Section
        className="p-3 mb-12"
        aria-label="Government information sections"
      >
        <GovernmentNav />

        {isElectedOfficialsRoute && (
          <nav className="mt-6" aria-label="Elected officials navigation">
            <ElectedOfficialsNav />
          </nav>
        )}

        {/* Nested content area for subroutes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </Section>
    </>
  );
};

export default Government;
