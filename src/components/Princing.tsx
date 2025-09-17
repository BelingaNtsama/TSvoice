import { motion } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Gratuit',
    price: '0€',
    tag: null,
    features: [
      { text: '5 générations / jour', active: true },
      { text: 'Voix prédéfinies (20+ langues)', active: true },
      { text: "Texte jusqu'à 500 caractères", active: true },
      { text: 'Qualité standard', active: true },
      { text: 'Export MP3', active: true },
      { text: 'Clonage vocal personnalisé', active: false },
      { text: "Accès à l'API", active: false },
      { text: 'Support prioritaire', active: false },
    ],
    buttonText: 'Commencer gratuitement',
    buttonClass: 'btn-outline',
    description: 'Parfait pour découvrir notre technologie',
  },
  {
    name: 'Pro',
    price: '9,99€',
    tag: 'Populaire',
    features: [
      { text: 'Générations illimitées', active: true },
      { text: 'Voix prédéfinies (20+ langues)', active: true },
      { text: 'Clonage vocal personnalisé', active: true },
      { text: 'Texte illimité', active: true },
      { text: 'Qualité HD', active: true },
      { text: 'Export MP3, WAV', active: true },
      { text: "Accès à l'API (1000 req/mois)", active: true },
      { text: 'Support prioritaire', active: true },
    ],
    buttonText: 'Choisir ce plan',
    buttonClass: 'btn-secondary',
    description: 'Pour les créateurs de contenu professionnels',
  },
  {
    name: 'Entreprise',
    price: '49,99€',
    tag: null,
    features: [
      { text: 'Tout du plan Pro', active: true },
      { text: "Accès à l'API illimité", active: true },
      { text: 'Voix personnalisées dédiées', active: true },
      { text: 'Intégration sur mesure', active: true },
      { text: 'Support 24/7', active: true },
      { text: 'SLA garanti', active: true },
      { text: 'Formation équipe', active: true },
      { text: 'Facturation personnalisée', active: true },
      { text: 'Conformité RGPD', active: true },
    ],
    buttonText: 'Nous contacter',
    buttonClass: 'btn-outline',
    description: 'Pour les grandes entreprises et projets',
  },
];

export default function PricingSection() {
  return (
    <section className=" px-6 py-24" id="tarifs">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-primary-content mb-6 text-4xl font-bold md:text-5xl">
            Choisissez votre <span className="text-gradient">formule</span>
          </h2>
          <p className="text-base-content mx-auto max-w-3xl text-xl opacity-80">
            Des tarifs adaptés à tous vos besoins, du test gratuit à l'usage professionnel
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`card bg-base-200 border ${plan.tag ? 'border-primary/50 shadow-glow' : 'border-base-content/10 shadow-lg'} relative h-full`}
              >
                {plan.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                    <div className="badge badge-secondary badge-lg text-primary-content font-medium">
                      {plan.tag}
                    </div>
                  </div>
                )}
                <div className="card-body space-y-6 p-8">
                  <div className="space-y-2 text-center">
                    <h3 className="text-base-content text-2xl font-bold">{plan.name}</h3>
                    <div className="text-gradient text-4xl font-bold">{plan.price}<sub className='text-sm text-white'>/mois</sub></div>
                    <p className="text-base-content opacity-70">{plan.description}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-3 ${!feature.active ? 'text-base-content opacity-50' : ''}`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${feature.active ? 'bg-primary' : 'bg-base-content opacity-30'}`}
                        ></div>
                        <span
                          className={`${feature.active ? 'text-base-content' : 'text-base-content line-through opacity-50'}`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className={`btn ${plan.buttonClass} btn-block`}>{plan.buttonText}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
