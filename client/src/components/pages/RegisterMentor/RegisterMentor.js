/**
 * Registers a new mentor
 */

import React from "react";
import { RegisterHeader, RegisterForm } from "../../modules/RegisterFields.js";
import { createNewMentor } from "../../../api.js";
import { useNavigate } from "@reach/router";
import {
    getCompanyField, getConfirmPasswordField, getEmailField, getIndustryFieldField, getMentorTypesField,
    getNameField, getPasswordField, getReasonToMentorField, getRoleField, getShortBioField
} from "../../modules/MentorFields.js";
import * as Yup from "yup";
import { useFormik } from "formik";
import HeaderBackground from "../../../assets/images/apply_txtbox.svg";
import HeaderImage from "../../../assets/images/apply_project.svg";
import Button from "@material-ui/core/Button";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name."),
    email: Yup.string()
        .email()
        .required("Please input a valid email")
        .matches(/.+@*.*/i, "Please input a valid email")
        .required("Please input a valid email"),
    company: Yup.string()
        .required("Please input your company"),
    reasonToMentor: Yup.string()
        .required("Please enter your reason"),
    shortBio: Yup.string()
        .required("Please enter a short biography"),
    role: Yup.string()
        .required("Please enter your role"),
    field: Yup.string()
        .required("Please select a field"),
    mentorTypes: Yup.array()
        .required("Please select at least 1 type"),
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

const RegisterMentor = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {

        const mentor = { ...values};
        createNewMentor(mentor)
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
            company: "",
            mentorTypes: [],
            reasonToMentor: "",
            shortBio: "",
            field: "",
            role: "",
            password: "",
            confirmpassword: "",
        },
        onSubmit: handleSubmit,
        validationSchema: RegisterSchema,
    });
    // Every subarray is a row.
    const fieldOrder = [[
        getNameField,
        getEmailField,
        getPasswordField,
        getConfirmPasswordField,
        getCompanyField,
        getIndustryFieldField,
        getRoleField,
        getMentorTypesField,
        getReasonToMentorField,
        getShortBioField,
    ]];
    const fieldOrderLabels = [
        "About You"
    ]

    const headerTitle = "Become a Mentor";
    const headerBody = [
        "Help mentor student projects!"
    ];
    const submitLabel = "Become a Mentor";

    return (
        <div className="col" style={{ backgroundColor: "#ffffff" }}>
            <RegisterHeader title={headerTitle} body={headerBody} background={HeaderBackground} headerImage={HeaderImage} />
            <RegisterForm formik={formik} fieldOrder={fieldOrder} fieldOrderLabels={fieldOrderLabels} submitLabel={submitLabel} />
            <Button onClick={() => console.log(formik.values.field)}> Press me</Button>
        </div>
    );

};

export default RegisterMentor;
