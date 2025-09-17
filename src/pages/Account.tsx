import { motion } from 'framer-motion';
import { useAuthStore } from '../utils/context'; // Assurez-vous d'utiliser le store Zustand
import { useNavigate } from 'react-router';
import { User, CreditCard, Settings, LogOut, Crown, Zap, Calendar, Check } from 'lucide-react';
import type { PlanType } from '../utils/types'; // Assurez-vous que le chemin est correct

const Account = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPlanColor = (plan: PlanType) => {
    switch (plan) {
      case 'gratuit':
        return 'badge-secondary';
      case 'simple':
        return 'badge-accent';
      case 'entreprise':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'; // Utilisation directe de Tailwind
      default:
        return 'badge-secondary';
    }
  };

  const getPlanIcon = (plan: PlanType) => {
    switch (plan) {
      case 'gratuit':
        return <User className="h-4 w-4" />;
      case 'simple':
        return <Zap className="h-4 w-4" />;
      case 'entreprise':
        return <Crown className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const creditPercentage = (user.credits / user.maxCredits) * 100;

  return (
    <div className="from-primary/5 via-background to-secondary/5 min-h-screen bg-gradient-to-br p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-primary-content text-3xl font-bold">Mon Compte</h1>
            <p className="text-primary-content">Gérez vos informations et votre abonnement</p>
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/app')}>
            Retour à l'app
          </button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profil utilisateur */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-base-200 shadow-glow rounded-lg border border-gray-100/25">
              <div className="card-body">
                <div className="card-title text-primary-content flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-neutral text-neutral-content relative h-16 w-16 rounded-full">
                      <span className="text-primary-content absolute -translate-x-1/2 translate-y-1/2 transform text-xl font-semibold">
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-primary-content text-lg font-semibold">{user.name}</h3>
                      <p className="text-primary-content">{user.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className={`badge ${getPlanColor(user.plan)}`}>
                          {getPlanIcon(user.plan)}
                          <span className="ml-1">
                            Plan {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-base-200 border-t" />

                  <div className="flex items-center justify-between">
                    <span className="text-primary-content/70 flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      Membre depuis
                    </span>
                    <span className="text-sm font-medium">{user.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Utilisation des crédits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-base-200 rounded-lg border border-gray-100/25 shadow-xl">
              <div className="card-body">
                <div className="card-title text-primary-content flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Crédits
                </div>
                <p className="text-base-content/70">Utilisation ce mois-ci</p>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-primary-content text-3xl font-bold">
                      {user.credits.toLocaleString()}
                    </div>
                    <div className="text-base-content/70 text-sm">
                      sur {user.maxCredits === 999999 ? '∞' : user.maxCredits.toLocaleString()}{' '}
                      crédits
                    </div>
                  </div>

                  {user.maxCredits !== 999999 && (
                    <div className="space-y-2">
                      <progress
                        className="progress progress-primary w-full"
                        value={creditPercentage}
                        max="100"
                      ></progress>
                      <div className="text-base-content/70 flex justify-between text-xs">
                        <span>{creditPercentage.toFixed(1)}% utilisés</span>
                        <span>{(user.maxCredits - user.credits).toLocaleString()} restants</span>
                      </div>
                    </div>
                  )}

                  <button className="btn btn-outline w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Acheter des crédits
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fonctionnalités du plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-base-200 rounded-lg border border-gray-100/25 p-8 shadow-xl">
            <div className="text-primary-content text-2xl">
              <div className="space-y-2">
                <h2 className='flex items-center gap-2'>
                  <Crown className="h-5 w-5" />
                  Fonctionnalités de votre plan
                </h2>
              </div>

              <div>
                <ul className="grid gap-3 md:grid-cols-2">
                  {user.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="text-success h-4 w-4" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <button className="btn btn-outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Changer de plan
          </button>
          <button className="btn btn-error" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;
