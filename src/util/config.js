import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQg9zaW72GNiSESI2d0ovs28oExq2_VKY",
  authDomain: "olx-clone-5b9c8.firebaseapp.com",
  projectId: "olx-clone-5b9c8",
  storageBucket: "olx-clone-5b9c8.firebasestorage.app",
  messagingSenderId: "438247963254",
  appId: "1:438247963254:web:60cb86e181ca1896437d57",
  measurementId: "G-0NYSDT93TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app)

export { app, auth, firestore, storage,db };
