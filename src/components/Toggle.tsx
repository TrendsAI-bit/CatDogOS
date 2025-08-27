'use client'

interface ToggleProps {
  active: boolean
  onChange: (active: boolean) => void
}

export default function Toggle({ active, onChange }: ToggleProps) {
  return (
    <button
      className={`mac-toggle ${active ? 'active' : ''}`}
      onClick={() => onChange(!active)}
      type="button"
      role="switch"
      aria-checked={active}
    />
  )
}
