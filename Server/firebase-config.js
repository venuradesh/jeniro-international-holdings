import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPQpeYrEXp0dBrlek9aWj4_QELijSzflw",
  authDomain: "jeniro-international-holdings.firebaseapp.com",
  projectId: "jeniro-international-holdings",
  storageBucket: "jeniro-international-holdings.appspot.com",
  messagingSenderId: "248447277214",
  appId: "1:248447277214:web:f9edc522ccf95484fe838f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
