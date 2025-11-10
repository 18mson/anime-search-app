import { FiAlertCircle, FiX } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-xl p-4 flex items-start gap-3 mb-6" data-testid="error-message">
      <FiAlertCircle className="text-red-400 text-xl shrink-0 mt-0.5" />
      <p className="text-red-100 flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-300 hover:text-red-100 transition-colors shrink-0"
          aria-label="Close error message"
        >
          <FiX className="text-xl" />
        </button>
      )}
    </div>
  );
};
