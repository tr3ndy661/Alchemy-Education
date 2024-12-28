import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config object here
  apiKey: "AIzaSyBblXNF0vOR51ixpmd-6fqUFTv72w8pVAk",
  authDomain: "alchemy-e7f38.firebaseapp.com",
  projectId: "alchemy-e7f38",
  storageBucket: "alchemy-e7f38.firebasestorage.app",
  messagingSenderId: "50908763714",
  appId: "1:50908763714:web:920eefceaba2e289a4bfdb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
