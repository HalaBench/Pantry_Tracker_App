"use client";

import React from 'react';

interface AddItemsFormProps {
  handleAddItem: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemName: string;
  setItemName: React.Dispatch<React.SetStateAction<string>>;
  itemQuantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  itemCategory: string;
  setItemCategory: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
}

export default function AddItemsForm({
  handleAddItem,
  handleImageUpload,
  itemName,
  setItemName,
  itemQuantity,
  setItemQuantity,
  itemCategory,
  setItemCategory,
  isEditing,
}: AddItemsFormProps) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(Number(e.target.value))}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded w-full">
        {isEditing ? 'Update Item' : 'Add Item'}
      </button>
    </div>
  );
}
