import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./GuideGrid.module.scss"

type FeaturedGuide = {
  id: string
  title: string
  href: string
  image: {
    src: string
    alt: string
  }
}

type ExtendedGuide = FeaturedGuide & {
  summary: string
}

const FEATURED_GUIDES: FeaturedGuide[] = [
  {
    id: "buying-guide",
    title: "Jak kupi\u0107 nieruchomo\u015b\u0107 i nie zwariowa\u0107? Przewodnik dla pocz\u0105tkuj\u0105cych.",
    href: "#",
    image: {
      src: "/advices/advice1.jpg",
      alt: "Wizualizacja nowoczesnego budynku mieszkalnego o zmierzchu.",
    },
  },
  {
    id: "investment-differences",
    title: "Czym r\u00f3\u017cni si\u0119 inwestycja w nieruchomo\u015b\u0107 od zwyk\u0142ego zakupu?",
    href: "#",
    image: {
      src: "/advices/advice2.jpg",
      alt: "Widok na osiedle z jeziorem oraz spaceruj\u0105cymi mieszka\u0144cami.",
    },
  },
  {
    id: "home-tech-2025",
    title: "5 technologii, kt\u00f3re powinny mie\u0107 nowoczesne domy w 2025 roku.",
    href: "#",
    image: {
      src: "/advices/advice3.jpg",
      alt: "Nowoczesne domy jednorodzinne z panelami s\u0142onecznymi na dachach.",
    },
  },
]

const MORE_GUIDES: ExtendedGuide[] = [
  {
    id: "neighbourhood-potential",
    title: "Jak oceni\u0107 potencja\u0142 okolicy przed zakupem mieszkania?",
    summary:
      "Poznaj wska\u017aniki i \u017ar\u00f3d\u0142a danych, kt\u00f3re pomog\u0105 Ci przewidzie\u0107 rozw\u00f3j dzielnicy w przysz\u0142o\u015bci.",
    href: "#",
    image: {
      src: "/advices/advice1.jpg",
      alt: "Kameralna ulica z kamienicami i drzewami latem.",
    },
  },
  {
    id: "financing-steps",
    title: "Finansowanie inwestycji krok po kroku \u2013 praktyczna lista zada\u0144.",
    summary:
      "Dowiedz si\u0119, jak przygotowa\u0107 si\u0119 do rozm\u00f3w z bankiem i jakie dokumenty przyspiesz\u0105 decyzj\u0119 kredytow\u0105.",
    href: "#",
    image: {
      src: "/advices/advice2.jpg",
      alt: "Spotkanie przy stole konferencyjnym z dokumentami kredytowymi.",
    },
  },
  {
    id: "rent-vs-buy",
    title: "Kiedy wynajem ma wi\u0119cej sensu ni\u017c zakup nieruchomo\u015bci?",
    summary:
      "Analizujemy scenariusze finansowe i \u017cyciowe, w kt\u00f3rych wynajem daje wi\u0119cej elastyczno\u015bci ni\u017c w\u0142asne lokum.",
    href: "#",
    image: {
      src: "/advices/advice3.jpg",
      alt: "Nowoczesne mieszkanie z du\u017cymi oknami i widokiem na miasto.",
    },
  },
  {
    id: "legal-checklist",
    title: "Checklista prawna: co sprawdzi\u0107 przed podpisaniem aktu notarialnego?",
    summary:
      "Lista formalno\u015bci i dokument\u00f3w, kt\u00f3re warto zweryfikowa\u0107, aby unikn\u0105\u0107 kosztownych niespodzianek.",
    href: "#",
    image: {
      src: "/advices/advice1.jpg",
      alt: "Biurko z dokumentami prawnymi i laptopem.",
    },
  },
  {
    id: "smart-home-basics",
    title: "Smart home od podstaw: rozwi\u0105zania, kt\u00f3re zwi\u0119ksz\u0105 komfort \u017cycia.",
    summary:
      "Przegl\u0105d dost\u0119pnych technologii, kt\u00f3re mo\u017cesz wdro\u017cy\u0107 na start bez du\u017cych inwestycji.",
    href: "#",
    image: {
      src: "/advices/advice2.jpg",
      alt: "Panel sterowania inteligentnego domu w salonie.",
    },
  },
  {
    id: "investment-strategy",
    title: "Strategia inwestora: jak budowa\u0107 portfel nieruchomo\u015bci krok po kroku?",
    summary:
      "Praktyczne wskaz\u00f3wki dotycz\u0105ce dywersyfikacji, analiz rynkowych i zarz\u0105dzania portfelem nieruchomo\u015bci.",
    href: "#",
    image: {
      src: "/advices/advice3.jpg",
      alt: "Panorama nowoczesnego osiedla mieszkaniowego o zachodzie s\u0142o\u0144ca.",
    },
  },
]

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])'

export default function GuideGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    const modalElement = modalRef.current
    if (!modalElement) {
      return
    }

    const focusableItems = Array.from(
      modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    )

    const firstElement = focusableItems[0]
    const lastElement = focusableItems[focusableItems.length - 1]

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== "Tab" || focusableItems.length === 0) {
        return
      }

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    if (firstElement) {
      window.requestAnimationFrame(() => firstElement.focus())
    }

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [closeModal, isModalOpen])

  useEffect(() => {
    if (isModalOpen) {
      wasOpenRef.current = true
      return
    }

    if (wasOpenRef.current) {
      moreButtonRef.current?.focus()
      wasOpenRef.current = false
    }
  }, [isModalOpen])

  return (
    <section
      id="guide"
      aria-labelledby="guide-heading"
      className={styles.guide}
    >
      <div className={styles.badgeHeading}>
        <h2 id="guide-heading" className={styles.heading}>
          PORADNIK
          <br />
          PO NIERUCHOMO\u015aCIACH
        </h2>
      </div>

      <div className={styles.grid}>
        {FEATURED_GUIDES.map((guide) => (
          <article key={guide.id} className={styles.card}>
            <img
              className={styles.cardImage}
              src={guide.image.src}
              alt={guide.image.alt}
              loading="lazy"
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{guide.title}</h3>
              <a
                className={styles.cardAction}
                href={guide.href}
                aria-label={`Przejd\u017a do artyku\u0142u: ${guide.title}`}
              >
                PRZEJD\u0179 DO ARTYKU\u0141U
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.moreWrap}>
        <button
          type="button"
          className={styles.moreBtn}
          onClick={openModal}
          ref={moreButtonRef}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          aria-controls="more-guides-dialog"
        >
          WI\u0118CEJ PORADNIK\u00d3W
          <svg className={styles.moreIcon} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            <path
              d="M4.083 9.917L9.917 4.083M5.25 4.083H9.917V8.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={styles.modalLayer}
        hidden={!isModalOpen}
        aria-hidden={!isModalOpen}
      >
        <button
          type="button"
          className={styles.overlay}
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeModal}
        />
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="more-guides-title"
          id="more-guides-dialog"
          ref={modalRef}
        >
          <header className={styles.modalHeader}>
            <h3 id="more-guides-title" className={styles.modalTitle}>
              Poradnik po nieruchomo\u015bciach
            </h3>
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Zamknij"
            />
          </header>
          <div className={styles.modalGrid}>
            {MORE_GUIDES.map((guide) => (
              <article key={guide.id} className={styles.modalCard}>
                <img
                  className={styles.modalImage}
                  src={guide.image.src}
                  alt={guide.image.alt}
                  loading="lazy"
                />
                <div className={styles.modalContent}>
                  <h4 className={styles.modalCardTitle}>{guide.title}</h4>
                  <p className={styles.modalSummary}>{guide.summary}</p>
                  <a
                    className={styles.modalAction}
                    href={guide.href}
                    aria-label={`Przejd\u017a do artyku\u0142u: ${guide.title}`}
                  >
                    PRZEJD\u0179 DO ARTYKU\u0141U
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
