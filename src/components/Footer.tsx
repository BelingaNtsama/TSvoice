import { motion } from 'motion/react';

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
