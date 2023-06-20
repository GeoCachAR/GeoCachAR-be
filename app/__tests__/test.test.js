import request from "supertest";
import { seedUserData, seedMapData } from "../db/seed.js";
import maps from "../db/mapTest.js";
import users from "../db/usersTest.js";
import app from "../../app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    deleteUser,
    signOut,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { remove, ref } from "firebase/database";
import firebaseApp from "../firebaseApp.js";
import db from "../db/connection.js";

const uids = {
    kieran: "05aeq9C7n0eclKk8FqmOGxeCmfS2",
    "s@s": "uid-here",
    "s3@e": "uid-here",
    t99: "yZ5WmwC8RMbPDYKYDSoeidIcXPs1",
};
/*
const allUsers = [
    { email: "kierantesting@email.com", password: "Coding1" },
    { email: "email@email.com", password: "test123" },
    { email: "usercredential@email.com", password: "Coding1" },
    { email: "test@test.com", password: "Coding1" },
    { email: "test5@test.com", password: "Codin" },
    { email: "itstillgfworksas@test.com", password: "Coding" },
    { email: "s@s.com", password: "123456" },
    { email: "stevie3@email.com", password: "123456" },
    { email: "stevie11@email.com", password: "123456" },
    { email: "thedevelopingdevs@gmail.com", password: "123457" } (varying password)
];
*/
const auth = getAuth(firebaseApp);

beforeAll(() => {
    const toDelete = [
        { email: "usercredential@email.com", password: "Coding1" },
        { email: "itstillgfworksas@test.com", password: "Coding" },
        { email: "stevie10@email.com", password: "123456" },
        // { email: "email@email.com", password: "test123" },
    ];
    const toCreate = [
        { email: "s@s.com", password: "123456" },
        { email: "stevie3@email.com", password: "123456" },
        // { email: "email@email.com", password: "test123" },
    ];
    return Promise.all(
        toDelete.map(
            ({ email, password }) =>
                setTimeout(() =>
                    signInWithEmailAndPassword(auth, email, password)
                        .then(({ user }) => {
                            deleteUser(user);
                            signOut(auth);
                            setTimeout(() => {}, 250);
                            return user.uid;
                        })
                        .catch((err) => {})
                ),
            250
        )
    )
        .then((uids) => remove(ref(db))) // Deletes the database here <<----
        .then(() =>
            Promise.all(
                toCreate.map(({ email, password }) =>
                    createUserWithEmailAndPassword(auth, email, password)
                        .then(({ user }) => {
                            signOut(auth);
                            setTimeout(() => {}, 250);
                            return user.uid;
                        })
                        .catch((err) => {})
                )
            )
        )
        .then((IDs) => {
            uids["s@s"] = IDs[0];
            uids["s3@e"] = IDs[1];
            return users
                .map((user) => seedUserData(user))
                .concat(maps.map((map) => seedMapData(map)));
        })
        .catch((err) => {});
});

beforeEach(() => setTimeout(() => {}, 250));

describe("POST /api/account", () => {
    describe("account", () => {
        test("Should let a user log in", () => {
            const postRequest = {
                email: "kierantesting@email.com",
                password: "Coding1",
            };
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(200)
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toBe(uids["kieran"]);
                });
        });
        test("Should return a 404 not found if the email doesn't exist", () => {
            const postRequest = {
                email: "emali@email.com",
                password: "test123",
            };
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(404)
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Email not found");
                });
        });
        test("should return 403 when the incorrect password is passed ", () => {
            const postRequest = {
                email: "email@email.com",
                password: "1234567",
            };
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(403)
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Incorrect password");
                });
        });
        test("should return 400 when body is formatted incorrectly", () => {
            const postRequest = `email,password\nemail@email.com,1234`;
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(400)
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Invalid body format");
                });
        });
    });
});

describe("api/users", () => {
    describe("post", () => {
        it("should be able to create an account with email password", () => {
            const postRequest = {
                email: "usercredential@email.com",
                password: "Coding1",
                name: "testnowwwwwww",
            };
            return request(app)
                .post("/api/users")
                .send(postRequest)
                .expect(201)
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toEqual(expect.any(String));
                });
        });
        it("should return 403 when an e-mail already exists", () => {
            const postRequest = {
                email: "test@test.com",
                password: "Coding1",
                name: "hello",
            };
            return request(app)
                .post("/api/users")
                .send(postRequest)
                .expect(403)
                .then((response) => {
                    const msg = response.body.msg;
                    expect(msg).toEqual("Email already in use");
                });
        });
        it("should return invalid password and 400 ", () => {
            const postRequest = {
                email: "test5@test.com",
                password: "Codin",
                name: "lksjdf",
            };
            return request(app)
                .post("/api/users")
                .send(postRequest)
                .expect(400)
                .then((response) => {
                    const msg = response.body.msg;
                    expect(msg).toEqual(expect.any(String));
                });
        });
        it("should return an error if the data is formatted incorrectly ", () => {
            const postRequest = `email,password\nemail@test.com,1234`;
            return request(app)
                .post("/api/account")
                .send(postRequest)
                .expect(400)
                .then((response) => {
                    const { msg } = response.body;
                    expect(msg).toBe("Invalid body format");
                });
        });
        it("should accept a username in addition", () => {
            const postRequest = {
                email: "itstillgfworksas@test.com",
                password: "Coding",
                name: "TestUserFinally",
            };
            return request(app)
                .post("/api/users")
                .send(postRequest)
                .expect(201)
                .then((response) => {
                    const { uid } = response.body;
                    expect(uid).toEqual(expect.any(String));
                });
        });
    });
});

describe("GET /api/maps", () => {
    it("should return a list of all maps", () => {
        return request(app)
            .get("/api/maps")
            .expect(200)
            .then((response) => {
                const keys = Object.keys(response.body.maps);
                const testMapObj = {
                    arUrl: expect.any(String),
                    location: {
                        latDelta: 0,
                        latitude: 0,
                        lonDelta: 0,
                        longitude: 0,
                    },
                    mapLocation: "London",
                    mapName: "Geo Map",
                    waypoints: [
                        {
                            latitude: 0,
                            longitude: 0,
                            description: "",
                            code: expect.any(String),
                            title: "clue one",
                        },
                        {
                            latitude: 0,
                            longitude: 0,
                            description: "",
                            code: expect.any(String),
                            title: "clue two",
                        },
                    ],
                };
                expect(keys).toContain("100");
                expect(keys).toContain("101");
                expect(keys).toContain("102");
                expect(response.body.maps[100]).toMatchObject(testMapObj);
            });
    });
});

describe("GET /api/maps/:map_id", () => {
    it("should return the map with the given id", () => {
        return request(app)
            .get("/api/maps/101")
            .expect(200)
            .then((response) => {
                const map = response.body.map;
                const resultMap = {
                    mapName: "Jay Map",
                    mapLocation: "London",
                    arUrl: expect.any(String),
                    waypoints: [
                        {
                            title: "clue one",
                            description: "",
                            latitude: 0,
                            longitude: 0,
                            code: expect.any(String),
                        },
                        {
                            title: "clue two",
                            description: "",
                            latitude: 0,
                            longitude: 0,
                            code: expect.any(String),
                        },
                    ],
                    location: {
                        latitude: 0,
                        longitude: 0,
                        latDelta: 0,
                        lonDelta: 0,
                    },
                };
                expect(map).toEqual(resultMap);
            });
    });
    it("should return a 404 not found if the given id is not currently in use", () => {
        return request(app)
            .get("/api/maps/1000")
            .expect(404)
            .then((response) => {
                const msg = response.body.msg;
                expect(msg).toBe("Error, map not found");
            });
    });
});

describe("DELETE /api/users/:user_id", () => {
    it("should delete the user account", () => {
        const postRequest = {
            email: "s@s.com",
            password: "123456",
        };
        return request(app)
            .delete(`/api/users/${uids["s@s"]}`)
            .send(postRequest)
            .expect(204);
    });
});

describe("PATCH /api/users/:user_id", () => {
    describe("Should update username", () => {
        it("should return updated username", () => {
            const newUserName = {
                name: "terry",
            };
            return request(app)
                .patch(`/api/users/${uids["s@s"]}`)
                .send(newUserName)
                .expect(200)
                .then((response) => {
                    const user = response.body;
                    expect(typeof user.name).toBe("string");
                    expect(user.name).toBe("terry");
                });
        });
    });
    describe("Should update email", () => {
        it("should return updated email", () => {
            const newUserEmail = {
                oldEmail: "stevie3@email.com",
                newEmail: "stevie11@email.com",
                password: "123456",
            };
            return request(app)
                .patch(`/api/users/${uids["s3@e"]}`)
                .send(newUserEmail)
                .expect(200)
                .then((response) => {
                    const user = response.body;
                    expect(typeof user.email).toBe("string");
                    expect(user.email).toBe("stevie11@email.com");
                });
        });
    });
    describe("Should change password", () => {
        test("Should send a reset password email and return 204", () => {
            const newUserPassword = { email: "TheDevelopingDevs@gmail.com" };
            return request(app)
                .patch(`/api/users/${uids["t99"]}`)
                .send(newUserPassword)
                .expect(204);
        });
    });
    describe("Should update completed maps list", () => {
        test("Should return 200 and update maps list for current user", () => {
            const completedMaps = { completed_map: "100" };
            return request(app)
                .patch(`/api/users/${uids["t99"]}`)
                .send(completedMaps)
                .expect(200)
                .then(({ body }) => {
                    const { maps_completed } = body;
                    expect(maps_completed).toBe("100");
                });
        });
    });
});

describe('/api/users/:uid', () => {
  describe('Post', () => {
    it('should update the current maps list', () => {
      const currentMaps = {current_map: {102:{0: false,
        1:true}}}
      return request(app).patch(`/api/users/${uids["t99"]}`)
      .send(currentMaps)
      .expect(200)
      .then(({body}) => {        
        const {current_maps} = body;
        expect(current_maps).toMatchObject({102:{0: false,
            1:true}})
      })
    });
  });
});


describe('GET /api/users/:uid', () => {
    it('should return a user object for the given UID', () => {
        return request(app).get(`/api/users/KvFKEsaFXXVhkRHKUUOX6gXeyMX2`)
        .expect(200)
        .then((response) => {
            const user = response.body.user
            const userKeys = Object.keys(user)
            expect(user.name).toBe('Frank')
            expect(user.email).toBe('email@email.com')
            expect(userKeys).toEqual( [
                'active',
                'avatar_image',
                'created_at',
                'current_maps',
                'email',
                'location',
                'maps_completed',
                'modified',
                'name',
                'referred',
                'starred_maps'
              ])
            
        })       
    });
});
