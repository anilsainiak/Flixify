import { initializeApp } from "firebase/app";
import { getStorage,ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: "netflix-11bc0.firebaseapp.com",
    projectId: "netflix-11bc0",
    storageBucket: "netflix-11bc0.appspot.com",
    messagingSenderId: "134189514896",
    appId: "1:134189514896:web:131b8da95a6a7857d9d815",
    measurementId: "G-664DLR3533"
  };

  const app = initializeApp(firebaseConfig);
  const storage=getStorage();

  export default storage;