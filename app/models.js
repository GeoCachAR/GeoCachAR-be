import app from "./firebaseApp.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

const postLoginDetails = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
            signOut(auth);
            return userCredential.user.uid;
        }
    );
};

export default postLoginDetails;
