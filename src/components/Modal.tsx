"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  dismissible?: boolean;
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  dismissible = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => {
        if (!dismissible) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/40 opacity-0
          animate-[fadeIn_150ms_ease-out_forwards]
        `}
      />

      {/* Card */}
      <div
        ref={dialogRef}
        className={`
          relative w-full max-w-lg rounded-xl bg-white shadow-lg
          opacity-0 translate-y-2 scale-95
          animate-[modalIn_180ms_cubic-bezier(0.22,1,0.36,1)_forwards]
        `}
      >
        <div className="border-b px-5 py-3 flex items-center justify-between">
          <h2 id="modal-title" className="font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="border-t px-5 py-3">{footer}</div>}
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes modalIn { to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
