import { useRef } from "react"
import styles from "./Slider.module.scss"

type Slide = {
  id: string
  title: string
  location: string
  description: string
  image: {
    src: string
    alt: string
  }
}

const SLIDES: Slide[] = [
  {
    id: "poznan-park",
    title: "Poznan Park",
    location: "Poznan 20-300",
    description:
      "Kameralne osiedle nowoczesnych domow, ktore laczy komfort codziennego zycia z bliskoscia natury.",
    image: {
      src: "https://picsum.photos/seed/crafton-1/960/640",
      alt: "Wizualizacja osiedla Poznan Park w otoczeniu zieleni",
    },
  },
  {
    id: "wilanow-horizon",
    title: "Wilanow Horizon",
    location: "Warszawa 02-950",
    description:
      "Kompleks apartamentow z zielonymi tarasami oraz widokiem na panorame miasta. Idealny balans pracy i odpoczynku.",
    image: {
      src: "https://picsum.photos/seed/crafton-2/960/640",
      alt: "Nowoczesny budynek apartamentowy o zachodzie slonca",
    },
  },
  {
    id: "gdynia-marina",
    title: "Gdynia Marina",
    location: "Gdynia 81-451",
    description:
      "Inwestycja nadmorska z dostepem do mariny i sciezek spacerowych. Zaprojektowana dla aktywnych rodzin.",
    image: {
      src: "https://picsum.photos/seed/crafton-3/960/640",
      alt: "Zabudowa mieszkaniowa w poblizu mariny w pogodny dzien",
    },
  },
  {
    id: "katowice-loft",
    title: "Katowice Loft",
    location: "Katowice 40-001",
    description:
      "Przestrzenie loftowe w zrewitalizowanej zabytkowej fabryce. Wysokie sufity i industrialny charakter.",
    image: {
      src: "https://picsum.photos/seed/crafton-4/960/640",
      alt: "Industrialny loft z wielkimi oknami",
    },
  },
]

export default function Slider() {
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: number) => {
    const node = trackRef.current
    if (!node) return

    node.scrollBy({
      left: direction * node.clientWidth,
      behavior: "smooth",
    })
  }

  return (
    <div className={styles.slider} aria-label="Slider inwestycji">
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => handleScroll(-1)}
          aria-label="Poprzednia inwestycja"
        >
          &lsaquo;
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => handleScroll(1)}
          aria-label="Nastepna inwestycja"
        >
          &rsaquo;
        </button>
      </div>

      <div className={styles.track} ref={trackRef} role="list">
        {SLIDES.map((slide) => (
          <article className={styles.card} key={slide.id} role="listitem">
            <div className={styles.imageWrapper}>
              <img
                src={slide.image.src}
                alt={slide.image.alt}
                loading="lazy"
                width="960"
                height="640"
              />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardLocation}>{slide.location}</p>
              <h3 className={styles.cardTitle}>{slide.title}</h3>
              <p className={styles.cardDescription}>{slide.description}</p>
              <a className={styles.cardLink} href="#">
                Poznaj szczegoly
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
