const variants = {
  primary: 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.97]',
  secondary: 'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:scale-[1.03] active:scale-[0.97]',
  accent: 'bg-gradient-to-r from-accent-dark to-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.03] active:scale-[0.97]',
  outline: 'border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 hover:scale-[1.02] active:scale-[0.98]',
  ghost: 'text-text-light hover:bg-surface-alt hover:text-primary',
  danger: 'bg-gradient-to-r from-danger to-danger-light text-white shadow-lg shadow-danger/25 hover:shadow-xl hover:shadow-danger/30 hover:scale-[1.03] active:scale-[0.97]',
  glass: 'glass text-text hover:shadow-medium hover:scale-[1.02] active:scale-[0.98]',
}

const sizes = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
  xl: 'px-9 py-4 text-lg',
}

export default function Button({ variant = 'primary', size = 'md', loading = false, className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  )
}
