import { motion } from 'framer-motion';
import type { FAQSectionProps } from '../utils/types';

export default function FAQSection(FaqItems: FAQSectionProps) {
  return (
    <section className="bg-base-300 px-6 py-24" id="faq">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-primary-content mb-6 text-4xl font-bold md:text-5xl">
            Questions fréquentes
          </h2>
          <p className="text-base-content mx-auto max-w-3xl text-xl opacity-80">
            Tout ce que vous devez savoir
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl" // Limiter la largeur de l'accordéon pour une meilleure lisibilité
        >
          {FaqItems.faqItems.map((item, index) => (
            <motion.div // Chaque élément de l'accordéon est animé individuellement
              key={index}
              initial={{ opacity: 0, x: -50 }} // Commence invisible et décalé à gauche
              whileInView={{ opacity: 1, x: 0 }} // Apparaît en se déplaçant vers la droite
              viewport={{ once: true, amount: 0.5 }} // Anime quand au moins 50% de l'élément est visible
              transition={{ duration: 0.4, delay: index * 0.1 }} // Délai progressif pour chaque élément
              className="collapse-arrow join-item border-base-300 bg-base-200 collapse border-b last:border-b-0"
            >
              <input
                type="radio"
                name={`faq-accordion-${FaqItems.faqItems.length}`} // Utiliser l'id pour éviter les conflits si plusieurs FAQ sur la page
                id={`faq-${FaqItems.faqItems.length}-${index}`}
                defaultChecked={index === 0}
              />
              <label
                htmlFor={`faq-${FaqItems.faqItems.length}-${index}`}
                className="collapse-title text-primary-content cursor-pointer font-semibold"
              >
                {item.question}
              </label>
              <div className="collapse-content text-base-content text-sm opacity-80">
                <p>{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
