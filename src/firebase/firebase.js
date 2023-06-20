import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8dNde9i_cqtRGsZz_ddqL18hpCwKpvjw",
  authDomain: "th-anniversary-app.firebaseapp.com",
  databaseURL: "https://th-anniversary-app-default-rtdb.firebaseio.com",
  projectId: "th-anniversary-app",
  storageBucket: "th-anniversary-app.appspot.com",
  messagingSenderId: "238744967688",
  appId: "1:238744967688:web:37fb50cc7347a840d64fbd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const firestore = getFirestore(app);
