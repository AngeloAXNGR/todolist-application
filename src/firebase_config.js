import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-SdhftSyT-wS1j2PsQFWxIMsKT5G31L4",
  authDomain: "todolist-application-77f88.firebaseapp.com",
  projectId: "todolist-application-77f88",
  storageBucket: "todolist-application-77f88.appspot.com",
  messagingSenderId: "390598114698",
  appId: "1:390598114698:web:0a29ca4eb6b9afd3d8dc73",
  measurementId: "G-MHYG2MZ0LV"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth()
