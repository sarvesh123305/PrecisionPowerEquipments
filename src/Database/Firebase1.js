import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvd0GaZnti1MrjrVqmUPN5SvvVt7Krn6U",
  authDomain: "precisionpowerequipments-18edd.firebaseapp.com",
  databaseURL:
    "https://precisionpowerequipments-18edd-default-rtdb.firebaseio.com",
  projectId: "precisionpowerequipments-18edd",
  storageBucket: "precisionpowerequipments-18edd.appspot.com",
  messagingSenderId: "952140866861",
  appId: "1:952140866861:web:bd0db993737afc270d1fa4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
