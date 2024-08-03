"use client";

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';
import AddItemsForm from './components/AddItemsForm';
import PantryItemsList from './components/PantryItemsList';

export default function Home() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [pantryItems, setPantryItems] = useState<DocumentData[]>([]);

  useEffect(() => {
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

  const handleAddItem = async () => {
    try {
      await addDoc(collection(db, 'pantryItems'), {
        name: itemName,
        quantity: itemQuantity,
        category: itemCategory,
        image: itemImage,
      });

      setItemName('');
      setItemQuantity(0);
      setItemCategory('');
      setItemImage(null);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full ">
        <h1 className="text-6xl">Pantry Tracker App</h1>
      </div>

      <AddItemsForm
        handleAddItem={handleAddItem}
        handleImageUpload={handleImageUpload}
        itemName={itemName}
        setItemName={setItemName}
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
        itemCategory={itemCategory}
        setItemCategory={setItemCategory}
      />

      <PantryItemsList pantryItems={pantryItems} />
    </main>
  );
}
