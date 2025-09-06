
import { getAnalytics } from "firebase/analytics";
import {initializeApp} from "@angular/fire/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACxPHpz6TEWxzP8fTHI5jiAWO6EcszJw0",
  authDomain: "nccc-601ea.firebaseapp.com",
  projectId: "nccc-601ea",
  storageBucket: "nccc-601ea.firebasestorage.app",
  messagingSenderId: "715313693218",
  appId: "1:715313693218:web:91a999730b67803d00007b",
  measurementId: "G-EBW1LMWE0L"
};

export function getFirebaseConfig(): typeof firebaseConfig {
  return firebaseConfig;
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
