import "./LoadingState.css";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export const LoadingState = ({
  message = "Cargando...",
  size = "medium",
}: LoadingStateProps) => {
  return (
    <div
      className={`loading-state loading-state-${size}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="loading-spinner" aria-hidden="true"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};
