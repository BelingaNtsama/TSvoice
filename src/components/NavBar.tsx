// src/components/NavBar.tsx
import { MenuSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all'; // ScrollSmoother n'est plus importé ici directement
import { Link, useLocation } from 'react-router'; // Importer useLocation et Link de react-router-dom
import { initScrollSmoother, scrollToSection} from '../utils/ScrollUtils'; // Importer les utilitaires

// Pas besoin de registerPlugin ici car déjà fait dans scrollUtils

const Tab_Ancrages = [
  { id: 'fonctionnalites', label: 'Fonctionnalités' },
  { id: 'Temoignages', label: 'Témoignages' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'faq', label: 'FAQ' },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation(); // Utiliser useLocation pour l'URL

  useEffect(() => {
    // Initialiser ScrollSmoother au montage du composant
    initScrollSmoother();

    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };
    window.addEventListener('scroll', handleScroll);

    // Créer les ScrollTriggers pour les sections
    const scrollTriggers: ScrollTrigger[] = [];
    Tab_Ancrages.forEach(({ id }) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
      scrollTriggers.push(trigger);
    });

    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      scrollTriggers.forEach((trigger) => trigger.kill()); // Tuer les triggers individuels
      // Nous ne tuons pas smootherInstance ici car il est géré globalement
      // killScrollSmoother(); // Appel si vous voulez le tuer quand la NavBar est démontée
    };
  }, []); // Dépendances vides pour que cela ne s'exécute qu'une fois au montage

  // Gérer le scroll vers l'ancre si présente dans l'URL au chargement de la page
  useEffect(() => {
    const hash = location.hash.substring(1); // Supprimer le '#'
    if (hash && Tab_Ancrages.some((ancrage) => ancrage.id === hash)) {
      // S'assurer que le smoother est initialisé avant de tenter de scroller
      const smoother = initScrollSmoother();
      // Un léger délai peut être nécessaire pour que tous les éléments soient rendus
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, [location]); // Re-déclencher quand l'URL change

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 z-50 mx-auto flex w-11/12 items-center justify-between rounded-lg bg-transparent bg-clip-content p-4 shadow shadow-gray-100/5 backdrop-blur-md"
    >
      <h1 className="text-gradient text-2xl">TSvoice</h1>

      {/* Desktop navigation */}
      <div className="hidden items-center gap-6 text-lg text-gray-400 md:flex">
        {Tab_Ancrages.map(({ id, label }) => (
          <button
            key={id}
            className={`transition-smooth hover:text-white ${activeSection === id ? 'text-white' : ''}`}
            onClick={() => {
              scrollToSection(id);
              setIsOpen(false); // Ferme le menu mobile si ouvert
            }}
          >
            {label}
          </button>
        ))}
        <Link to={'/auth'} className="btn btn-primary">
          Commencer
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <MenuSquare className="text-primary h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="bg-base-100 absolute top-full left-0 flex w-full flex-col gap-4 rounded-b-lg p-4 text-gray-400 shadow-lg md:hidden"
          >
            {Tab_Ancrages.map(({ id, label }) => (
              <button
                key={id}
                className={`transition-smooth text-left hover:text-white ${activeSection === id ? 'text-white' : ''}`}
                onClick={() => {
                  scrollToSection(id);
                  setIsOpen(false); // Ferme le menu mobile après le clic
                }}
              >
                {label}
              </button>
            ))}
            <Link to={'/auth'} className="btn btn-primary">
              Commencer
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
