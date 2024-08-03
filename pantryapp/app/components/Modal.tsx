"use client";

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
        >
          &times;
        </button>
        <img src={imageSrc} alt="Enlarged" className="max-w-full max-h-screen" />
      </div>
    </div>
  );
};

export default Modal;
