import app from './firebaseApp.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import db from './db/connection.js';
import { update, ref, get, child } from 'firebase/database';

const auth = getAuth(app);
const refDB = ref(db);

export const postLoginDetails = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      signOut(auth);
      return userCredential.user.uid;
    }
  );
};

export const postUser = ({ email, password, name }) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      return update(refDB, {
        ['users/' + userCredential.user.uid]: {
          uid: userCredential.user.uid,
          name: name,
          email: email,
          location: { Latitude: '', Longtitude: '' },
          avatar_image: '',
          starred_maps: '',
          current_maps: '',
          maps_completed: '',
          referred: 0,
          modified: Date.now(),
          active: true,
          created_at: Date.now(),
        },
      }).then(() => {
        signOut(auth);
        return userCredential.user.uid;
      });
    }
  );
};

export const fetchMaps = () => {
  return get(child(refDB, 'maps'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
