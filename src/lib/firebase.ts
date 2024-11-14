import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  sendEmailVerification, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4UkOTaou_ESlSB6CUlf60T0kAVNfC6IA",
  authDomain: "cybercop-search-engine.firebaseapp.com",
  projectId: "cybercop-search-engine",
  storageBucket: "cybercop-search-engine.firebasestorage.app",
  messagingSenderId: "283111165000",
  appId: "1:283111165000:web:c70be18250cdc046841c7d",
  measurementId: "G-1YP5EM7EJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enhanced error handling for auth operations
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(result.user, {
      url: window.location.origin + '/dashboard',
      handleCodeInApp: true,
    });
    return result.user;
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('This email is already registered');
      case 'auth/invalid-email':
        throw new Error('Invalid email address');
      case 'auth/operation-not-allowed':
        throw new Error('Email/password accounts are not enabled');
      case 'auth/weak-password':
        throw new Error('Password should be at least 6 characters');
      default:
        throw new Error('Failed to create account');
    }
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (!result.user.emailVerified) {
      await sendEmailVerification(result.user, {
        url: window.location.origin + '/dashboard',
        handleCodeInApp: true,
      });
      throw new Error('Please verify your email address. A new verification email has been sent.');
    }
    return result.user;
  } catch (error: any) {
    switch (error.code) {
      case 'auth/invalid-email':
        throw new Error('Invalid email address');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled');
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        throw new Error('Invalid email or password');
      default:
        throw error;
    }
  }
};