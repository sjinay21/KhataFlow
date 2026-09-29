export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-500',
    danger: 'bg-danger-500 text-white hover:bg-red-600 focus:ring-danger-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    link: 'bg-transparent text-primary-600 hover:underline p-0 focus:ring-primary-500',
    // Added inverse variant because passing conflicting color classes via className 
    // without tailwind-merge caused the text to remain white on a white background.
    inverse: 'bg-white text-primary-600 hover:bg-slate-50 focus:ring-slate-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = variant === 'link' ? '' : sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
