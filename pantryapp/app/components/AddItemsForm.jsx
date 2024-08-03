"use client";

import React from 'react';

export default function AddItemsForm({
  handleAddItem,
  handleImageUpload,
  itemName,
  setItemName,
  itemQuantity,
  setItemQuantity,
  itemCategory,
  setItemCategory,
}) {
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
      <button onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded">
        {itemName ? 'Update Item' : 'Add Item'}
      </button>
    </div>
  );
}
