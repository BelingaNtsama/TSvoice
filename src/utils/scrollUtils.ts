// src/utils/scrollUtils.ts
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smootherInstance: globalThis.ScrollSmoother | null = null;

// Fonction pour initialiser ScrollSmoother
export const initScrollSmoother = () => {
  if (!smootherInstance) {
    smootherInstance = ScrollSmoother.create({
      smooth: 5, // Durée du scroll
      effects: true,
      normalizeScroll: true,
      // Autres options si nécessaire
    });
  }
  return smootherInstance;
};

// Fonction pour tuer l'instance de ScrollSmoother
export const killScrollSmoother = () => {
  if (smootherInstance) {
    smootherInstance.kill();
    smootherInstance = null;
  }
};

// Fonction exportée pour scroller vers une section
export function scrollToSection(id: string) {
  if (smootherInstance) {
    smootherInstance.scrollTo(`#${id}`, true, 'power4.inOut');
  } else {
    // Fallback si ScrollSmoother n'est pas initialisé (ex: pas sur la même page)
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
