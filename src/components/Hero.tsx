import { Eye, Brain, Mic, Play, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { easeOut } from 'framer-motion'; // ou '@popmotion/easing'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: easeOut, 
    },
  }),
};


const Hero = () => {
  return (
    <div className="overflow-hidden">
      {/* Titre et description */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
        className="flex h-[500px] flex-col justify-center gap-8"
      >
        <h1 className="text-gradient text-6xl font-bold tracking-tight md:text-8xl">TSvoice</h1>
        <div>
          <p className="text-primary-content text-xl">
            Créez des voix IA réalistes en quelques secondes.
          </p>
          <p className="text-primary-content text-xl">
            <span className="text-gradient">Text-to-Speech</span> avancé et{' '}
            <span className="text-gradient">clonage vocal</span> de qualité professionnelle.
          </p>
        </div>
      </motion.div>

      {/* Boutons CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={2}
        className="flex flex-wrap justify-center gap-4"
      >
        <button className="btn btn-wide btn-primary relative h-14 text-xl shadow-gray-300/20 hover:shadow-md">
          Essayer Maintenant
          <Play className="animate-pulse" />
        </button>
        <Link to={'/demo'} className="btn btn-wide relative h-14 text-xl hover:border-gray-50">
          Voir Demo
          <Eye className="absolute top-5 right-8" />
        </Link>
      </motion.div>

      {/* Cartes de fonctionnalités */}
      <div className="bg-base-300 p-12" id="fonctionnalites">
        <h2 className="text-primary-content mb-6 text-center text-4xl font-bold md:text-5xl">
          Fonctionnalités <span className="text-gradient">Avancées</span>
        </h2>
        <p className="text-base-content text-center text-lg">
          Découvrez nos outils de pointe pour la génération et le clonage vocal
        </p>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {[
            {
              icon: <PlayCircle className="text-secondary h-8 w-8" />,
              title: 'TTS Instantané',
              desc: 'Convertissez votre texte en voix naturelle en temps réel avec 90+ voix disponibles',
            },
            {
              icon: <Mic className="text-primary h-8 w-8" />,
              title: 'Clonage Vocal',
              desc: "Recréez n'importe quelle voix avec seulement quelques secondes d'audio",
            },
            {
              icon: <Brain className="text-secondary h-8 w-8" />,
              title: 'IA Avancée',
              desc: 'Modèles de deep learning de dernière génération pour une qualité exceptionnelle',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i + 3} // Commence à 3 pour éviter conflit avec les blocs précédents
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-base-200 hover:shadow-primary/30 space-y-4 rounded-xl border border-blue-50/5 p-8 shadow-2xl transition-all duration-300"
            >
              <div className="gradient-card shadow-glow mx-auto flex h-16 w-16 items-center justify-center rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-primary-content text-xl font-semibold">{item.title}</h3>
              <p className="text-base-content">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
