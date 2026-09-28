import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { ArrowRight, ChevronLeft, ChevronRight } from '../lib/icons.js'
import { heroSlides } from '../data/promoBanners.js'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/**
 * Dark navy gradient hero banner.
 *
 * Autoplay runs on a 5s delay and pauses on hover via Swiper's built-in
 * `pauseOnMouseEnter`, so the explicit `hovered` state only drives the visual
 * "paused" affordance and the pause/play button.
 */
export default function HeroCarousel({ slides = heroSlides }) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const swiperRef = useRef(null)

  const goTo = useCallback(
    (index) => {
      const target = (index + slides.length) % slides.length
      swiperRef.current?.slideToLoop(target)
    },
    [slides.length],
  )

  if (!slides.length) return null

  return (
    <section
      aria-label="Featured promotions"
      aria-roledescription="carousel"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 shadow-xl shadow-navy-900/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-purple-600/15 blur-3xl"
      />

      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y, Keyboard]}
        loop={slides.length > 1}
        speed={650}
        spaceBetween={0}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        autoplay={
          slides.length > 1
            ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={{ clickable: false }}
        navigation={{ prevNextEl: null }}
        a11y={{ prevSlideMessage: 'Previous slide', nextSlideMessage: 'Next slide' }}
        className="relative !z-10"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="grid items-center gap-6 px-6 py-9 sm:px-9 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:px-12 lg:py-14">
              {/* Copy */}
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-brand-200 uppercase backdrop-blur-sm sm:text-[11px]">
                  {slide.eyebrow}
                </span>

                <h2 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.headlineTop}
                  <br />
                  <span className="text-brand-400">{slide.headlineBottom}</span>
                </h2>

                <p className="mt-3.5 text-sm font-medium text-slate-300 sm:text-[15px]">
                  {slide.subtext}
                </p>
                <p className="mt-1 text-sm text-slate-400">{slide.description}</p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Link
                    to={slide.href}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-600/40"
                  >
                    {slide.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/deals"
                    className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
                  >
                    View Deals
                  </Link>
                </div>
              </div>

              {/* Artwork */}
              <div className="relative">
                <div className="relative mx-auto aspect-4/3 w-full max-w-md sm:max-w-lg">
                  <img
                    src={slide.image}
                    alt=""
                    width={720}
                    height={540}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
                  />

                  {/* Handwritten-style caption */}
                  <span className="font-hand absolute -top-1 -right-1 z-10 max-w-[9rem] rotate-[-6deg] text-lg leading-tight text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] sm:-top-3 sm:right-2 sm:max-w-none sm:text-2xl lg:text-[28px]">
                    {slide.scribble}
                  </span>

                  {/* Floating price chip */}
                  <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-navy-900 shadow-lg backdrop-blur-sm sm:text-xs">
                    <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                      -35%
                    </span>
                    This week
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right-edge arrow */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
          className="absolute top-1/2 right-3 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/25 sm:right-5 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Left arrow — desktop only, so it never collides with stacked mobile art */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
          className="absolute top-1/2 left-3 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/25 sm:h-10 sm:w-10 lg:grid"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Dots + pause affordance */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-navy-950/40 px-3 py-2 backdrop-blur-sm sm:bottom-5">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}: ${slide.headlineTop} ${slide.headlineBottom}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-brand-400' : 'w-2 bg-white/45 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
          <span
            className="text-[10px] font-semibold text-slate-300 tabular-nums"
            aria-live="polite"
          >
            {active + 1}/{slides.length}
            {hovered && <span className="ml-1 text-amber-300">paused</span>}
          </span>
        </div>
      )}
    </section>
  )
}
