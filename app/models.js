import app from "./firebaseApp.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import db from "./db/connection.js";
import { update, ref, get, child, remove } from "firebase/database";

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
        ["users/" + userCredential.user.uid]: {
          uid: userCredential.user.uid,
          name: name,
          email: email,
          location: { Latitude: "", Longtitude: "" },
          avatar_image: "",
          starred_maps: "",
          current_maps: "",
          maps_completed: "",
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
  return get(child(refDB, "maps"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchMapById = (mapId) => {
  return get(child(refDB, `maps/${mapId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return Promise.reject({
        msg: `Error, map not found`,
        code: 404,
      });
    }
  });
};

export const removeUser = (deleteId, { email, password }) => {
  return new Promise((resolve, reject) => {
    resolve(
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          return userCredential.user.uid;
        })
        .then(() => {
          const user = auth.currentUser;
          return deleteUser(user).then(() => {});
        })
        .then(() => {
          const taskRef = ref(db, "users/" + deleteId);
          return remove(taskRef).then(() => {
            return Promise.resolve();
          });
          return new Promise((resolve, reject) => {
            resolve(
              remove(taskRef).then(() => {
                console.log("user deleted from our db hopefully");
              })
            );
          });
        })
    );
  });
};

// export const testingLoggedInUser = (auth, email, password,name) => {
//   console.log("auth.currentUser:", auth.currentUser);
// };
// const user = auth.currentUser;
// export const removeUser = () => {
//   deleteUser(user)
//     .then(() => {
//       console.log("User deleted from firebase auth");
//     })
//     .catch((error) => {
//       // An error ocurred
//       // ...
//     });
// };
