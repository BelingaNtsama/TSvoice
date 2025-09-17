import { Eye, Brain, Mic, Play, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
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
        className="h-[500px] flex flex-col justify-center  gap-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gradient">
          TSvoice
        </h1>
        <div>
          <p className="text-xl text-primary-content">
            Créez des voix IA réalistes en quelques secondes.
          </p>
          <p className="text-xl text-primary-content">
            <span className="text-gradient">Text-to-Speech</span> avancé et{" "}
            <span className="text-gradient">clonage vocal</span> de qualité
            professionnelle.
          </p>
        </div>
        {/* Boutons CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={4}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="btn btn-wide btn-primary h-14 text-xl relative hover:shadow-md shadow-gray-300/20">
            Essayer Maintenant
            <Play className="animate-pulse" />
          </button>
          <Link to={'/demo'} className="btn h-14 text-xl relative btn-wide hover:border-gray-50">
            Voir Demo
            <Eye className="absolute top-5 right-8" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Cartes de fonctionnalités */}
      <div className=" bg-base-300 p-12" id='fonctionnalites'>
        <h2 className="text-4xl md:text-5xl text-primary-content font-bold mb-6 text-center">
          Fonctionnalités <span className="text-gradient">Avancées</span>
        </h2>
        <p className="text-lg text-center text-base-content">
          Découvrez nos outils de pointe pour la génération et le clonage vocal
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {[
            {
              icon: <PlayCircle className="w-8 h-8 text-secondary" />,
              title: "TTS Instantané",
              desc: "Convertissez votre texte en voix naturelle en temps réel avec 90+ voix disponibles",
            },
            {
              icon: <Mic className="w-8 h-8 text-primary" />,
              title: "Clonage Vocal",
              desc: "Recréez n'importe quelle voix avec seulement quelques secondes d'audio",
            },
            {
              icon: <Brain className="w-8 h-8 text-secondary" />,
              title: "IA Avancée",
              desc: "Modèles de deep learning de dernière génération pour une qualité exceptionnelle",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-4 border border-blue-50/5 bg-base-200 p-8 rounded-xl
             hover:shadow-primary/30 shadow-2xl transition-all duration-300"
            >
              <div
                className="w-16 h-16 mx-auto gradient-card rounded-2xl 
            flex items-center justify-center shadow-glow"
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary-content">
                {item.title}
              </h3>
              <p className="text-base-content">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
