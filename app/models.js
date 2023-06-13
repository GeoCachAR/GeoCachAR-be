import app from "./firebaseApp.js";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

export const postLoginDetails = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
            signOut(auth);
            return userCredential.user.uid;
        }
    );
};

export const postUser = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then
    (
        (userCredential) => {
            signOut(auth);
            return userCredential.user.uid;
        }
    );
}


