// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyCWdbuE1wFGxy4b60CJ-_3y6ixcaDZR_YA",
  authDomain: "class-point-one.firebaseapp.com",
  projectId: "class-point-one",
  storageBucket: "class-point-one.firebasestorage.app",
  messagingSenderId: "642056614271",
  appId: "1:642056614271:web:ca43c78797d47c7cd72a4a",
  measurementId: "G-7YN5CVBTSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Export for use in other files
window.firebaseStorage = {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject
};