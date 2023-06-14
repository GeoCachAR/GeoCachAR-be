import {
  fetchMapById,
  fetchMaps,
  postLoginDetails,
  postUser,
  removeUser
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
  removeUser(deleteId)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default { checkLogin, createAccount, getMaps, getMapById, deleteUser };
