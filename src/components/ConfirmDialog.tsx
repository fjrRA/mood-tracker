"use client";

import Modal from "./Modal";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Konfirmasi",
  description = "Apakah Anda yakin?",
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal open={open} onClose={onCancel} title={title} dismissible={false}>
      <p className="text-gray-700">{description}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1.5 rounded border">
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-1.5 rounded bg-red-600 text-white"
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
