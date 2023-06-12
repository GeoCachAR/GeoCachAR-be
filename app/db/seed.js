import { ref, update } from "firebase/database";
import db from "./connection.js";
import users from "./usersTest.js";
import maps from "./mapTest.js";

Promise.all(
  users
    .map((user) => seedUserData(user))
    .concat(maps.map((map) => seedMapData(map)))
).then((TorFs) => {
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
  })
    .then(() => true)
    .catch(() => false);
}

export function seedMapData({ mapID, waypoints, location }) {
  const { title, description, Latitude, Longtitude } = waypoints;

  return update(ref(db), {
    ["/maps/" + mapID]: {
      location: location,
      waypoints: {
        title: title,
        description: description,
        Latitude: Latitude,
        Longtitude: Longtitude,
      },
    },
  })
    .then(() => true)
    .catch(() => false);
}
