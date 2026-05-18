import confetti from "canvas-confetti";
import type { ISourceOptions } from "@tsparticles/engine";
import type { MoodCardTheme } from "../types/mood";

type ParticleTheme = Exclude<MoodCardTheme, "celebration">;

export const fireCelebrationConfetti = () => {
  confetti({
    particleCount: 160,
    spread: 100,
    startVelocity: 50,
    gravity: 0.9,
    ticks: 220,
    scalar: 0.95,
    origin: { x: 0.5, y: 0.55 },
    colors: ["#f7aafb", "#ff5e32", "#ffd166", "#ffffff", "#ba181b", "#7dd3fc"],
  });
};

export const getParticleOptions = (theme: ParticleTheme): ISourceOptions => {
  const config = {
    cozy: {
      values: ["✨", "☁️", "🌙", "⭐", "💫"],
      colors: ["#ffffff", "#7dd3fc", "#b8d8ff"],
      speed: 1.3,
      size: 18,
    },

    dateNight: {
      values: ["❤️", "💕", "💖", "✨", "💘"],
      colors: ["#ff4fa3", "#ff8cc6", "#ffffff"],
      speed: 1.7,
      size: 22,
    },

    culinary: {
      values: ["🍷", "✨", "🥂", "🍇", "⭐"],
      colors: ["#ff5e32", "#ffb36b", "#ffd166", "#ffffff"],
      speed: 1.5,
      size: 20,
    },
  }[theme];

  return {
    fullScreen: {
      enable: false,
    },

    detectRetina: true,
    fpsLimit: 60,

    particles: {
      number: {
        value: 20,
        density: {
          enable: false,
        },
      },

      color: {
        value: config.colors,
      },

      shape: {
        type: "char",
        options: {
          char: {
            value: config.values,
            font: "Verdana",
            style: "",
            weight: "400",
          },
        },
      },

      opacity: {
        value: {
          min: 0.4,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 0.8,
          startValue: "max",
          destroy: "min",
        },
      },

      size: {
        value: {
          min: config.size * 0.5,
          max: config.size,
        },
      },

      move: {
        enable: true,
        speed: config.speed,
        direction: "top",
        random: true,
        straight: false,
        outModes: {
          default: "destroy",
        },
      },

      life: {
        duration: {
          value: 1.8,
          sync: false,
        },
        count: 1,
      },
    },

    emitters: [
      {
        position: { x: 30, y: 55 },
        rate: { delay: 0.08, quantity: 2 },
        life: { count: 1, duration: 0.8 },
        size: { width: 30, height: 20 },
      },
      {
        position: { x: 50, y: 55 },
        rate: { delay: 0.08, quantity: 2 },
        life: { count: 1, duration: 0.8 },
        size: { width: 30, height: 20 },
      },
      {
        position: { x: 70, y: 55 },
        rate: { delay: 0.08, quantity: 2 },
        life: { count: 1, duration: 0.8 },
        size: { width: 30, height: 20 },
      },
    ],
  };
};
