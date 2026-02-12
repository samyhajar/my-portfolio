"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let textIndex = 0; // Start at 0
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationId: number;

    // Initialize texts
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
      text2Ref.current.style.filter = 'blur(0px)';
      text2Ref.current.style.opacity = '0'; // Initially hidden
      text1Ref.current.style.filter = 'blur(0px)';
      text1Ref.current.style.opacity = '1'; // Initially visible
    }


    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "0%"; // Keep next text hidden during cooldown
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "100%"; // Keep current text visible
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      animationId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (text1Ref.current && text2Ref.current && morph === 0) {
          // Start of morph: update text content for the morph
          // Current text becomes fading out, Next text becomes fading in
        }
        doMorph();
      } else {
        doCooldown();
        // Check if we just finished a morph cycle to update indices
        if (morph === 0 && cooldown > 0 && cooldown < 0.1) { // Hacky check for "just started cooldown"
          textIndex++;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
      }
    }

    // Simplified logic for reliability
    const animateSimple = () => {
      let lastTime = Date.now();
      let currentCooldown = cooldownTime;
      let currentMorph = 0;
      let isMorphing = false;

      const loop = () => {
        const now = Date.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (isMorphing) {
          currentMorph += dt;
          let fraction = currentMorph / morphTime;

          if (fraction > 1) {
            isMorphing = false;
            currentCooldown = cooldownTime;
            textIndex++;
            // Swap DOM state effectively
            if (text1Ref.current && text2Ref.current) {
              text1Ref.current.textContent = texts[textIndex % texts.length];
              text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];

              // Reset styles
              text1Ref.current.style.filter = "";
              text1Ref.current.style.opacity = "1";
              text2Ref.current.style.filter = "";
              text2Ref.current.style.opacity = "0";
            }
          } else {
            setMorph(fraction);
          }
        } else {
          currentCooldown -= dt;
          if (currentCooldown <= 0) {
            isMorphing = true;
            currentMorph = 0;
          }
        }

        animationId = requestAnimationFrame(loop);
      };
      loop();
    }


    animateSimple();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{ filter: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-5xl md:text-7xl font-bold will-change-[filter,opacity]",
            "text-foreground",
            textClassName,
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-5xl md:text-7xl font-bold opacity-0",
            "text-foreground",
            textClassName,
          )}
        />
      </div>
    </div>
  );
}
