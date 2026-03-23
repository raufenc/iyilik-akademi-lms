export default function Card({ className = '', hover = false, glass = false, children, ...props }) {
  const base = glass
    ? 'glass rounded-2xl p-6'
    : 'bg-white rounded-2xl border border-border-light p-6 shadow-soft'

  const hoverClass = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-medium cursor-pointer'
    : ''

  return (
    <div className={`${base} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
