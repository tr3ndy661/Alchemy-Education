import { 
    collection, 
    addDoc, 
    getDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    where 
} from 'firebase/firestore';
import { db } from './firebase-config';  // Updated path to match the actual filename

export const dbAPI = {
    // Create a new document in a collection
    create: async (collectionName, data) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), data);
            return { id: docRef.id, error: null };
        } catch (error) {
            return { id: null, error: error.message };
        }
    },

    // Get a document by ID
    get: async (collectionName, id) => {
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
            }
            return { data: null, error: 'Document not found' };
        } catch (error) {
            return { data: null, error: error.message };
        }
    },

    // Get all documents from a collection
    getAll: async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return { data: documents, error: null };
        } catch (error) {
            return { data: null, error: error.message };
        }
    },

    // Update a document
    update: async (collectionName, id, data) => {
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, data);
            return { error: null };
        } catch (error) {
            return { error: error.message };
        }
    },

    // Delete a document
    delete: async (collectionName, id) => {
        try {
            const docRef = doc(db, collectionName, id);
            await deleteDoc(docRef);
            return { error: null };
        } catch (error) {
            return { error: error.message };
        }
    },

    // Query documents
    query: async (collectionName, fieldPath, operator, value) => {
        try {
            const q = query(collection(db, collectionName), where(fieldPath, operator, value));
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return { data: documents, error: null };
        } catch (error) {
            return { data: null, error: error.message };
        }
    }
};
