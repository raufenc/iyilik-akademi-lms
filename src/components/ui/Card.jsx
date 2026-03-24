export default function Card({ className = '', hover = false, glass = false, children, ...props }) {
  const base = glass
    ? 'glass rounded-2xl p-6'
    : 'bg-white dark:bg-dark-card rounded-2xl border border-border-light dark:border-dark-border p-6 shadow-soft dark:shadow-dark-soft'

  const hoverClass = hover
    ? 'card-hover-lift cursor-pointer'
    : ''

  return (
    <div className={`${base} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
