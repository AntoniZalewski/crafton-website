import { ChangeEvent, FormEvent, useRef, useState } from "react"
import appStyles from "@/App.module.scss"
import styles from "./ContactForm.module.scss"

type FieldKey = "name" | "email" | "message" | "consent"

type FormState = {
  name: string
  email: string
  message: string
  consent: boolean
}

type FormErrors = Partial<Record<FieldKey, string>>

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  message: "",
  consent: false,
}

const EMAIL_REGEXP = /^\S+@\S+\.\S+$/

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [feedbackText, setFeedbackText] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)

  const handleChange =
    (field: FieldKey) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "consent" && event.target instanceof HTMLInputElement
          ? event.target.checked
          : event.target.value

      setValues((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

  const validate = (nextValues: FormState): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!nextValues.name.trim()) {
      nextErrors.name = "Podaj swoje imie i nazwisko."
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = "Podaj adres e-mail."
    } else if (!EMAIL_REGEXP.test(nextValues.email.trim())) {
      nextErrors.email = "Adres e-mail ma nieprawidlowy format."
    }

    if (!nextValues.message.trim()) {
      nextErrors.message = "Napisz wiadomosc."
    }

    if (!nextValues.consent) {
      nextErrors.consent = "Musisz zaakceptowac polityke prywatnosci."
    }

    return nextErrors
  }

  const focusFeedback = () => {
    requestAnimationFrame(() => {
      feedbackRef.current?.focus()
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0] as FieldKey
      const firstMessage = nextErrors[firstKey] ?? "Popraw zaznaczone pola i sprobuj ponownie."

      setStatus("error")
      setFeedbackText(firstMessage)

      const firstInvalid = formRef.current?.querySelector<HTMLElement>(
        `[data-field="${firstKey}"]`,
      )
      requestAnimationFrame(() => {
        firstInvalid?.focus()
      })
      focusFeedback()
      return
    }

    setStatus("success")
    setFeedbackText("Dziekujemy! Twoja wiadomosc zostala wyslana. Skontaktujemy sie z Toba wkrotce.")
    setValues(INITIAL_STATE)
    setErrors({})
    focusFeedback()
  }

  const showFeedback = status !== "idle"
  const feedbackRole = status === "error" ? "alert" : "status"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`${appStyles.section} ${styles.contactSection}`}
    >
      <div className={`${appStyles.sectionNarrow} ${styles.inner}`}>
        <div className={`${appStyles.sectionHeader} ${styles.header}`}>
          <h2 id="contact-heading" className={appStyles.sectionTitle}>
            Porozmawiajmy
          </h2>
          <p className={appStyles.sectionLead}>
            Zostaw nam wiadomosc, a nasi specjalisci wroca do Ciebie z odpowiedzia w ciagu jednego dnia
            roboczego.
          </p>
        </div>

        <div className={styles.formWrapper}>
          {showFeedback && (
            <div
              id="contact-feedback"
              ref={feedbackRef}
              tabIndex={-1}
              role={feedbackRole}
              className={`${styles.feedback} ${
                status === "success" ? styles.feedbackSuccess : styles.feedbackError
              }`}
            >
              {feedbackText}
            </div>
          )}

          <form
            ref={formRef}
            noValidate
            className={styles.form}
            onSubmit={handleSubmit}
            aria-describedby={showFeedback ? "contact-feedback" : undefined}
          >
            <div className={styles.gridRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  Imie i nazwisko
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  value={values.name}
                  onChange={handleChange("name")}
                  data-field="name"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className={styles.errorMessage}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Adres e-mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  value={values.email}
                  onChange={handleChange("email")}
                  data-field="email"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className={styles.errorMessage}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-message">
                Wiadomosc
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                className={`${styles.textarea} ${errors.message ? styles.textareaError : ""}`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                value={values.message}
                onChange={handleChange("message")}
                rows={6}
                data-field="message"
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className={styles.errorMessage}>
                  {errors.message}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <div className={styles.checkboxRow}>
                <input
                  id="contact-consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={values.consent}
                  onChange={handleChange("consent")}
                  aria-invalid={Boolean(errors.consent)}
                  data-field="consent"
                />
                <label htmlFor="contact-consent" className={styles.checkboxLabel}>
                  Akceptuje{" "}
                  <a href="#" target="_blank" rel="noreferrer">
                    polityke prywatnosci
                  </a>
                  .
                </label>
              </div>
              {errors.consent && (
                <p role="alert" className={styles.errorMessage}>
                  {errors.consent}
                </p>
              )}
            </div>

            <button type="submit" className={styles.submit}>
              Wyslij wiadomosc
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
