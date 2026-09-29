export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            block w-full rounded-md border 
            ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500'} 
            ${leftIcon ? 'pl-10' : 'pl-3'} 
            ${rightIcon ? 'pr-10' : 'pr-3'} 
            py-2 bg-transparent text-slate-900 focus:outline-none focus:ring-1 sm:text-sm transition-colors
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-danger-500 mt-1" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
