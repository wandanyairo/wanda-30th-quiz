import { useState, useRef } from 'react'

export default function RankQuestion({ options: initialOptions, value, onChange }) {
  const [items, setItems] = useState(() =>
    value?.length ? value : initialOptions.map(o => o.id)
  )
  const dragItem = useRef(null)
  const dragOver = useRef(null)

  function getOption(id) {
    return initialOptions.find(o => o.id === id)
  }

  function move(index, direction) {
    const next = [...items]
    const swapIndex = index + direction
    if (swapIndex < 0 || swapIndex >= next.length) return
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
    setItems(next)
    onChange(next)
  }

  function onDragStart(index) {
    dragItem.current = index
  }

  function onDragEnter(index) {
    dragOver.current = index
  }

  function onDragEnd() {
    const next = [...items]
    const dragged = next.splice(dragItem.current, 1)[0]
    next.splice(dragOver.current, 0, dragged)
    dragItem.current = null
    dragOver.current = null
    setItems(next)
    onChange(next)
  }

  return (
    <ol className="rank-list">
      {items.map((id, index) => {
        const opt = getOption(id)
        return (
          <li
            key={id}
            className="rank-item"
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={onDragEnd}
            onDragOver={e => e.preventDefault()}
          >
            <span className="rank-number">{index + 1}</span>
            {opt.image && (
              <img
                className="rank-image"
                src={opt.image}
                alt={opt.label}
              />
            )}
            <span className="rank-label">{opt.label}</span>
            <div className="rank-arrows">
              <button
                className="rank-arrow"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >▲</button>
              <button
                className="rank-arrow"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >▼</button>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
