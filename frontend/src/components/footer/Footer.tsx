import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p>© 2025 RealEstate Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
        <p>Projekt i realizacja: Crafton</p>
        <p>
          Materiały zawarte na stronie WWW mają charakter poglądowy i nie mogą być traktowane jako
          ostateczne projekty realizacyjne. Deweloper zastrzega sobie prawo zmian. Niniejsza
          informacja nie stanowi oferty w rozumieniu przepisów Kodeksu Cywilnego i ma wyłącznie
          charakter informacyjny.
        </p>
      </div>
    </footer>
  )
}
