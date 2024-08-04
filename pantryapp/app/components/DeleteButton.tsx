"use client";

import React from 'react';

export default function DeleteButton({ id, handleDeleteItem }: { id: number, handleDeleteItem: (id: number) => void }) {
  return (
    <button
      onClick={() => handleDeleteItem(id)}
      className="bg-red-500 text-white px-10 py-2 rounded"
    >
      Delete
    </button>
  );
}
