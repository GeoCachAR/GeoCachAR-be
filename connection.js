import { initializeApp } from "firebase/app";
import firebaseConfig from "./environment/firebase";
import testingFirebaseConfig from "./environment/firebaseTesting";

const ENV = process.env.NODE_ENV || 'production'

if (ENV === 'production') {
    module.exports = initializeApp(firebaseConfig)
} else {
    module.exports = initializeApp(testingFirebaseConfig)
}

