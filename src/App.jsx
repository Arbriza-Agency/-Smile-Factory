import './App.css';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import AboutUs       from './components/AboutUs';
import Services      from './components/Services';
import Doctors       from './components/Doctors';
import BeforeAfter   from './components/BeforeAfter';
import Testimonials  from './components/Testimonials';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      {/* Sticky navigation with blur */}
      <Navbar />

      <main>
        {/* 1 – Hero: full-screen banner with CTAs */}
        <Hero />

        {/* 2 – About us: clinic story, values, stats */}
        <AboutUs />

        {/* 3 – Services: orthodontics & general dentistry tabs */}
        <Services />

        {/* 4 – Doctors: meet the team */}
        <Doctors />

        {/* 5 – Before / After gallery with drag comparison */}
        <BeforeAfter />

        {/* 6 – Testimonials: patient reviews carousel */}
        <Testimonials />

        {/* 7 – Contact: form + map + info */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp button */}
      <WhatsAppButton />
    </>
  );
}
