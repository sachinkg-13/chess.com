import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-sidebar-bg border border-gray-700 rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          {title}
        </h2>
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
}
