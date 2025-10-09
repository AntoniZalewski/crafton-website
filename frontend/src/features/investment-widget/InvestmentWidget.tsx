import { useCallback, useState, type KeyboardEvent } from "react"
import styles from "./InvestmentWidget.module.scss"

type Investment = {
  id: string
  cityZip: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

const INVESTMENTS: Investment[] = [
  {
    id: "house1",
    cityZip: "Poznań 20-300",
    title: "Poznań Park",
    description:
      "Kameralne osiedle nowoczesnych domów, łączące komfort życia z bliskością natury.",
    imageSrc: "/investments/house1.jpg",
    imageAlt: "Elewacja domu — inwestycja Poznań Park",
  },
  {
    id: "house2",
    cityZip: "Warszawa 02-950",
    title: "Wilanów Horizon",
    description:
      "Nowoczesne apartamenty z zielonymi tarasami i świetnym skomunikowaniem.",
    imageSrc: "/investments/house2.jpg",
    imageAlt: "Budynek apartamentowy — inwestycja Wilanów Horizon",
  },
]

export default function InvestmentWidget() {
  const [index, setIndex] = useState(0)
  const current = INVESTMENTS[index]

  const handlePrev = useCallback(() => {
    setIndex((value) => (value - 1 + INVESTMENTS.length) % INVESTMENTS.length)
  }, [])

  const handleNext = useCallback(() => {
    setIndex((value) => (value + 1) % INVESTMENTS.length)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        handlePrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        handleNext()
      }
    },
    [handleNext, handlePrev],
  )

  return (
    <div
      className={styles.widget}
      role="group"
      aria-label="Karuzela inwestycji"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-active={current.id}
    >
      <div className={styles.inner}>
        <article className={styles.card}>
          <div className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.pinIcon}>
              📍
            </span>
            <span className={styles.city}>{current.cityZip}</span>
          </div>

          <h3 className={styles.title}>{current.title}</h3>

          <p className={styles.desc}>{current.description}</p>

          <a
            className={styles.cta}
            href="#contact"
            aria-label={`Poznaj szczegóły inwestycji ${current.title}`}
          >
            Poznaj szczegóły
            <img
              src="/icons/mdi_arrow-up.svg"
              alt=""
              aria-hidden="true"
              className={styles.ctaIcon}
            />
          </a>
        </article>

        <div className={styles.photo}>
          <img src={current.imageSrc} alt={current.imageAlt} />
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={handlePrev}
          aria-label="Pokaż poprzednią inwestycję"
        >
          <span aria-hidden="true" className={styles.navIcon} />
        </button>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={handleNext}
          aria-label="Pokaż następną inwestycję"
        >
          <span aria-hidden="true" className={styles.navIcon} />
        </button>
      </div>
    </div>
  )
}
