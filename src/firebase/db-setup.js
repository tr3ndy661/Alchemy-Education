import { dbAPI } from './firestore';

const setupUserInDB = async (userId, userData) => {
    try {
        // Create a user document with custom fields
        await dbAPI.create('users', {
            id: userId,
            email: userData.email,
            username: userData.username,
            createdAt: new Date().toISOString(),
            profile: {
                avatarUrl: '',
                bio: ''
            }
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

const createInitialCollections = async () => {
    try {
        await dbAPI.create('posts', {
            title: 'Welcome',
            content: 'Welcome to our platform!',
            createdAt: new Date().toISOString(),
            authorId: 'admin'
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

export { setupUserInDB, createInitialCollections };
