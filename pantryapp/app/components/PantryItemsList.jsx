"use client";

import React from 'react';

export default function PantryItemsList({ pantryItems }) {
  return (
    <div className="w-full mt-8 grid grid-cols-1 gap-4">
      {pantryItems.map((item, index) => (
        <div key={index} className="grid grid-cols-4 items-center border-b py-2">
          {item.image && (
            <div className="col-span-1 flex justify-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            </div>
          )}
          <div className="col-span-3 grid grid-cols-3 gap-1">
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-gray-500">Category: {item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
