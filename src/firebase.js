import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR1t1uyhmVjSHw5ARkgcM8WJG6CjRsrrA",
  authDomain: "live-poll-ba.firebaseapp.com",
  databaseURL: "https://live-poll-ba-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "live-poll-ba",
  storageBucket: "live-poll-ba.appspot.com",
  messagingSenderId: "977193475729",
  appId: "1:977193475729:web:1d203d4f77fc1fdcfa2930"
};

initializeApp(firebaseConfig);

export const db = getDatabase();
