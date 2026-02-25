import Hero          from '../components/Hero';
import AboutUs       from '../components/AboutUs';
import Services      from '../components/Services';
import DoctorPreview from '../components/DoctorPreview';
import Contact       from '../components/Contact';
import Footer        from '../components/Footer';
import Navbar        from '../components/Navbar';
import WhatsAppButton from '../components/WhatsAppButton';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <DoctorPreview />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
