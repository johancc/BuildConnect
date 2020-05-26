/**
 * This should be Formik fields that will be used by
 * the profile and account creation page.
 */
import fieldGenerator from "./FieldGenerator.js";

 export const getNameField = (formik) => {
     return fieldGenerator("name", formik, 4);
 };



export const getMajorField = (formik) => {
    return fieldGenerator("major", formik, 4);
};

export const getEmailField = (formik) => {
    return fieldGenerator("email", formik, 4);
};


export const getPasswordField = (formik) => {
    return fieldGenerator("password", formik, 6);
}

export const getConfirmPasswordField = (formik) => {
    return fieldGenerator("confirm password", formik, 6);
}