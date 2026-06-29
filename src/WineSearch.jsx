import { useState } from 'react'

const WINES = [
  'Albariño', 'Amarone', 'Barbera', 'Barolo', 'Beaujolais', 'Blanc de Blancs',
  'Blanc de Noirs', 'Bordeaux Blend', 'Brunello di Montalcino', 'Burgundy',
  'Cabernet Franc', 'Cabernet Sauvignon', 'Carménère', 'Cava', 'Chardonnay',
  'Châteauneuf-du-Pape', 'Chenin Blanc', 'Chianti', 'Côtes du Rhône',
  'Crémant', 'Dolcetto', 'Fino Sherry', 'Furmint', 'Gamay', 'Garnacha',
  'Gewürztraminer', 'Glera (Prosecco)', 'Grüner Veltliner', 'Lambrusco',
  'Malbec', 'Marsala', 'Mencía', 'Merlot', 'Montepulciano', 'Moscato',
  'Mourvèdre', 'Muscadet', 'Nebbiolo', 'Nero d\'Avola', 'Orange Wine',
  'Pét-Nat', 'Pinot Blanc', 'Pinot Grigio', 'Pinot Gris', 'Pinot Meunier',
  'Pinot Noir', 'Pinotage', 'Port', 'Primitivo', 'Prosecco', 'Ribera del Duero',
  'Riesling', 'Rioja', 'Rosé', 'Sangiovese', 'Sauternes', 'Sauvignon Blanc',
  'Sherry', 'Shiraz', 'Silvaner', 'Soave', 'Syrah', 'Tempranillo', 'Torrontés',
  'Valpolicella', 'Vermentino', 'Viognier', 'White Burgundy', 'White Zinfandel',
  'Zinfandel',
]

export default function WineSearch({ value, onChange }) {
  const [wineChoice, setWineChoice] = useState(value?.wine || '')
  const [why, setWhy] = useState(value?.why || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)

  function handleWineInput(e) {
    const q = e.target.value
    setWineChoice(q)
    onChange({ wine: q, why })
    if (q.trim().length < 1) {
      setSuggestions([])
      setOpen(false)
      return
    }
    const matches = WINES.filter(w => w.toLowerCase().includes(q.toLowerCase()))
    setSuggestions(matches.slice(0, 6))
    setOpen(matches.length > 0)
  }

  function handleSelect(wine) {
    setWineChoice(wine)
    onChange({ wine, why })
    setSuggestions([])
    setOpen(false)
  }

  function handleWhyChange(e) {
    setWhy(e.target.value)
    onChange({ wine: wineChoice, why: e.target.value })
  }

  return (
    <div className="wine-search">
      <div className="city-search">
        <input
          className="quiz-textarea"
          style={{ resize: 'none' }}
          type="text"
          placeholder="Search for a wine…"
          value={wineChoice}
          onChange={handleWineInput}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          autoComplete="off"
          autoFocus
        />
        {open && (
          <ul className="city-suggestions">
            {suggestions.map((w, i) => (
              <li key={i} className="city-suggestion-item" onMouseDown={() => handleSelect(w)}>
                {w}
              </li>
            ))}
          </ul>
        )}
      </div>
      {wineChoice.trim() && (
        <textarea
          className="quiz-textarea"
          placeholder="…and why?"
          value={why}
          onChange={handleWhyChange}
          rows={3}
        />
      )}
    </div>
  )
}
