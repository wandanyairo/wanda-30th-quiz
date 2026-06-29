import { useState } from 'react'

const SCAMMERS = [
  { name: 'Anna Delvey', desc: 'No explanation needed' },
  { name: 'Doris Payne', desc: 'Jewelry Heist Queen' },
  { name: 'Jho Low', desc: 'Sovereign Funds' },
  { name: 'Razzlekhan', desc: 'Crypto' },
  { name: 'Imelda Marcos', desc: 'Politics' },
  { name: 'Nirav Modi', desc: 'Jewelry Innovator' },
  { name: 'Richard Vallières', desc: 'Maple Syrup' },
  { name: 'Rita Crundwell', desc: 'Comptroller Horse Lady' },
  { name: 'Rudy Kurniawan', desc: 'WINE' },
  { name: 'Shaman Durek Verrett', desc: 'Romance etc.' },
]

export default function ScammerHint() {
  const [open, setOpen] = useState(false)
  return (
    <div className="scammer-hint">
      <button className="scammer-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '▲ Hide examples' : '▼ Some of my favourite scammers'}
      </button>
      {open && (
        <ul className="scammer-list">
          {SCAMMERS.map(s => (
            <li key={s.name}>
              <strong>{s.name}</strong> — {s.desc}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
