import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../utils/context';
import type { PlanType } from '../utils/types';
import FloatingInput from '../components/shared/FloatingInput';
import AuthFields from '../components/shared/AuthField';
import SuccessStep from '../components/shared/SuccessStep';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialTabFromParams = searchParams.get('tab') || 'login';
  const [currentTab, setCurrentTab] = useState(initialTabFromParams);
  const initialPlan = (searchParams.get('plan') as PlanType) || 'gratuit';

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    name: '',
    plan: initialPlan,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      setSuccessMessage('Connexion réussie ! Redirection vers votre compte...');
      setTimeout(() => navigate('/account'), 2000);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(
      registerForm.email,
      registerForm.password,
      registerForm.name,
      registerForm.plan
    );
    if (success) {
      setSuccessMessage('Inscription réussie ! Bienvenue sur TSvoice.');
      setTimeout(() => navigate('/account'), 2000);
    }
  };

  const demoCredentials = [
    { email: 'demo@gratuit.com', plan: 'Gratuit' },
    { email: 'demo@simple.com', plan: 'Simple Usage' },
    { email: 'demo@entreprise.com', plan: 'Entreprise' },
  ];

  return (
    <div className=" flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body p-6">
            <div className="mb-6 text-center">
              <h2 className="card-title text-gradient mb-2 justify-center text-2xl font-bold">
                TSvoice
              </h2>
              <p className="text-primary-content">Accédez à votre compte ou créez-en un nouveau</p>
            </div>

            <div className="mb-4 space-x-4">
              <button
                className={`btn ${currentTab === 'login' ? 'btn-secondary' : ''}`}
                onClick={() => setCurrentTab('login')}
              >
                Connexion
              </button>
              <button
                className={`btn ${currentTab === 'register' ? 'btn-secondary' : ''}`}
                onClick={() => setCurrentTab('register')}
              >
                Inscription
              </button>
            </div>

            {successMessage ? (
              <SuccessStep title="Succès !" message={successMessage} />
            ) : (
              <AnimatePresence mode="wait">
                {currentTab === 'login' && (
                  <motion.div
                    key="login-tab"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <form onSubmit={handleLogin} className="space-y-4">
                      <AuthFields
                        email={loginForm.email}
                        password={loginForm.password}
                        onEmailChange={(value) => setLoginForm({ ...loginForm, email: value })}
                        onPasswordChange={(value) =>
                          setLoginForm({ ...loginForm, password: value })
                        }
                        prefix="login"
                      />
                      <button className="btn btn-primary">Se connecter</button>
                    </form>
                  </motion.div>
                )}

                {currentTab === 'register' && (
                  <motion.div
                    key="register-tab"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <form onSubmit={handleRegister} className="space-y-4">
                      <FloatingInput
                        label="Nom complet"
                        id="register-name"
                        type="text"
                        placeholder="Votre nom"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required
                      />
                      <AuthFields
                        email={registerForm.email}
                        password={registerForm.password}
                        onEmailChange={(value) =>
                          setRegisterForm({ ...registerForm, email: value })
                        }
                        onPasswordChange={(value) =>
                          setRegisterForm({ ...registerForm, password: value })
                        }
                        prefix="register"
                      />
                      <div className="form-control w-full">
                        <label htmlFor="register-plan" className="label">
                          <span className="label-text">Plan d'abonnement</span>
                        </label>
                        <select
                          id="register-plan"
                          className="select select-bordered w-full"
                          value={registerForm.plan}
                          onChange={(e) =>
                            setRegisterForm({ ...registerForm, plan: e.target.value as PlanType })
                          }
                        >
                          <option value="gratuit">Gratuit - 100 crédits/mois</option>
                          <option value="simple">Simple Usage - 19€/mois</option>
                          <option value="entreprise">Entreprise - 99€/mois</option>
                        </select>
                      </div>
                      <button className="btn btn-primary">Créer mon compte</button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <div className="divider">ou</div>
            <button
              className="btn flex w-full items-center justify-center gap-2 border-[#e5e5e5] bg-white text-black"
              onClick={() => (window.location.href = '/api/auth/google')}
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  />
                </g>
              </svg>
              Continuer avec Google
            </button>
          </div>
        </div>
        <div className="bg-base-200 mt-6 rounded-lg p-4">
          <p className="mb-2 text-sm font-medium">Comptes de démonstration :</p>
          <div className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="text-base-content/80 text-xs">
                <strong>{cred.plan}:</strong> {cred.email} / demo123
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
