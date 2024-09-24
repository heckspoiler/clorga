// utils/animationHelpers.js
import { gsap } from 'gsap';

export const wiggleElement = (element: any) => {
  gsap.to(element, {
    keyframes: [
      {
        x: 3,
        y: -2,
        rotation: -1,
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 200, 0.5)',
        duration: 0.1,
      },
      {
        x: -3,
        y: 2,
        rotation: 1,
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 200, 0.5)',
        duration: 0.1,
      },
      {
        x: 3,
        y: -1,
        rotation: -0.5,
        scale: 1.01,
        backgroundColor: 'rgba(255, 255, 200, 0.3)',
        duration: 0.1,
      },
      {
        x: -3,
        y: 1,
        rotation: 0.5,
        scale: 1.01,
        backgroundColor: 'rgba(255, 255, 200, 0.3)',
        duration: 0.1,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.1,
      },
    ],
    ease: 'power2.inOut',
  });
};
