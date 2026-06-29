import { useState } from 'react'

const SCAMMERS = [
  { name: 'Anna Delvey', desc: 'No explanation needed', url: 'https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TCsorspItqwyYPQSTszLS1RISc0pS61UyEstScvJrAAA2JwMbw&q=anna+delvey+netflix&oq=anna+delvy+&gs_lcrp=EgZjaHJvbWUqEAgBEC4YkQIYsQMYgAQYigUyBggAEEUYOTIQCAEQLhiRAhixAxiABBiKBTINCAIQABiRAhiABBiKBTINCAMQABiRAhiABBiKBTINCAQQABiRAhiABBiKBTILCAUQABgKGAsYgAQyCwgGEC4YChgLGIAEMg4IBxAAGAoYCxixAxiABDILCAgQABgKGAsYgATSAQg0MjU0ajBqOagCBrACAfEFItdepfSJ1kc&sourceid=chrome&ie=UTF-8' },
  { name: 'Doris Payne', desc: 'Jewelry Heist Queen', url: 'https://www.primevideo.com/detail/0R7AH8YV0Q6A2B0R126XHYM8EP' },
  { name: 'Imelda Marcos', desc: 'Politics', url: 'https://www.primevideo.com/detail/0J8SWJH5130NQNS2EBJBCVDZII/ref=atv_sr_fle_c_sr62ef6f_1_1_1?sr=1-1&pageTypeIdSource=ASIN&pageTypeId=B0GX14DZ6Y&qid=1782705302708' },
  { name: 'Jho Low', desc: 'Sovereign Funds', url: 'https://www.netflix.com/title/81735368' },
  { name: 'Nirav Modi', desc: 'Jewelry Innovator', url: 'https://www.netflix.com/title/80990073' },
  { name: 'Razzlekhan', desc: 'Crypto', url: 'https://www.netflix.com/title/81600031' },
  { name: 'Richard Vallières', desc: 'Maple Syrup', url: 'https://podcasts.apple.com/au/podcast/the-great-syrup-swindle/id1616682405?i=1000628872476' },
  { name: 'Rita Crundwell', desc: 'Comptroller Horse Lady', url: 'https://www.amazon.com/All-Queens-Horses-Gene-Biggerstaff/dp/B07BPNGP85' },
  { name: 'Rudy Kurniawan', desc: 'Wine!', url: 'https://podcasts.apple.com/us/podcast/encore-wine-crime/id1616682405?i=1000648537961' },
  { name: 'Shaman Durek Verrett', desc: 'Romance etc.', url: 'https://www.netflix.com/title/81763742' },
]

export default function ScammerHint() {
  const [open, setOpen] = useState(false)
  return (
    <div className="scammer-hint">
      <div className="scammer-header">
        <span className="scammer-label">Some of my favourite scammers</span>
        <button className="scammer-toggle" onClick={() => setOpen(o => !o)}>
          {open ? 'Hide' : 'Show'} <span className={`scammer-caret${open ? ' scammer-caret--open' : ''}`} />
        </button>
      </div>
      {open && (
        <ul className="scammer-list">
          {SCAMMERS.map(s => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="scammer-link">
                {s.name}
              </a>{' '}
              — {s.desc}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
