import { motion } from 'framer-motion'

const tags = [
  {
    label: 'Diseño',
    variant: 'coral',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M2 18 L8 8 L11 13 L14 7 L22 18 Z" stroke="#FF6D4D" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(255,109,77,.1)"/>
        <line x1="14" y1="4" x2="14" y2="7" stroke="#FF6D4D" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="12.5" y1="5.2" x2="15.5" y2="5.2" stroke="#FF6D4D" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Sistema',
    variant: 'blue',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="12" r="9" stroke="#5170FF" strokeWidth="1.3" opacity=".5"/>
        <circle cx="12" cy="12" r="5.5" stroke="#828AFF" strokeWidth="1.3" opacity=".7"/>
        <circle cx="12" cy="12" r="2.5" stroke="#828AFF" strokeWidth="1.3"/>
        <circle cx="12" cy="12" r="1" fill="#41EAFF" style={{ filter: 'drop-shadow(0 0 3px #41EAFF)' }}/>
      </svg>
    ),
  },
  {
    label: 'Automatización',
    variant: 'cyan',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" stroke="#41EAFF" strokeWidth="1.4" fill="rgba(65,234,255,.08)"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#41EAFF" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Inteligencia Aplicada',
    variant: 'blue',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 20V6" stroke="#828AFF" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M4 6C4 6 6 5 9 6s3 3 3 3" stroke="#5170FF" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M20 6C20 6 18 5 15 6s-3 3-3 3" stroke="#828AFF" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M4 18C4 18 6 17 9 18s3-3 3-3" stroke="#5170FF" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M20 18C20 18 18 17 15 18s-3-3-3-3" stroke="#828AFF" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Marca',
    variant: 'coral',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="12" r="8.5" stroke="#FF6D4D" strokeWidth="1.3" opacity=".5"/>
        <polygon points="12,4 14,12 12,10 10,12" fill="#FF6D4D" opacity=".9"/>
        <polygon points="12,20 14,12 12,14 10,12" fill="rgba(255,109,77,.35)"/>
        <circle cx="12" cy="12" r="1.5" fill="#FF6D4D"/>
      </svg>
    ),
  },
  {
    label: 'Experiencia',
    variant: 'cyan',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 22C12 22 5 16 5 9a7 7 0 0 1 14 0c0 7-7 13-7 13z" stroke="#41EAFF" strokeWidth="1.4" fill="rgba(65,234,255,.07)" strokeLinejoin="round"/>
        <path d="M12 22V9" stroke="#41EAFF" strokeWidth="1.2" strokeLinecap="round" opacity=".6"/>
        <path d="M12 15 L9 11" stroke="#41EAFF" strokeWidth="1" strokeLinecap="round" opacity=".4"/>
        <path d="M12 12 L15 10" stroke="#41EAFF" strokeWidth="1" strokeLinecap="round" opacity=".4"/>
      </svg>
    ),
  },
  {
    label: 'De LATAM al mundo',
    variant: 'blue',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M2 14 Q6 6 12 6 Q18 6 22 14" stroke="#5170FF" strokeWidth="1.4" fill="none"/>
        <line x1="2" y1="14" x2="22" y2="14" stroke="#5170FF" strokeWidth="1.2" opacity=".5"/>
        <line x1="8" y1="14" x2="8" y2="18" stroke="#5170FF" strokeWidth="1.2" opacity=".6"/>
        <line x1="16" y1="14" x2="16" y2="18" stroke="#5170FF" strokeWidth="1.2" opacity=".6"/>
        <path d="M2 18 Q6 16 12 18 Q18 16 22 18" stroke="#828AFF" strokeWidth="1" opacity=".35"/>
      </svg>
    ),
  },
]

const variants = {
  blue: {
    background: 'rgba(81,112,255,0.07)',
    border: '1px solid rgba(81,112,255,0.20)',
    color: '#828AFF',
    hoverBg: 'rgba(81,112,255,0.13)',
    hoverBorder: 'rgba(81,112,255,0.45)',
    hoverShadow: '0 8px 32px rgba(81,112,255,0.18)',
  },
  coral: {
    background: 'rgba(255,109,77,0.07)',
    border: '1px solid rgba(255,109,77,0.22)',
    color: '#FF6D4D',
    hoverShadow: '0 8px 32px rgba(255,109,77,0.15)',
  },
  cyan: {
    background: 'rgba(65,234,255,0.06)',
    border: '1px solid rgba(65,234,255,0.22)',
    color: '#41EAFF',
    hoverShadow: '0 8px 32px rgba(65,234,255,0.12)',
  },
}

export default function TagsRow() {
  return (
    <div className="flex flex-wrap justify-center" style={{ gap: '0.75rem', marginTop: '2.5rem' }}>
      {tags.map((tag, i) => {
        const v = variants[tag.variant]
        return (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: i * 0.08,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 18px 9px 12px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              borderRadius: '9999px',
              background: v.background,
              border: v.border,
              color: v.color,
              cursor: 'default',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.background = v.hoverBg || v.background
              if (v.hoverBorder) e.currentTarget.style.borderColor = v.hoverBorder
              e.currentTarget.style.boxShadow = v.hoverShadow
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.background = v.background
              if (v.hoverBorder) e.currentTarget.style.borderColor = v.border.split(' ')[1] || v.border
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {tag.svg}
            {tag.label}
          </motion.span>
        )
      })}
    </div>
  )
}
