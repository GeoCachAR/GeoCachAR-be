import { ref, update } from "firebase/database";
import db from "./connection.js";
import users from "./usersTest.js";
import maps from "./mapTest.js";

Promise.all(
    users
        .map((user) => seedUserData(user))
        .concat(maps.map((map) => seedMapData(map)))
);

export function seedUserData({
    uid,
    name,
    email,
    location,
    avatar_image,
    starred_maps,
    current_maps,
    maps_completed,
    referred,
    modified,
    active,
    created_at,
}) {
    return update(ref(db), {
        ["users/" + uid]: {
            name,
            email,
            location,
            avatar_image,
            starred_maps,
            current_maps,
            maps_completed,
            referred,
            modified,
            active,
            created_at,
        },
    });
}

export function seedMapData({ mapID, waypoints, location }) {

    return update(ref(db), {
        ["/maps/" + mapID]: {
            location: location,
            waypoints, 
        },
    });
}
