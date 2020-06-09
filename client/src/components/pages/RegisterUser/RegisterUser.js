/**
 * Registers a user
 */
import React from "react";
import { RegisterHeader, RegisterForm } from "../../modules/RegisterFields.js";
import { createNewUser } from "../../../api.js";
import { useNavigate } from "@reach/router";
import {
    getNameField, getEmailField, getPasswordField, getConfirmPasswordField,
    getMajorField,
} from "../../modules/UserFields.js";
import * as Yup from "yup";
import { useFormik } from "formik";
import HeaderBackground from "../../../assets/images/home_projects.svg";
import HeaderImage from "../../../assets/images/apply_project.svg";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name."),
    email: Yup.string()
        .email()
        .required("Please input a valid email")
        .matches(/.+@*.edu/i, "Please use a .edu email.")
        .required("Please input a valid .edu email."),
    major: Yup.string()
        .required("Please input your major"),
    password: Yup.string()
        .required("Password Required")
        .matches(
            /^[A-Za-z0-9\s$&+,:;=?@#|'<>.^*()%!-]{6,}$/,
            "Password must be at least 6 characters long."
        ),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
        .required("Password Confirmation Required."),
});

const RegisterUser = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {

        const user = { ...values};
        createNewUser(user)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                alert("Unable to register for some reason.")
            });
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            major: ""
        },
        onSubmit: handleSubmit,
        validationSchema: RegisterSchema,
    });
    // Every subarray is a row.
    const fieldOrder = [
        [getNameField, getEmailField, getMajorField],
        [getPasswordField, getConfirmPasswordField]
    ];
    const fieldOrderLabels = [
        "Email",
        "Password"
    ]

    const headerTitle = "Join the community";
    const headerBody = [
        "Join the community of innovative college students,",
        "Explore existing projects or post your own for others to join."
    ];
    const submitLabel = "Create Your Account";

    return (
        <div className="col" style={{ backgroundColor: "#ffffff" }}>
            <RegisterHeader title={headerTitle} body={headerBody} background={HeaderBackground} headerImage={HeaderImage} />
            <RegisterForm formik={formik} fieldOrder={fieldOrder} fieldOrderLabels={fieldOrderLabels} submitLabel={submitLabel} />
        </div>
    );

};

export default RegisterUser;
