"use client";


import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';


export default function Home() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemCategory, setItemCategory] = useState(''); // New state for category
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [pantryItems, setPantryItems] = useState<DocumentData[]>([]); // Explicitly type as DocumentData[]

  useEffect(() => {
    // Fetch pantry items from Firestore
    const fetchPantryItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pantryItems'));
        const items = querySnapshot.docs.map((doc) => doc.data());
        setPantryItems(items);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    };

    fetchPantryItems();
  }, []);

  // Function to handle adding an item to Firestore
  const handleAddItem = async () => {
    try {
      // Add the item to Firestore
      await addDoc(collection(db, 'pantryItems'), {
        name: itemName,
        quantity: itemQuantity,
        category: itemCategory,
        image: itemImage,
      });

      // Clear input fields after adding
      setItemName('');
      setItemQuantity(0);
      setItemCategory('');
      setItemImage(null);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImage(reader.result as string); // Set base64-encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full ">
        <h1 className="text-6xl">Pantry Tracker App</h1>
      </div>

      {/* Add input fields for item name and quantity */}
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(Number(e.target.value))}
      />

      {/* Add input field for item category */}
      <input
        type="text"
        placeholder="Category"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />

      {/* Add input field for item image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />


      {/* Button to add item */}
      <button onClick={handleAddItem}>Add Item</button>

      {/* Display the pantry items */}
      <div>
        {pantryItems.map((item, index) => (
          <div key={index}>
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Category: {item.category}</p>
            {item.image && <img src={item.image} alt={item.name} />}
          </div>
        ))}
      </div>
    </main>
  );
}