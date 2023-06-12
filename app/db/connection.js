import { initializeApp } from "firebase/app";
import firebaseConfig from "../environment/firebase.js";
import testingFirebaseConfig from "../environment/firebaseTesting.js";
import { getDatabase } from "firebase/database"


const ENV = process.env.NODE_ENV || 'production'

let db;

if (ENV === 'production') {
    db = getDatabase(initializeApp(firebaseConfig))
} else {
    db = getDatabase(initializeApp(testingFirebaseConfig))
}

export default db; 
