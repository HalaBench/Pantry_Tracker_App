"use client";

import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

export default function PantryItemsList({ pantryItems, handleDeleteItem, handleEditItem, setShowAddForm, onImageClick }) {
  return (
    <section className='flex flex-col items-center justify-center'>
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-blue-500 text-white p-2 rounded self-end"
      >
        Add an Item
      </button>
      <div className="container w-full mt-8 grid grid-cols-1 gap-4">

        {pantryItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">No items in the pantry.</p>
          </div>
        ) : (
          pantryItems.map((item, index) => (
            <div key={index} className="grid grid-cols-4 items-center hover:bg-green-500 border-b py-2 px-7">
              {item.image && (
                <div className="col-span-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                    onClick={() => onImageClick(item.image)}
                  />
                </div>
              )}
              <div className="col-span-2 grid grid-cols-3 gap-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-500">Category: {item.category}</p>
              </div>
              <div className='flex gap-10'>
                <EditButton onClick={() => handleEditItem(item)} />
                <DeleteButton id={item.id} handleDeleteItem={handleDeleteItem} />
              </div>
            </div>
          ))
        )}
      </div>
    </section>

  );
}
