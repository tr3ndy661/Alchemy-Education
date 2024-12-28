import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import app from './config'; // Import the Firebase app instance

const storage = getStorage(app); // Initialize storage with app instance

export const uploadProfilePhoto = async (file) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) throw new Error('No user logged in');

    const storageRef = ref(storage, `profilePhotos/${user.uid}`);
    await uploadBytes(storageRef, file);
    
    const photoURL = await getDownloadURL(storageRef);
    
    // Update user profile with new photo URL
    await updateProfile(user, {
      photoURL: photoURL
    });

    return { photoURL };
  } catch (error) {
    console.error('Error uploading photo:', error);
    return { error: error.message };
  }
};
