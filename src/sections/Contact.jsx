import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiPaperAirplane,
} from 'react-icons/hi';
import Section from '../components/Section';
import SceneShell from '../canvas/SceneShell';
import ContactPlanet from '../canvas/ContactPlanet';
import { socials } from '../data/socials';
import { profile } from '../data/profile';
import { fadeIn } from '../utils/motion';

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const emailjsReady = Boolean(
  EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey,
);

const EMPTY = { name: '', email: '', message: '' };

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email.';
  if (form.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.';
  return errors;
}

function Field({ label, name, error, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink-200">
        {label}
      </span>
      <Tag
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-err` : undefined}
        className={`w-full rounded-xl border bg-night/60 px-4 py-3.5 text-white placeholder:text-ink-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/25 ${
          error ? 'border-red-400/70' : 'border-white/10'
        } ${textarea ? 'min-h-37.5 resize-y' : ''}`}
        {...props}
      />
      {error && (
        <span id={`${name}-err`} className="mt-1.5 block text-sm text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    // No EmailJS keys configured → open the visitor's email app instead.
    if (!emailjsReady) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name} (${form.email})`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
          to_name: profile.name,
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const whatsapp = socials.find(s => s.name === 'WhatsApp');
  const WhatsAppIcon = whatsapp.icon;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build something <span className="text-gradient">together</span>
        </>
      }
      intro="Have a project, an internship opportunity or just want to say hi? Send a message — I usually reply within a day."
    >
      <div className="grid items-stretch gap-10 lg:grid-cols-2">
        <motion.div
          variants={fadeIn('right')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass gradient-border space-y-5 rounded-3xl p-6 sm:p-8"
          >
            <Field
              label="Your name"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={onChange}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label="Your email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={onChange}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              label="Message"
              name="message"
              textarea
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={onChange}
              error={errors.message}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-500 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-600/30 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              <HiPaperAirplane className="rotate-90" />
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <div aria-live="polite">
              {status === 'sent' && (
                <p className="flex items-center gap-2 text-green-300">
                  <HiCheckCircle /> Thanks! Your message was sent — I'll get
                  back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-red-300">
                  <HiExclamationCircle /> Something went wrong. Please email me
                  directly at {profile.email}.
                </p>
              )}
            </div>
          </form>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-3 rounded-2xl px-5 py-4 transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="text-2xl text-green-400" />
              <span>
                <span className="block text-sm font-semibold text-white">
                  WhatsApp
                </span>
                <span className="text-xs text-ink-400">Quickest reply</span>
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass flex items-center gap-3 rounded-2xl px-5 py-4 transition hover:-translate-y-0.5"
            >
              <span className="text-2xl">✉️</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">
                  Email
                </span>
                <span className="block truncate text-xs text-ink-400">
                  {profile.email}
                </span>
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('left')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative min-h-90 lg:min-h-full"
        >
          <SceneShell camera={{ position: [0, 0, 7.5], fov: 45 }}>
            {quality => <ContactPlanet quality={quality} />}
          </SceneShell>
        </motion.div>
      </div>
    </Section>
  );
}
