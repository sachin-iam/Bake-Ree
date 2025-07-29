import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  message,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay (light transparent instead of solid black) */}
      <div
        className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog box */}
      <div className="relative bg-white rounded-lg shadow-xl z-50 p-6 w-[90%] max-w-sm">
        <p className="text-gray-800 text-sm mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
