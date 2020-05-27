import { auth } from "./firebase_config.js";
import { post } from "./utilities.js";

export const createNewUser = async (values) => {
    let tokenId = undefined; 
    try {
        await auth.createUserWithEmailAndPassword(values.email, values.password);
        tokenId = await auth.currentUser.getIdToken();
        await postUser(tokenId, values);
        await auth.currentUser.sendEmailVerification();
    } catch (err) {
        if (tokenId) await post("/api/removeUser", {token: tokenId}); // Remove from firebase if creation failed somehow.
        throw new Error("Error creating new user.");
    }
};

export const updateUser = async (tokenId, user) => {
    await post("/api/updateUser", { user: user, token: tokenId});
    return user;
}

export const createNewProject = async (values, tokenId) => {
    // If the file exists read it and upload
    return post("/api/addProject", {project: values, token: tokenId});
}

const postUser = async (tokenId, values) => {
    return await post("/api/addUser", {user: values, token: tokenId});
}
