import { useState } from "react"

import styles from "./InvestmentsSection.module.scss"

const SLIDES = [
  {
    id: "poznan-park",
    location: "Pozna\u0144 20-300",
    title: "Pozna\u0144 Park",
    description:
      "Pozna\u0144 Park to kameralne osiedle nowoczesnych dom\u00F3w, kt\u00F3re harmonijnie \u0142\u0105cz\u0105 komfort \u017Cycia z blisko\u015Bci\u0105 natury. Po\u0142o\u017Cone zaledwie 10 minut od centrum Poznania, oferuje cisz\u0119 i ziele\u0144 bez kompromis\u00F3w \u2013 z \u0142atwym dost\u0119pem do miejskich udogodnie\u0144.",
    image: "/investments/house1.jpg",
    ctaHref: "#",
  },
  {
    id: "wilanow-horizon",
    location: "Warszawa 02-950",
    title: "Wilan\u00F3w Horizon",
    description:
      "Kompleks apartament\u00F3w z zielonymi tarasami oraz widokiem na panoram\u0119 miasta. Idealny balans pracy i odpoczynku.",
    image: "/investments/house2.jpg",
    ctaHref: "#",
  },
]

export default function InvestmentsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slide = SLIDES[activeIndex]

  const showPrev = () => {
    setActiveIndex((index) => Math.max(index - 1, 0))
  }

  const showNext = () => {
    setActiveIndex((index) => Math.min(index + 1, SLIDES.length - 1))
  }

  const isFirstSlide = activeIndex === 0
  const isLastSlide = activeIndex === SLIDES.length - 1

  return (
    <section
      id="investments"
      aria-labelledby="investments-heading"
      className={styles.section}
    >
      <div className={styles.header}>
        <h2 id="investments-heading" className={styles.title}>
          Nasze inwestycje
        </h2>
        <p className={styles.lead}>
          Nasze inwestycje to miejsca, kt\u00F3re \u0142\u0105cz\u0105 nowoczesny design,
          funkcjonalno\u015B\u0107 i trwa\u0142o\u015B\u0107. Ka\u017Cdy projekt realizowany przez
          RealEstate to wynik pasji, zaanga\u017Cowania i dba\u0142o\u015Bci o ka\u017Cdy
          szczeg\u00F3\u0142.
        </p>
      </div>

      <div className={styles.widget}>
        <article key={slide.id} className={styles.card}>
          <span className={styles.badge}>
            <img
              src="/icons/investment_icon.svg"
              alt=""
              aria-hidden="true"
              className={styles.badgeIcon}
            />
            <span className={styles.location}>{slide.location}</span>
          </span>

          <h3 className={styles.cardTitle}>{slide.title}</h3>
          <p className={styles.description}>{slide.description}</p>

          <a className={styles.cta} href={slide.ctaHref}>
            <span>Poznaj szczeg\u00F3\u0142y</span>
            <img src="/icons/mdi_arrow-up.svg" alt="" aria-hidden="true" className={styles.ctaIcon} />
          </a>

          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={showPrev}
              disabled={isFirstSlide}
              aria-label="Poprzednia inwestycja"
            >
              <img
                src="/icons/chevron-down.svg"
                alt=""
                aria-hidden="true"
                className={styles.navIcon}
              />
            </button>
            <button
              type="button"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={showNext}
              disabled={isLastSlide}
              aria-label="Nast\u0119pna inwestycja"
            >
              <img
                src="/icons/chevron-down.svg"
                alt=""
                aria-hidden="true"
                className={styles.navIcon}
              />
            </button>
          </div>
        </article>

        <div key={`${slide.id}-image`} className={styles.imageFrame}>
          <img src={slide.image} alt={slide.title} className={styles.image} />
        </div>
      </div>
    </section>
  )
}
