import { Outlet, useLocation, Navigate } from 'react-router-dom';

const About: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname === '/about' || pathname === '/about/') {
    return <Navigate to="/about/allen" replace />;
  }

  return (
    <main className="grow">
      <Outlet />
    </main>
  );
};

export default About;
