"use client";

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData } from 'firebase/firestore';
import AddItemsForm from './components/AddItemsForm';
import PantryItemsList from './components/PantryItemsList';
import ImageModal from './components/Modal';

export default function Home() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [pantryItems, setPantryItems] = useState<DocumentData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchPantryItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pantryItems'));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPantryItems(items);
    } catch (error) {
      console.error('Error fetching pantry items:', error);
    }
  };

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const handleAddItem = async () => {
    try {
      if (editingItemId) {
        // Update existing item
        await updateDoc(doc(db, 'pantryItems', editingItemId), {
          name: itemName,
          quantity: itemQuantity,
          category: itemCategory,
          image: itemImage,
        });
        setEditingItemId(null);
      } else {
        // Add new item
        await addDoc(collection(db, 'pantryItems'), {
          name: itemName,
          quantity: itemQuantity,
          category: itemCategory,
          image: itemImage,
        });
      }

      setItemName('');
      setItemQuantity(0);
      setItemCategory('');
      setItemImage(null);

      // Refresh the pantry items list
      fetchPantryItems();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding/editing item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
      fetchPantryItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = (item: DocumentData) => {
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemCategory(item.category);
    setItemImage(item.image);
    setEditingItemId(item.id);
    setShowAddForm(true);
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

  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <main className="container m-auto shadow-xl bg-slate-100 bg-opacity-75 flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex place-items-center before:rounded-full ">
        <h1 className="text-6xl text-green">Pantry Tracker App</h1>
      </div>

      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-full max-w-md"
      />


      {showAddForm && (
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
      )}

      <PantryItemsList
        pantryItems={searchQuery ? filteredItems : pantryItems}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        setShowAddForm={setShowAddForm}
        onImageClick={(imageSrc) => setSelectedImage(imageSrc)}
      />




      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}
