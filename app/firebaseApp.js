import { initializeApp } from "firebase/app";
import firebaseConfig from "./environment/firebase.js";
import testingFirebaseConfig from "./environment/firebaseTesting.js";

export default (process.env.NODE_ENV || "development") === "production"
    ? initializeApp(firebaseConfig)
    : initializeApp(testingFirebaseConfig);
