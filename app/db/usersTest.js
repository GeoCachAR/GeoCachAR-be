const users = ["Emma", "Liam", "Olivia"];
export default users.map((user, index) => {
  return {
    uid: index,
    name: user,
    email: "email@email.com",
    location: { Latitude: "", Longtitude: "" },
    avatar_image: "",
    starred_maps: {},
    current_maps: {},
    maps_completed: {},
    referred: 0,
    modified: Date.now(),
    active: true,
    created_at: Date.now(),
  };
});
