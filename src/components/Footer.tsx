import { motion } from 'motion/react';

const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    className="fill-muted-foreground hover:fill-primary transition-smooth h-5 w-5"
  >
    <path d="M107.89 8.17A105.15 105.15 0 0083.17 0a72.5 72.5 0 00-3.47 7.2 97.6 97.6 0 00-32.36 0A72.5 72.5 0 0043.87 0 105.15 105.15 0 0019.25 8.17C1.55 35.5-2.6 62.3.44 88.84a105.9 105.9 0 0032.9 7.52 76.6 76.6 0 006.4-10.4 69.3 69.3 0 01-10.1-4.9c.85-.63 1.68-1.28 2.5-1.94a74.4 74.4 0 0065.6 0c.82.66 1.65 1.3 2.5 1.94a69.3 69.3 0 01-10.1 4.9 76.6 76.6 0 006.4 10.4 105.9 105.9 0 0032.9-7.52c3.1-26.54-1.1-53.34-18.8-80.67zM48.7 65.3c-5.7 0-10.4-5.2-10.4-11.6s4.6-11.6 10.4-11.6 10.4 5.2 10.4 11.6-4.6 11.6-10.4 11.6zm29.7 0c-5.7 0-10.4-5.2-10.4-11.6s4.6-11.6 10.4-11.6 10.4 5.2 10.4 11.6-4.6 11.6-10.4 11.6z" />
  </svg>
);

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-base-100 text-base-content border-border mt-12 border-t px-6 py-12 md:px-20"
    >
     

      {/* Bas de page */}
      <div className="text-muted-foreground mt-8 text-center text-xs">
        © {new Date().getFullYear()} TSvoice. Tous droits réservés.
      </div>
    </motion.footer>
  );
};

export default Footer;
