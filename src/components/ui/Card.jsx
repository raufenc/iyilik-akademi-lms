export default function Card({ className = '', children, ...props }) {
  return (
    <div className={`bg-white rounded-xl border border-border p-5 ${className}`} {...props}>
      {children}
    </div>
  )
}
