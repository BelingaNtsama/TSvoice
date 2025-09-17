import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Content Creator",
    content:
      "VoixClone a révolutionné ma création de contenu. La qualité des voix générées est bluffante !",
    rating: 5,
  },
  {
    name: "Thomas Laurent",
    role: "Développeur",
    content:
      "L'API est simple à intégrer et les résultats sont au-dessus de mes attentes. Parfait pour mes projets !",
    rating: 5,
  },
  {
    name: "Sophie Martin",
    role: "Podcaster",
    content:
      "Le clonage vocal m'a permis de créer des voix cohérentes pour tous mes épisodes. Incroyable !",
    rating: 5,
  },
  {
    name: "Jean",
    role: "Artiste",
    content:
      "Le clonage vocal m'a permis de créer des voix cohérentes pour tous mes épisodes. Incroyable !",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000); // Défilement toutes les 8 secondes

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const variants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id='Temoignages' className="py-24 px-6 overflow-hidden bg-base-300">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl text-primary-content font-bold">
            Ce que disent nos{" "}
            <span className="text-gradient">utilisateurs</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto h-64 flex justify-center items-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full"
          >
            {/* Remplacement des composants Card/CardContent par des div avec des classes brutes */}
            <div className="bg-base-100 p-6 rounded-box space-y-4 gradient-card border border-border/50 shadow-card h-full">
              <div className="flex gap-1">
                {Array.from({ length: testimonials[currentIndex].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-orange-500"
                    />
                  ),
                )}
              </div>
              <p className="text-primary-content italic opacity-80">
                "{testimonials[currentIndex].content}"
              </p>
              <div>
                <p className="font-semibold text-primary-content">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-sm text-base-content">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Points de navigation */}
      <div className="flex justify-center w-full py-2 gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-primary" : "bg-gray-300/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
