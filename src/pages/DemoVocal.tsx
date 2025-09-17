import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Play, Pause, Download, ArrowLeft, Sparkles, VolumeX } from 'lucide-react';
import { Link } from 'react-router'; 
import { toast, Toaster } from 'sonner';

const API_ENDPOINT = 'https://unpearled-youlanda-militarily.ngrok-free.app/v1/audio';
const DEFAULT_VOICE = 'ff_siwis';

const DemoPage = () => {
  const [text, setText] = useState(
    'Bonjour ! Bienvenue dans notre démonstration de synthèse vocale. Cette technologie transforme votre texte en parole naturelle.'
  );
  const [voice, setVoice] = useState(DEFAULT_VOICE);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const voices = [
    { id: 'ff_siwis', name: 'Siwis (Défaut)', description: 'Voix féminine par défaut' },
    { id: 'sarah', name: 'Sarah', description: 'Voix féminine douce' },
    { id: 'thomas', name: 'Thomas', description: 'Voix masculine claire' },
    { id: 'marie', name: 'Marie', description: 'Voix féminine énergique' },
    { id: 'pierre', name: 'Pierre', description: 'Voix masculine profonde' },
  ];

  // Callback pour gérer la fin de l'audio
  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Effet pour gérer l'audio quand l'URL change ou le volume/vitesse sont modifiés
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;
      audio.playbackRate = speed;

      audio.addEventListener('ended', handleAudioEnded);

      // Si l'audioUrl est supprimée alors qu'un audio était attaché
      if (!audioUrl && audio.src) {
        audio.pause();
        audio.src = ''; // Clear src
        setIsPlaying(false);
      }
    }

    // Fonction de nettoyage
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [audioUrl, volume, speed, handleAudioEnded]);

  // Effet pour révoquer l'URL d'objet lorsque le composant se démonte
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsPlaying(false);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: voice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
        throw new Error(
          `Erreur lors de la génération: ${response.status} - ${errorData.message || 'Réponse non JSON'}`
        );
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Notification de succès après la génération de l'audio
      toast.success("Génération de l'audio réussie ! 🎉", {
        position: 'top-center',
      });
    } catch (error) {
      console.error("Erreur lors de la génération de l'audio:", error);
      toast.error(
        `Erreur de génération: ${error instanceof Error ? error.message : 'Une erreur inattendue est survenue'}. Veuillez réessayer.`,
        {
          position: 'top-center',
        }
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `tsvoice_audio_${voice}_${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 0);
    } else {
      toast.info("Aucun audio à télécharger. Veuillez générer l'audio d'abord.");
    }
  };

  return (
    <div className="bg-primary-200 min-h-screen">
      <Toaster />
      {/* Header (pas de changement ici) */}
      <div className="navbar bg-primary-300 shadow-md">
        <div className="container mx-auto">
          <div className="navbar-start">
            <Link to="/auth" className="btn btn-ghost text-primary-content hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Link>
          </div>
          <div className="navbar-end">
            <Link to="/#tarifs">
              <button className="btn btn-outline btn-primary">Voir les tarifs</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl shadow-glow bg-base-200"
        >
          {/* Hero Section (pas de changement ici) */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="text-primary h-6 w-6" />
              <h1 className="text-primary-content text-3xl font-bold">Démonstration Gratuite</h1>
              <Sparkles className="text-primary h-6 w-6" />
            </div>
            <p className="text-primary-content/80 text-lg">
              Testez notre technologie de synthèse vocale sans inscription
            </p>
            <div className="bg-primary/10 mt-4 inline-block rounded-lg p-3">
              <p className="text-primary text-sm font-medium">
                ⚡ Limité à 200 caractères • Voix de primary uniquement
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Text Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="card bg-base-300 shadow-xl">
                <div className="card-body p-6">
                  <div className="card-title text-primary-content flex items-center space-x-2">
                    <Volume2 className="h-5 w-5" />
                    <span>Votre Texte</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-primary-content text-sm font-medium">
                        Texte à synthétiser
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, 200))}
                        placeholder="Saisissez votre texte ici..."
                        className="textarea textarea-bordered textarea-lg min-h-[120px] w-full resize-none"
                        maxLength={200}
                      />
                      <div className="text-primary-content/60 flex justify-between text-xs">
                        <span>Maximum 200 caractères en mode démo</span>
                        <span>{text.length}/200</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-primary-content text-sm font-medium">Voix</label>
                      <select
                        value={voice}
                        onChange={(e) => setVoice(e.target.value)}
                        className="select select-bordered w-full"
                      >
                        {voices.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-primary-content text-sm font-medium">
                        Vitesse: {speed.toFixed(1)}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="range range-primary w-full"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    className={`btn btn-primary btn-lg btn-block mt-4 ${isGenerating ? 'btn-disabled' : ''}`}
                    disabled={isGenerating || text.length === 0}
                  >
                    {' '}
                    Générer la voix
                    {isGenerating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <Volume2 className="mr-2 h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Audio Player Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card bg-base-300 shadow-xl">
                <div className="card-body p-6">
                  <div className="card-title text-primary-content">Résultat Audio</div>
                  <div className="space-y-6">
                    {/* Audio Visualizer Placeholder */}
                    <div className="from-primary/20 to-primary/5 rounded-lg bg-gradient-to-r p-6 text-center">
                      <div className="mb-4 flex items-center justify-center space-x-1">
                        {isGenerating ? (
                          <span className="loading loading-spinner loading-lg text-primary"></span>
                        ) : (
                          <AnimatePresence>
                            {audioUrl ? (
                              [...Array(20)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scaleY: 0.5, opacity: 0 }}
                                  animate={{ scaleY: 1, opacity: 1 }}
                                  exit={{ scaleY: 0.5, opacity: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.05 }}
                                  className={`bg-primary w-1 rounded-full ${
                                    isPlaying ? 'animate-pulse' : ''
                                  }`}
                                  style={{
                                    height: `${Math.random() * 40 + 10}px`,
                                  }}
                                />
                              ))
                            ) : (
                              <Volume2 className="text-primary h-10 w-10 opacity-50" />
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                      <p className="text-primary-content/60 text-sm">
                        {isGenerating
                          ? 'Génération en cours...'
                          : audioUrl
                            ? 'Audio prêt ! Appuyez sur lecture.'
                            : 'Votre audio apparaîtra ici'}
                      </p>
                    </div>

                    {/* Audio Controls */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="auto" />}

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={togglePlayback}
                          className="btn btn-primary btn-circle btn-lg"
                          disabled={isGenerating || !audioUrl}
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button
                          className="btn btn-outline btn-primary btn-lg"
                          onClick={handleDownload}
                          disabled={isGenerating || !audioUrl}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </button>
                      </div>

                      {/* Contrôle de volume */}
                      <div className="flex w-full max-w-xs items-center space-x-2">
                        {volume === 0 ? (
                          <VolumeX className="text-primary-content/70 h-5 w-5" />
                        ) : (
                          <Volume2 className="text-primary-content/70 h-5 w-5" />
                        )}
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="range range-primary flex-grow"
                          disabled={!audioUrl}
                        />
                        <span className="text-primary-content/70 text-sm">
                          {Math.round(volume * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Upgrade CTA */}
                    <div className="from-primary/10 to-primary/5 border-primary/20 mt-8 rounded-lg border bg-gradient-to-r p-4">
                      <h3 className="text-primary-content mb-2 text-center font-semibold">
                        Vous aimez ce que vous entendez ?
                      </h3>
                      <p className="text-primary-content/80 mb-4 text-center text-sm">
                        Débloquez des voix premium, des textes illimités et bien plus encore
                      </p>
                      <div className="flex space-x-2">
                        <Link to="/auth" className="flex-1">
                          <button className="btn btn-primary btn-block">Créer un compte</button>
                        </Link>
                        <Link to="/pricing" className="flex-1">
                          <button className="btn btn-outline btn-block">Voir les tarifs</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <div className="card bg-base-300 shadow-xl">
              <div className="card-body p-6 text-center">
                <div className="card-title text-primary-content flex w-full justify-center">
                  Fonctionnalités Disponibles avec un Compte
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Volume2 className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-primary-content mb-2 font-semibold">Voix Premium</h3>
                    <p className="text-primary-content/60 text-sm">
                      Accès à plus de 50 voix naturelles dans différentes langues
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Sparkles className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-primary-content mb-2 font-semibold">Textes Illimités</h3>
                    <p className="text-primary-content/60 text-sm">
                      Synthétisez des textes de toute longueur sans restriction
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Download className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-primary-content mb-2 font-semibold">Export HD</h3>
                    <p className="text-primary-content/60 text-sm">
                      Téléchargez vos audios en haute qualité (MP3, WAV)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage;
