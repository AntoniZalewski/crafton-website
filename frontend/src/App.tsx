import MobileMenu from "@/components/nav/MobileMenu"
import Footer from "@/components/footer/Footer"
import Contact from "@/sections/Contact/Contact"
import GuideGrid from "@/features/guide/GuideGrid"
import InvestmentsSection from "@/features/investments/InvestmentsSection"
import styles from "./App.module.scss"

export default function App() {
  return (
    <>
      <MobileMenu />
      <main className={styles.main}>
        <section id="hero" className={`${styles.section} ${styles.hero}`}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>RealEstate</p>
            <h1 className={styles.heroTitle}>Twoj klucz do lepszej przyszlosci</h1>
            <p className={styles.heroLead}>
              W RealEstate nieruchomosci to cos wiecej niz tylko budynki - to miejsca, w ktorych
              powstaja historie, rozwijaja sie biznesy i spelniaja marzenia.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#investments">
                Nasze inwestycje
                <img
                  className={styles.icon}
                  src="/icons/mdi_arrow-up.svg"
                  alt=""
                  aria-hidden="true"
                />
              </a>
              <a className={styles.secondaryCta} href="#contact">
                Poznajmy sie
              </a>
            </div>
          </div>
        </section>

        <InvestmentsSection />

        <GuideGrid />

        <Contact />
      </main>
      <Footer />
    </>
  )
}
