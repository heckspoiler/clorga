import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, SplitText);

const words = ['Creativity', 'Innovation', 'Imagination', 'Inspiration'];

export default function TitleContainer({ styles }: { styles: any }) {
  const titleRef = useRef(null);
  const [currentWord, setCurrentWord] = useState(0);

  useGSAP(
    () => {
      if (!titleRef.current) return;
      const textElements = gsap.utils.toArray(
        (titleRef.current as HTMLElement).children
      );
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 3 });

      textElements.forEach((element, index) => {
        tl.to(element as gsap.TweenTarget, {
          yPercent: -100,
          duration: 0.5,
          onComplete: () => {
            setCurrentWord((prev) => (prev + 1) % words.length);
          },
        })
          .set(element as gsap.TweenTarget, { yPercent: 100 })
          .to(
            element as gsap.TweenTarget,
            {
              yPercent: 0,
              duration: 0.5,
            },
            '+=0.5'
          );
      });
    },
    { scope: titleRef }
  );

  return (
    <div className={styles.TitleContainer}>
      <h1 ref={titleRef}>
        <span className={styles.Creativity}>{words[currentWord]}</span>
      </h1>
      <h1>without the clutter</h1>
    </div>
  );
}
