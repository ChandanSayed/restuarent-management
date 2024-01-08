import { useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Header />
        <Outlet />
        <Footer />
      </HelmetProvider>
    </>
  );
}

export default App;
