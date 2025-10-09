import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./MobileMenu.module.scss"

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "O nas", href: "#about" },
  { label: "Nasze inwestycje", href: "#investments" },
  { label: "Poradnik", href: "#guide" },
  { label: "Wynajmij", href: "#rent" },
] as const

const CTA_LINK = { label: "Kontakt", href: "#contact" }
const DESKTOP_BREAKPOINT = 1024
const FOCUSABLE_SELECTORS =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    setOpen((value) => !value)
  }, [])

  const handleLinkClick = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeMenu()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, closeMenu])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const media = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu()
      }
    }

    if (media.matches) {
      closeMenu()
    }

    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [closeMenu])

  useEffect(() => {
    if (!open) {
      return
    }

    const drawer = drawerRef.current
    const toggle = toggleRef.current
    if (!drawer || !toggle) {
      return
    }

    const focusable = Array.from(
      drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    )
    const ordered = focusable.length > 0 ? [...focusable, toggle] : [toggle]
    const first = ordered[0]

    requestAnimationFrame(() => {
      first?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || ordered.length === 0) {
        return
      }

      const current = document.activeElement as HTMLElement | null
      const firstElement = ordered[0]
      const lastElement = ordered[ordered.length - 1]

      if (event.shiftKey) {
        if (current === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (current === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = "hidden"
    body.dataset.menuOpen = "true"

    return () => {
      body.style.overflow = previousOverflow
      body.removeAttribute("data-menu-open")
    }
  }, [open])

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      toggleRef.current?.focus()
    }
    wasOpenRef.current = open
  }, [open])

  const toggleClassName = open
    ? `${styles.toggle} ${styles.toggleOpen}`
    : styles.toggle

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.colLeft}>
            <a
              className={styles.brand}
              href="#hero"
              aria-label="Crafton - przejdz do sekcji startowej"
            >
              <img
                className={styles.logoImg}
                src="/brand/crafton_logo.svg"
                alt="Crafton"
              />
            </a>
          </div>

          <div className={styles.colCenter}>
            <nav className={styles.nav} aria-label="Glowna nawigacja">
              <ul className={styles.navList}>
                {NAV_LINKS.map((item) => {
                  const isAbout = item.label === "O nas"
                  const isInvestments = item.label === "Nasze inwestycje"
                  const hasDropdown = isAbout || isInvestments

                  return (
                    <li key={item.href}>
                      <a
                        className={`${styles.navLink} ${hasDropdown ? styles.withChevron : ""}`}
                        href={item.href}
                        {...(hasDropdown
                          ? {
                              "data-has-dropdown": true,
                              "aria-haspopup": "true" as const,
                              "aria-expanded": false,
                            }
                          : {})}
                      >
                        {item.label}
                        {hasDropdown ? (
                          <span aria-hidden="true" className={styles.chevronIcon} />
                        ) : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className={styles.colRight}>
            <a className={styles.navCta} href={CTA_LINK.href}>
              <span>KONTAKT</span>
              <span aria-hidden="true" className={styles.ctaIcon} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={toggleClassName}
              aria-expanded={open}
              aria-controls="primary-nav"
              onClick={handleToggle}
            >
              <span className={styles.srOnly}>
                {open ? "Zamknij menu" : "Otworz menu"}
              </span>
              <span className={styles.toggleIcon} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mobileLayer} data-open={open}>
        <button
          type="button"
          className={styles.overlay}
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeMenu}
        />

        <div
          ref={drawerRef}
          className={styles.drawer}
          aria-hidden={!open}
          role="presentation"
        >
          <ul className={styles.mobileNav} id="primary-nav">
            {NAV_LINKS.map((item) => (
              <li key={`mobile-${item.href}`}>
                <a href={item.href} onClick={handleLinkClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a className={styles.mobileCta} href={CTA_LINK.href} onClick={handleLinkClick}>
            {CTA_LINK.label}
          </a>
        </div>
      </div>
    </header>
  )
}
