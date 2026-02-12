import "./EmptyState.css";

interface EmptyStateProps {
  message?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  message = "No se encontraron resultados",
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div
      className="empty-state"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="empty-icon" aria-hidden="true">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <div className="empty-content">
        <p className="empty-message">{message}</p>
        {description && <p className="empty-description">{description}</p>}
      </div>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="empty-action-button"
          aria-label={actionLabel}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
