const users = ["Emma", "Liam", "Olivia"];
export default users
    .map((user, index) => {
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
            active: false,
            created_at: Date.now(),
        };
    })
    .concat([
        {
            uid: "KvFKEsaFXXVhkRHKUUOX6gXeyMX2",
            name: "Frank",
            email: "email@email.com",
            location: { Latitude: 56.222, Longtitude: -0.002 },
            avatar_image: "https://something.com/something_cool",
            starred_maps: { 5: "titleof5thMap" },
            current_maps: {
                2: {
                    1: true,
                    2: false,
                    3: false,
                    4: false,
                    5: true,
                    6: false,
                },
            },
            maps_completed: {
                1: "titleofMap",
                4: "titleof4thMap",
            },
            referred: 0,
            modified: Date.now(),
            active: false,
            created_at: Date.now(),
        },
    ]);

//password = test123
