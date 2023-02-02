import { initializeApp } from "firebase/app";
import {
  collection as fbcollection,
  doc as fbdoc,
  type DocumentData,
  type DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const collection = (path: string, ...pathSegments: string[]) =>
  fbcollection(firestore, path, ...pathSegments);

export const doc = <T = DocumentData>(
  path: string,
  ...pathSegments: string[]
) => fbdoc(firestore, path, ...pathSegments) as DocumentReference<T>;

export { getDocs, getDoc, updateDoc, setDoc };
