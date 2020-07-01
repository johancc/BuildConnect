import { auth } from "./firebase_config.js";
import { post, get } from "./utilities.js";

export const createNewUser = async (values) => {
    const isValidRequest = await canEmailRegister(values.email);
    if (!isValidRequest) {
        throw new Error("This email cannot register!")
    }

    let tokenId = undefined; 
    try {
        await auth.createUserWithEmailAndPassword(values.email, values.password);
        tokenId = await auth.currentUser.getIdToken(true);
        await postUser(tokenId, values);
        await auth.currentUser.sendEmailVerification();
    } catch (err) {
        if (tokenId) await post("/api/removeUser", {token: tokenId}); // Remove from firebase if creation failed somehow.
        throw new Error("Cannot create new user.");
    }
};
export const sendPasswordReset = async (email) => {
    return await auth.sendPasswordResetEmail(email);
}
export const createNewMentor = async (values) => {
    const isValidRequest = await canEmailRegister(values.email);
    if (!isValidRequest) {
        throw new Error("This email cannot register!")
    }

    let tokenId = undefined;
    try {
        await auth.createUserWithEmailAndPassword(values.email, values.password);
        tokenId = await auth.currentUser.getIdToken();
        await postMentor(tokenId, values);
        await auth.currentUser.sendEmailVerification();
    } catch (err) {
        if (tokenId) await post("/api/removeMentor", {token: tokenId}); // Remove from firebase if creation failed somehow.
        throw new Error("Cannot create new mentor.");
    }
};

export const updateUser = async (tokenId, user) => {
    return await post("/api/updateUser", { user: user, token: tokenId});
}

export const updateMentor = async (tokenId, user) => {
    return await post("/api/updateMentor", { mentor: user, token: tokenId});
}

export const createNewProject = async (values, tokenId) => {
    // If the file exists read it and upload
    return post("/api/addProject", {project: values, token: tokenId});
}

export const requestToJoin = async (message, projectID, tokenId) => {
    return post("/api/requestToJoin", {message: message,  projectID: projectID, token: tokenId})
};

export const requestMentor = async (message, mentor, tokenId) => {
    return post("/api/requestMentor", {message: message, mentor: mentor, token: tokenId});
};

export const postUser = async (tokenId, values) => {
    return await post("/api/addUser", {user: values, token: tokenId});
}

export const postMentor = async (tokenId, values) => {
    return await post("/api/addMentor", {mentor: values, token: tokenId});
}

// Returns whether the given emailAddress can register (is in whitelist)
export const canEmailRegister = async (emailAddress) => {
    const emails = await get("/api/whitelist/" + emailAddress);
    return emails.length > 0;
}

export const getProjectOwner = async (project, tokenId) => {
    const owner = await get('/api/owner', {ownerID: project.projectOwner, token: tokenId});
    return owner;
}
export const getProjects = async (tokenId) => {
    const projects = await get("/api/listProjects", {token: tokenId});
    return projects;
}

export const getMentors = async(tokenId) => {
    const mentors = await get("/api/listMentors", {token: tokenId});
    return mentors;
}