import app from "./firebaseApp.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    deleteUser,
    updateEmail,
    sendPasswordResetEmail,
} from "firebase/auth";
import db from "./db/connection.js";
import { update, ref, get, child, remove, onValue } from "firebase/database";

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
                })
        );
    });
};

export const updatedUserName = (updateUserID, detailToChange) => {
    const updates = {};
    updates[`users/${updateUserID}/name`] = detailToChange.name;
    return update(refDB, updates).then(() => {
        return detailToChange.name;
    });
};

export const updatedUserEmail = (
    updateUserID,
    { oldEmail, newEmail, password }
) => {
    const updates = {};
    updates[`users/${updateUserID}/email`] = newEmail;
    return update(refDB, updates)
        .then(() => {
            
            return signInWithEmailAndPassword(auth, oldEmail, password);
        })
        .then(({ user }) => {
            
            return updateEmail(user, newEmail);
        })
        .then(() => {
            
            return newEmail;
        });
};

export const updatedUserPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const updateCompletedMaps = (detailsToChange, uid) => {

    return get(
        child(ref(db, `maps/${detailsToChange.completed_map}/mapName`), "/")
    )
        .then((snapshot) => {
            return snapshot.val();
        })
        .then((mapName) => {
            const updates = {};
            updates[
                `users/${uid}/maps_completed/${detailsToChange.completed_map}`
            ] = mapName;

            return update(refDB, updates)
        }).then(()=> {
            return detailsToChange.completed_map
        });
};

export const updateCurrentMap = (detailsToChange, uid) => {

    return get(
        child(ref(db, `maps/${Object.keys(detailsToChange.current_map)[0]}/mapName`), "/")
    )
        .then((snapshot) => {
            return snapshot.val();
        })
        .then((mapName) => {
            const updates = {};
            updates[
                `users/${uid}/current_maps/${Object.keys(detailsToChange.current_map)[0]}`
            ] = mapName;

           return update(refDB, updates)
        }).then(()=> {
            return detailsToChange.current_map
        });
}

export const fetchUserDetails = (uid) => {
    return get (child(refDB, `users/${uid}`), "/")
    .then((snapshot) => {
        if(snapshot.val()) {
            return snapshot.val()
        } else {
            return Promise.reject({
                msg: `Error, user not found`,
                code: 404,
            })
        }
    })
}
