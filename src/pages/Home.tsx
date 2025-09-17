'use client';

import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import TestimonialCarousel from '../components/Testimonials';
import PricingSection from '../components/Princing';
import Footer from '../components/Footer';

import { PlusCircle, EqualApproximately, PercentCircle, Plus, ArrowBigRight } from 'lucide-react';

import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import FAQSection from '../components/FAQ';
import { faqItems } from '../utils/const';
import { Link } from 'react-router';

const Stat = ({ target, icon, label }: { target: number; icon: JSX.Element; label: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = animate(count, target, {
            duration: 2,
            ease: 'easeOut',
          });
          observer.disconnect();
          return () => controls.stop();
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
  }, [count, target]);

  return (
    <motion.div
      ref={ref}
      className="flex w-24 flex-col justify-center space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-primary flex items-center justify-center gap-1 text-3xl">
        <motion.span>{rounded}</motion.span>
        {icon}
      </h2>
      <p className="text-base-content text-center text-lg">{label}</p>
    </motion.div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col gap-12" id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />

          {/* Statistiques animées */}
          <div className="bg-base-200 flex flex-wrap items-start justify-evenly px-6 py-12 md:px-20">
            <Stat target={99.5} icon={<PercentCircle />} label="Précision" />
            <Stat target={5} icon={<EqualApproximately />} label="Génération" />
            <Stat target={10} icon={<PlusCircle />} label="Voix Disponibles" />
            <Stat target={5} icon={<Plus />} label="Langues Disponibles" />
          </div>

          <TestimonialCarousel />
          <PricingSection />
          <FAQSection faqItems={faqItems}/>

          {/* Section CTA */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className=" space-y-6 px-6 py-16 text-center text-white md:px-20"
          >
            <h1 className="text-4xl font-bold text-white">Prêt à donner vie à vos mots ?</h1>
            <p className="mx-auto max-w-2xl text-lg">
              Rejoignez des milliers d’utilisateurs qui créent des voix IA réalistes avec TSvoice.
              <br />
              Testez la synthèse vocale instantanée et le clonage vocal professionnel dès
              maintenant.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to={'/auth'} className="btn btn-wide btn-primary h-14 text-xl shadow-gray-300/20 hover:shadow-md">
                Essayer Maintenant
                <ArrowBigRight className="ml-2 animate-pulse" />
              </Link>
              <button className="btn btn-wide hover:text-gradient flex h-14 items-center justify-center gap-2 border border-white text-xl transition-colors duration-300">
                Télécharger l'application
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
              </button>
            </div>
          </motion.section>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
