import { ref, update } from "firebase/database";
import db from "./connection.js";
import names from "./namesTest.js";

Promise.all(names.map((name) => seedUserData(name))).then((TorFs) => {
    TorFs.every((x) => x)
        ? (() => {
              console.log("Something something it went right");
              process.exit();
          })()
        : (() => {
              console.log("It went very very wrong");
              process.exit();
          })();
});

export function seedUserData(
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
    created_at
) {
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
    })
        .then(() => true)
        .catch(() => false);
}
