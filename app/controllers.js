import { postLoginDetails, postUser } from "./models";

const checkLogin = (request, response, next) => {
    const postRequest = request.body;
    postLoginDetails(postRequest)
        .then((uid) => {
            response.status(200).send({ uid: uid });
        })
        .catch((err) => next(err));
};

const createAccount = (request, response, next) => {
    return postUser(request.body).then((uid) => {
        return response.status(201).send({uid:uid})
    }).catch((err)=> next(err));
}

export default {checkLogin, createAccount};
