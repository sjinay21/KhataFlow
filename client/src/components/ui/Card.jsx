export default function Card({ children, className = '', noPadding = false }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
}
