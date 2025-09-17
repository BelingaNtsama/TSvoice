'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  Play,
  Pause,
  Download,
  ArrowLeft,
  Sparkles,
  AudioLines,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router'; // Assurez-vous d'utiliser react-router-dom pour Link
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner'; // Importez la librairie toast

// Assurez-vous que ces chemins sont corrects pour vos utilitaires
import { VOICES, SAMPLE_TEXTS } from '../utils/voice';
import { stripMarkdown } from '../utils/markdown';
import { faqItems2 } from '../utils/const';
import FAQSection from '../components/FAQ';

// Define the Voice type if not already imported
interface Voice {
  id: string;
  name: string;
  // Add other properties if needed
}

const DemoPage = () => {
  const [text, setText] = useState('');
  const [languageInput, setLanguageInput] = useState('🇫🇷 French'); // Pour l'input datalist
  const [selectedLanguage, setSelectedLanguage] = useState('🇫🇷 French');
  const [selectedVoice, setSelectedVoice] = useState(VOICES['🇫🇷 French'][0]?.id || '');
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tab, setTab] = useState('editor');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mettre à jour la langue sélectionnée basée sur l'input du datalist
  useEffect(() => {
    const matchedLanguage = Object.keys(VOICES).find((lang) => lang === languageInput);
    if (matchedLanguage) {
      setSelectedLanguage(matchedLanguage);
    }
  }, [languageInput]);

  useEffect(() => {
    // Initialiser la voix sélectionnée lorsque la langue change
    const voicesForLanguage = VOICES[selectedLanguage as keyof typeof VOICES];
    if (voicesForLanguage && voicesForLanguage.length > 0) {
      setSelectedVoice(voicesForLanguage[0].id);
    } else {
      setSelectedVoice('');
    }
    setText('');
  }, [selectedLanguage]);

  // Appliquer la vitesse et le volume à l'élément audio localement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [volume, speed, audioUrl]); // Re-appliquer si l'audio change

  const loadSampleText = () => {
    const sampleText = SAMPLE_TEXTS[selectedLanguage as keyof typeof SAMPLE_TEXTS];
    if (sampleText) {
      setText(sampleText);
    }
  };

  const handleGenerate = async () => {
    if (!text.trim() || !selectedVoice || isGenerating) {
      toast.error('Veuillez entrer du texte et sélectionner une voix.');
      return;
    }
    setIsGenerating(true);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    try {
      const cleanText = stripMarkdown(text);
      const response = await fetch(
        'https://unpearled-youlanda-militarily.ngrok-free.app/v1/audio',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            text: cleanText,
            voice: selectedVoice,
            // speed et volume ne sont plus envoyés au backend
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${await response.text()}`);
      }

      const audioBlob = await response.blob();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      toast.success('Audio généré avec succès ! Prêt à écouter.');
    } catch (error) {
      console.error('Error generating audio:', error);
      toast.error(
        "Impossible de générer l'audio. Veuillez vérifier le texte ou la connexion à l'API."
      );
      setAudioUrl(null); // S'assurer que le lecteur disparaît en cas d'erreur
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // Appliquer vitesse et volume une fois que l'audio est chargé
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleDownload = () => {
    if (!audioUrl) {
      toast.error('Aucun audio à télécharger.');
      return;
    }
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `voixclone-${Date.now()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.info("Téléchargement de l'audio en cours...");
  };

  interface FormatTime {
    (time: number): string;
  }

  const formatTime: FormatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const availableVoices = useMemo(() => VOICES[selectedLanguage as keyof typeof VOICES] || [], [selectedLanguage]);

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-md">
        <div className="container mx-auto">
          <div className="navbar-start">
            <Link to="/auth" className="btn btn-ghost text-base-content hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la connexion
            </Link>
          </div>
          <div className="navbar-center">
            <div className="flex items-center space-x-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Volume2 className="text-primary-content h-5 w-5" />
              </div>
              <span className="text-base-content text-xl font-bold">VoiceAI Demo</span>
            </div>
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
          className="mx-auto max-w-4xl"
        >
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="text-primary h-6 w-6" />
              <h1 className="text-base-content text-3xl font-bold">Démonstration Gratuite</h1>
              <Sparkles className="text-primary h-6 w-6" />
            </div>
            <p className="text-base-content/80 text-lg">
              Testez notre technologie de synthèse vocale sans inscription
            </p>
            <div className="bg-primary/10 mt-4 inline-block rounded-lg p-3">
              <p className="text-primary text-sm font-medium">
                ⚡ Limité à 200 caractères • Voix de base uniquement
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body space-y-6 p-6">
                  <div className="card-title text-base-content">
                    <AudioLines className="text-primary h-5 w-5" />
                    Texte à Convertir
                  </div>

                  <div role="tablist" className="tabs tabs-boxed">
                    <a
                      role="tab"
                      className={`tab ${tab === 'editor' ? 'tab-active' : ''}`}
                      onClick={() => setTab('editor')}
                    >
                      Éditeur
                    </a>
                    <a
                      role="tab"
                      className={`tab ${tab === 'preview' ? 'tab-active' : ''}`}
                      onClick={() => setTab('preview')}
                    >
                      Prévisualisation
                    </a>
                  </div>

                  {tab === 'editor' && (
                    <div className="space-y-4">
                      <div className="mb-4 flex gap-2">
                        <button className="btn btn-outline btn-sm text-xs" onClick={loadSampleText}>
                          Exemple {selectedLanguage.split(' ')[1]}
                        </button>
                        <button
                          className="btn btn-ghost btn-sm text-xs"
                          onClick={() => setText('')}
                        >
                          Effacer
                        </button>
                      </div>
                      <textarea
                        className="textarea textarea-bordered text-base-content focus:border-primary h-48 w-full bg-transparent transition-colors focus:outline-none"
                        placeholder="Tapez votre texte en Markdown ici..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={200}
                      />
                      <div className="text-base-content/60 flex justify-between text-xs">
                        <span>Maximum 200 caractères en mode démo</span>
                        <span>{text.length}/200</span>
                      </div>
                    </div>
                  )}

                  {tab === 'preview' && (
                    <div className="prose rounded-box border-base-content/10 bg-base-100 h-48 w-full overflow-y-auto border p-4">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  )}

                  <button
                    className={`btn btn-primary btn-lg btn-block ${isGenerating ? 'btn-disabled' : ''}`}
                    onClick={handleGenerate}
                    disabled={!text.trim() || !selectedVoice || isGenerating || text.length > 200}
                  >
                    {isGenerating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" />
                        Générer la voix
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Voice Settings & Audio Player Section (1/3 de la largeur) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-6">
                  <div className="card-title text-base-content">Paramètres Vocaux</div>
                  <div className="space-y-4">
                    {/* Language Selection (Datalist) */}
                    <div className="form-control w-full">
                      <label htmlFor="language-input" className="label">
                        <span className="label-text text-base-content">Langue</span>
                      </label>
                      <input
                        id="language-input"
                        list="languages"
                        className="input input-bordered text-base-content w-full bg-transparent"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        placeholder="Sélectionner une langue"
                      />
                      <datalist id="languages">
                        {Object.keys(VOICES).map((lang) => (
                          <option key={lang} value={lang} />
                        ))}
                      </datalist>
                    </div>

                    {/* Voice Selection (Dropdown) */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-base-content">Voix</span>
                      </label>
                      <div className="dropdown dropdown-bottom w-full">
                        <div
                          tabIndex={0}
                          role="button"
                          className={`btn text-base-content w-full justify-between bg-transparent ${
                            !availableVoices.length ? 'btn-disabled' : ''
                          }`}
                        >
                            {availableVoices.find((v: Voice) => v.id === selectedVoice)?.name ||
                            'Sélectionner une voix'}
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        {availableVoices.length > 0 && (
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-1 max-h-60 w-full overflow-y-auto p-2 shadow-lg"
                          >
                            {availableVoices.map((voice) => (
                              <li key={voice.id}>
                                <a
                                  onClick={() => setSelectedVoice(voice.id)}
                                  className={voice.id === selectedVoice ? 'active' : ''}
                                >
                                  {voice.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Speed Slider */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-base-content">Vitesse : {speed}x</span>
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="range range-primary"
                      />
                    </div>

                    {/* Volume Slider */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-base-content">
                          Volume : {Math.round(volume * 100)}%
                        </span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="range range-primary"
                      />
                    </div>
                  </div>

                  {/* Audio Player */}
                  <AnimatePresence>
                    {audioUrl && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-box border-base-300 bg-base-200 mt-6 border p-4"
                      >
                        <div className="card-title text-base-content">Lecteur Audio</div>
                        <div className="mt-4 flex items-center gap-4">
                          <audio
                            ref={audioRef}
                            src={audioUrl}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleAudioEnded}
                            preload="metadata"
                          ></audio>
                          <button className="btn btn-primary btn-circle" onClick={togglePlayback}>
                            {isPlaying ? <Pause /> : <Play />}
                          </button>
                          <div className="flex-1">
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              value={currentTime}
                              onChange={(e) => {
                                if (audioRef.current) {
                                  audioRef.current.currentTime = parseFloat(e.target.value);
                                }
                              }}
                              className="range range-xs range-primary"
                            />
                            <div className="text-base-content/60 mt-1 flex justify-between text-xs">
                              <span>{formatTime(currentTime)}</span>
                              <span>{formatTime(duration)}</span>
                            </div>
                          </div>
                          <button className="btn btn-ghost btn-circle" onClick={handleDownload}>
                            <Download />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-6 text-center">
                <div className="card-title text-base-content flex w-full justify-center">
                  Fonctionnalités Disponibles avec un Compte
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Volume2 className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-base-content mb-2 font-semibold">Voix Premium</h3>
                    <p className="text-base-content/60 text-sm">
                      Accès à plus de 50 voix naturelles dans différentes langues
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Sparkles className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-base-content mb-2 font-semibold">Textes Illimités</h3>
                    <p className="text-base-content/60 text-sm">
                      Synthétisez des textes de toute longueur sans restriction
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
                      <Download className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-base-content mb-2 font-semibold">Export HD</h3>
                    <p className="text-base-content/60 text-sm">
                      Téléchargez vos audios en haute qualité (MP3, WAV)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action for Account */}
          <div className="from-primary/10 to-primary/5 border-primary/20 mt-8 rounded-lg border bg-gradient-to-r p-4">
            <h3 className="text-base-content mb-2 text-center font-semibold">
              Vous aimez ce que vous entendez ?
            </h3>
            <p className="text-base-content/80 mb-4 text-center text-sm">
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

          {/* FAQ Section */}
          <FAQSection faqItems={faqItems2}/>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage;
