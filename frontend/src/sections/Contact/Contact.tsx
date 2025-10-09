import styles from "./Contact.module.scss"

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.heading}>POROZMAWIAJMY</h2>

        <div className={styles.panel}>
          <form className={styles.form} noValidate>
            <div className={styles.fieldset}>
              <p className={styles.lead}>ZOSTAW NAM WIADOMOŚĆ</p>

              <div className={styles.fields}>
                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>
                    ADRES E-MAIL
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Twój adres E-mail"
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>
                    IMIĘ I NAZWISKO
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Twoje imię i nazwisko"
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>
                    TEMAT ROZMOWY
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="O czym chcesz porozmawiać?"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldFull}>
                  <label htmlFor="contact-message" className={styles.label}>
                    WIADOMOŚĆ
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Napisz swoją wiadomość…"
                    className={styles.textarea}
                  />
                </div>
              </div>
            </div>

            <label className={styles.privacy}>
              <input type="checkbox" className={styles.privacyInput} />
              <span className={styles.checkbox} aria-hidden="true" />
              <span className={styles.privacyText}>
                Wyrażam zgodę na przetwarzanie moich danych osobowych w postaci imienia, nazwiska,
                adresu e-mail oraz tel. (jeśli został podany), podanych w powyższym formularzu,
                zgodnie z przepisami rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
                dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z
                przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz
                uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych), Dz. Urz. UE
                L 4.5.2016 r., L 119, s. 1), w celu udzielenia odpowiedzi na złożone zapytanie.
                Żądanie usunięcia danych proszę kierować na adres biuro@realestate.com
              </span>
            </label>

            <button type="button" className={styles.submit}>
              WYŚLIJ WIADOMOŚĆ
              <img
                src="/icons/mdi_arrow-up.svg"
                alt=""
                aria-hidden="true"
                className={styles.submitIcon}
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
