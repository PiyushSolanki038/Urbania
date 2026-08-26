import { useState } from "react";
import styles from "../styles/Enquiry.module.css";
import Reveal from "./Reveal.jsx";
import { statesMap } from "../data/site.js";

const initialForm = { name: "", email: "", mobile: "", state: "", city: "", consent: false };

function getErrors(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(f.email)) e.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(f.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
  if (!f.state) e.state = "Select your state.";
  if (!f.city) e.city = "Select your city.";
  if (!f.consent) e.consent = "Please accept to be contacted.";
  return e;
}

export default function Enquiry() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | done

  const errors = getErrors(form);
  const showErr = (k) => Boolean(touched[k] && errors[k]);
  const cityOptions = statesMap[form.state] || [];

  const setField = (k, v) =>
    setForm((f) => ({ ...f, [k]: v, ...(k === "state" ? { city: "" } : null) }));
  const blur = (k) => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, mobile: true, state: true, city: true, consent: true });
    if (Object.keys(getErrors(form)).length) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1400);
  };

  const onReset = () => {
    setForm(initialForm);
    setTouched({});
    setStatus("idle");
  };

  const borderFor = (k) => (showErr(k) ? "#C8102E" : "rgba(20,20,26,.15)");
  const firstName = form.name.trim().split(" ")[0] || "there";

  return (
    <section id="enquire" className={styles.section}>
      <div className={`u-shell ${styles.grid}`}>
        <Reveal>
          <p className={styles.eyebrow}>Enquire</p>
          <h2 className={styles.heading}>Register your interest.</h2>
          <p className={styles.lede}>
            Share a few details and a product specialist from your nearest dealership will arrange a walkaround and
            a test drive at a time that suits you.
          </p>
          <dl className={styles.dl}>
            <div className={styles.dlRow}>
              <dt className={styles.dt}>Toll-free</dt>
              <dd className={styles.dd}>1800 000 0000</dd>
            </div>
            <div className={styles.dlRow}>
              <dt className={styles.dt}>Email</dt>
              <dd className={styles.dd}>hello@urbania-demo.in</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.panel}>
            {status !== "done" ? (
              <form onSubmit={onSubmit} className={styles.form}>
                <div>
                  <label htmlFor="u-name" className={styles.label}>
                    Full name
                  </label>
                  <input
                    id="u-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    onBlur={() => blur("name")}
                    placeholder="Your full name"
                    className={styles.input}
                    style={{ borderColor: borderFor("name") }}
                  />
                  {showErr("name") && <p className={styles.error}>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="u-email" className={styles.label}>
                    Email address
                  </label>
                  <input
                    id="u-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => blur("email")}
                    placeholder="you@example.com"
                    className={styles.input}
                    style={{ borderColor: borderFor("email") }}
                  />
                  {showErr("email") && <p className={styles.error}>{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="u-mobile" className={styles.label}>
                    Mobile number
                  </label>
                  <input
                    id="u-mobile"
                    type="tel"
                    autoComplete="tel"
                    value={form.mobile}
                    onChange={(e) => setField("mobile", e.target.value)}
                    onBlur={() => blur("mobile")}
                    placeholder="10-digit mobile"
                    className={styles.input}
                    style={{ borderColor: borderFor("mobile") }}
                  />
                  {showErr("mobile") && <p className={styles.error}>{errors.mobile}</p>}
                </div>

                <div className={styles.twoCol}>
                  <div>
                    <label htmlFor="u-state" className={styles.label}>
                      State
                    </label>
                    <select
                      id="u-state"
                      value={form.state}
                      onChange={(e) => setField("state", e.target.value)}
                      onBlur={() => blur("state")}
                      className={styles.select}
                      style={{ borderColor: borderFor("state"), color: form.state ? "#14141A" : "#5B5B62" }}
                    >
                      <option value="">Select state</option>
                      {Object.keys(statesMap).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {showErr("state") && <p className={styles.error}>{errors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="u-city" className={styles.label}>
                      City
                    </label>
                    <select
                      id="u-city"
                      value={form.city}
                      onChange={(e) => setField("city", e.target.value)}
                      onBlur={() => blur("city")}
                      disabled={!form.state}
                      className={styles.select}
                      style={{
                        borderColor: borderFor("city"),
                        color: form.city ? "#14141A" : "#5B5B62",
                        opacity: form.state ? 1 : 0.55,
                      }}
                    >
                      <option value="">{form.state ? "Select city" : "Select state first"}</option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {showErr("city") && <p className={styles.error}>{errors.city}</p>}
                  </div>
                </div>

                <div>
                  <label className={styles.consentLabel}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      onBlur={() => blur("consent")}
                      className={styles.checkbox}
                    />
                    <span>
                      I authorise Urbania and its dealer partners to contact me by call, SMS, email or WhatsApp
                      about this enquiry, overriding my DNC registration.
                    </span>
                  </label>
                  {showErr("consent") && <p className={styles.error}>{errors.consent}</p>}
                </div>

                <button type="submit" disabled={status === "loading"} className={styles.submit}>
                  {status === "loading" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
                      <path d="M21 12a9 9 0 1 1-6.2-8.5" />
                    </svg>
                  )}
                  {status === "loading" ? "Submitting" : "Submit Enquiry"}
                </button>
              </form>
            ) : (
              <div className={styles.done}>
                <span className={styles.doneIcon}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                    <path d="M4 12.5l5 5L20 6.5" stroke="#C8102E" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className={styles.doneTitle}>Enquiry received</h3>
                <p className={styles.doneCopy}>
                  Thank you, {firstName}. A specialist will reach you on {form.mobile} within one working day.
                  (Demo submission — nothing was sent.)
                </p>
                <button type="button" onClick={onReset} className={styles.doneReset}>
                  Submit another
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
