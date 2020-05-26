/**
 * This should be Formik fields that will be used by
 * the profile and account creation page.
 */
import React from "react";
import fieldGenerator from "./FieldGenerator.js";

 export const getNameField = (formik) => {
     return fieldGenerator("name", formik, 6);
 };



export const getMajorField = (formik) => {
    return fieldGenerator("major", formik, 6);
};

export const getEmailField = (formik) => {
    return fieldGenerator("email", formik, 12);
};


export const getPasswordField = (formik) => {
    const password = fieldGenerator("password", formik, 6);
    const confirmPassword = fieldGenerator("confirm password", formik, 6, "Reenter Password");
    return (
        <>
            {password}
            {confirmPassword}
        </>
    )
}