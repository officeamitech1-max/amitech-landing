import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WA_URL } from '../config'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-white/[0.06] py-10 px-5 md:px-12"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-5 flex-wrap">
        <a href="#hero" className="flex items-center gap-2.5">
          <img src="/logo-mark.svg" alt="" className="h-10 w-auto" />
          <span
            className="text-[#d8ecf8] font-bold text-lg tracking-tight"
            style={{ fontFamily: 'Ellinia CLM, sans-serif' }}
          >
            Amitech
          </span>
        </a>

        <p className="text-[#81899b] text-sm text-center">
          © 2025 Amitech. מערכות מידע ואוטומציות לעסקים.
        </p>

        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#b6d9fc] hover:text-white text-sm font-mono transition-colors"
          whileHover={{ x: -3 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle size={15} />
          צור קשר ב-WhatsApp
        </motion.a>
      </div>
    </motion.footer>
  )
}
