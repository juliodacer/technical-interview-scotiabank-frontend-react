import "./ErrorState.css";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export const ErrorState = ({
  message = "Ocurrió un error al cargar los datos",
  onRetry,
  onSecondaryAction,
  secondaryActionLabel = "Volver",
}: ErrorStateProps) => {
  return (
    <div
      className="error-state"
      role="alert"
      aria-live="assertive"
      aria-label={message}
    >
      <div className="error-icon" aria-hidden="true">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="error-message">{message}</p>
      <div className="error-actions">
        <button
          onClick={onRetry}
          className="error-retry-button"
          aria-label="Reintentar carga"
        >
          Reintentar
        </button>
        {onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="error-secondary-button"
            aria-label={secondaryActionLabel}
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
