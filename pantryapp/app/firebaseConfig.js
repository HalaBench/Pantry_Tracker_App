// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMGgzaHnD0q2em-De74kuzZnjPfQjOXGg",
  authDomain: "pantryapp-b0396.firebaseapp.com",
  projectId: "pantryapp-b0396",
  storageBucket: "pantryapp-b0396.appspot.com",
  messagingSenderId: "911785347707",
  appId: "1:911785347707:web:48b8d1200b04f76c4170de",
  measurementId: "G-290G1MD5J0"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};