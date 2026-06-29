import { useState, useRef, useEffect } from 'react'

export default function CitySearch({ value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const debounceTimer = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleInput(e) {
    const val = e.target.value
    setQuery(val)
    onChange(val)
    clearTimeout(debounceTimer.current)
    if (val.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&addressdetails=1&limit=6&featuretype=city`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await res.json()
        const cities = data
          .filter(r => ['city', 'town', 'village', 'municipality'].includes(r.addresstype) || r.type === 'city' || r.class === 'place')
          .map(r => {
            const parts = [r.address?.city || r.address?.town || r.address?.village || r.name]
            if (r.address?.state) parts.push(r.address.state)
            if (r.address?.country) parts.push(r.address.country)
            return { display: parts.filter(Boolean).join(', '), raw: r }
          })
          .filter((v, i, arr) => arr.findIndex(x => x.display === v.display) === i)
        setSuggestions(cities)
        setOpen(cities.length > 0)
      } catch {
        setSuggestions([])
        setOpen(false)
      }
    }, 300)
  }

  function handleSelect(display) {
    setQuery(display)
    onChange(display)
    setSuggestions([])
    setOpen(false)
  }

  return (
    <div className="city-search" ref={containerRef}>
      <input
        className="quiz-textarea"
        style={{ resize: 'none' }}
        type="text"
        placeholder="Start typing your city…"
        value={query}
        onChange={handleInput}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        autoFocus
        autoComplete="off"
      />
      {open && (
        <ul className="city-suggestions">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="city-suggestion-item"
              onMouseDown={() => handleSelect(s.display)}
            >
              {s.display}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
