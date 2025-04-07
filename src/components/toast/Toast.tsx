import React, { useEffect } from "react";

interface ToastProps {
  message: string; // The message to display in the toast
  show: boolean; // Whether the toast is visible
  onClose: () => void; // Callback to close the toast
  duration?: number; // Optional: Duration in milliseconds before the toast hides automatically
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close the toast after the duration
      }, duration);

      return () => clearTimeout(timer); // Cleanup the timer on unmount or when `show` changes
    }
  }, [show, onClose, duration]);

  return (
    <div
      className={`toast-container position-fixed bottom-0 end-0 p-3`}
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast align-items-center text-bg-primary ${show ? "show" : "hide"}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose} // Close the toast manually
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;