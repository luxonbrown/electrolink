import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Sparkles, X } from '../lib/icons.js'

const SUGGESTIONS = [
  'Best phone under RWF 700,000',
  'Laptop for university',
  'Noise-cancelling headphones',
]

/**
 * AI Product Assistant teaser. The input is local-only and answers with a
 * canned, clearly-labelled response so it never implies a real model call.
 */
export default function AIAssistantCard() {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState(null)

  const ask = (value) => {
    const q = value.trim()
    if (!q) return
    setAnswer(
      `Here's how I'd shortlist options for "${q}" — browse Phones & Tablets and Laptops & Computers, then compare up to 3 products side by side.`,
    )
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.06, ease: 'easeOut' }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-card"
    >
      <div className="flex items-center gap-2.5">
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-800 to-navy-950 text-white">
          <Bot className="h-5 w-5" aria-hidden="true" />
          <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
        <div className="min-w-0">
          <h2 className="flex items-center gap-1 text-[15px] leading-tight font-extrabold text-navy-900">
            AI Product Assistant
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          </h2>
          <p className="text-[11px] text-slate-500">Answers in seconds</p>
        </div>
      </div>

      <p className="mt-3 text-[11.5px] leading-snug text-slate-600">
        Tell us what you need, we'll find the best options for you!
      </p>

      {answer && (
        <div className="mt-3 flex gap-2 rounded-lg border border-brand-100 bg-brand-50 p-2.5 text-[11px] leading-snug text-navy-800">
          <p className="flex-1">{answer}</p>
          <button
            type="button"
            onClick={() => {
              setAnswer(null)
              setQuery('')
            }}
            aria-label="Dismiss answer"
            className="h-fit shrink-0 rounded p-0.5 text-slate-400 transition-colors hover:text-navy-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          ask(query)
        }}
        className="mt-3 flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. gaming laptop"
          aria-label="Ask the AI assistant"
          className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-[12px] text-navy-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Ask AI"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-900 text-white transition-colors hover:bg-navy-800"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => {
                setQuery(s)
                ask(s)
              }}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <Link
        to="/ai-assistant"
        className="group mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md active:scale-[0.98]"
      >
        Ask AI
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </motion.aside>
  )
}
