"use client";

import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuPause, LuPlay } from "react-icons/lu";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CourtLines } from "@/components/ui/CourtLines";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  title: string;
  text: string;
  primary: string;
  secondary: string;
  waMessage: string;
  image: string;
  href: string;
};

export type HeroLabels = {
  carousel: string;
  previous: string;
  next: string;
  goTo: string;
  play: string;
  pause: string;
};

const INTERVAL_MS = 7000;

const controlClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white hover:text-court";

/*
  Slider hero beranda. Ganti otomatis tiap 7 detik, berhenti saat disorot/difokus,
  bisa dijeda dengan tombol, dan tidak jalan otomatis bila pengunjung memilih "kurangi animasi".
*/
export function HeroSlider({ slides, labels }: { slides: HeroSlide[]; labels: HeroLabels }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [holding, setHolding] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || holding || count < 2) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [playing, holding, count, index]);

  const go = (n: number) => setIndex((n + count) % count);

  return (
    <section
      data-surface="dark"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={() => setHolding(false)}
      className="relative isolate overflow-hidden bg-court-deep text-white"
    >
      {/* Semua slide ditumpuk di satu sel grid, jadi tinggi hero mengikuti slide yang paling tinggi */}
      <div className="grid" aria-live={playing && !holding ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "relative col-start-1 row-start-1 flex min-h-[600px] items-center transition-opacity duration-700 motion-reduce:transition-none md:min-h-[720px]",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <Photo src={slide.image} alt="" sizes="100vw" priority={i === 0} />
              <div className="absolute inset-0 bg-court-deep/60 md:bg-court-deep/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-court-deep/90 via-court-deep/55 to-transparent" />
              <CourtLines
                animate
                className="pointer-events-none absolute -right-20 bottom-4 hidden w-[600px] text-white/25 lg:block"
              />
              <Container className="relative pb-28 pt-20">
                <div className="max-w-3xl">
                  <Heading className="text-5xl font-extrabold sm:text-6xl lg:text-7xl xl:text-8xl">
                    {slide.title}
                  </Heading>
                  <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">{slide.text}</p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <WhatsAppButton variant="accent" size="lg" message={slide.waMessage}>
                      {slide.primary}
                    </WhatsAppButton>
                    <ButtonLink href={slide.href} variant="outline-light" size="lg">
                      {slide.secondary}
                    </ButtonLink>
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 pb-5 md:pb-8">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`${labels.goTo} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className="group flex h-11 w-10 items-center justify-center"
              >
                <span
                  className={cn(
                    "block h-1 w-8 rounded-full transition-colors",
                    i === index ? "bg-ball" : "bg-white/55 group-hover:bg-white",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button type="button" aria-label={labels.previous} onClick={() => go(index - 1)} className={controlClass}>
              <LuChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={playing ? labels.pause : labels.play}
              onClick={() => setPlaying((p) => !p)}
              className={controlClass}
            >
              {playing ? (
                <LuPause className="size-5" aria-hidden="true" />
              ) : (
                <LuPlay className="size-5" aria-hidden="true" />
              )}
            </button>
            <button type="button" aria-label={labels.next} onClick={() => go(index + 1)} className={controlClass}>
              <LuChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
