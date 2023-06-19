import {
    fetchMapById,
    fetchMaps,
    postLoginDetails,
    postUser,
    removeUser,
    updatedUserName,
    updatedUserEmail,
    updatedUserPassword,
    updateCompletedMaps,
    updateCurrentMap,
} from "./models.js";

const checkLogin = (request, response, next) => {
    const postRequest = request.body;
    postLoginDetails(postRequest)
        .then((uid) => {
            response.status(200).send({ uid: uid });
        })
        .catch((err) => next(err));
};

const createAccount = (request, response, next) => {
    return postUser(request.body)
        .then((uid) => {
            return response.status(201).send({ uid: uid });
        })
        .catch((err) => next(err));
};

const getMaps = (request, response, next) => {
    return fetchMaps()
        .then((maps) => {
            return response.status(200).send({ maps: maps });
        })
        .catch((err) => console.log(err));
};

const getMapById = (request, response, next) => {
    const mapId = request.params.map_id;
    return fetchMapById(mapId)
        .then((map) => {
            return response.status(200).send({ map: map });
        })
        .catch((err) => next(err));
};

const deleteUser = (request, response, next) => {
    const deleteId = request.params.user_id;
    const postRequest = request.body;
    removeUser(deleteId, postRequest)
        .then(() => {
            response.status(204).send();
        })
        .catch((err) => {
            next(err);
        });
};

const changeUserDetails = (request, response, next) => {
    const updateUserID = request.params.user_id;
    const detailToChange = request.body;
    if (detailToChange.hasOwnProperty("name")) {
        updatedUserName(updateUserID, detailToChange)
            .then((name) => {
                response.status(200).send({ name });
            })
            .catch((err) => {
                next(err);
            });
    }
    if (detailToChange.hasOwnProperty("newEmail")) {
        updatedUserEmail(updateUserID, detailToChange)
            .then((email) => {
                response.status(200).send({ email });
            })
            .catch((err) => {
                next(err);
            });
    }
    if (detailToChange.hasOwnProperty("completed_map")) {
        updateCompletedMaps(detailToChange, updateUserID).then((maps) =>
            response.status(200).send({ maps_completed: maps })
        );

    } 

    if (detailToChange.hasOwnProperty("current_map")) {
        updateCurrentMap(detailToChange, updateUserID).then((maps) => 
            response.status(200).send({ current_maps: maps }) 
        )

    } 
    
    if (detailToChange.hasOwnProperty('email')) {
        updatedUserPassword(detailToChange.email, updateUserID)
            .then(() => response.status(204).send())
            .catch((err) => next(err));
    }
};

export default {
    checkLogin,
    createAccount,
    getMaps,
    getMapById,
    deleteUser,
    changeUserDetails,
};
