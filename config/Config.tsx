
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDt68HPP-fO4EXNhiQgqzRiwedi0wAK5Zk",
  authDomain: "app-1-45d7b.firebaseapp.com",
  databaseURL: "https://app-1-45d7b-default-rtdb.firebaseio.com",
  projectId: "app-1-45d7b",
  storageBucket: "app-1-45d7b.appspot.com",
  messagingSenderId: "890984403517",
  appId: "1:890984403517:web:f2b87e4c8d6e3911cc1054"
};

 const app = initializeApp(firebaseConfig);
 export const db = getDatabase(app);
 export const auth = getAuth(app);
 export const storage = getStorage(app);