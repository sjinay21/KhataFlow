import Button from './Button';

export default function Modal({ isOpen, onClose, title, children, footer, className = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal panel */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative bg-white rounded-xl shadow-xl w-full max-w-lg transform transition-all flex flex-col max-h-[90vh] ${className}`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 id="modal-title" className="text-lg font-medium text-slate-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
          >
            <span className="sr-only">Close panel</span>
            {/*
            Old implementation:
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reason for replacement:
            The SVG path was only being used for a simple X/close icon.
            A simpler text implementation keeps the UI code readable and requires less code.
            */}
            <span className="text-2xl leading-none font-light w-6 h-6 flex items-center justify-center" aria-hidden="true">&times;</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
