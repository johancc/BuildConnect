/**
 * Registers a user
 */
import React from "react";
import Button from "react-bootstrap/Button";
import RoundedButton from "../../modules/RoundedButton.js";
import { createNewUser } from "../../../api.js";
import { useNavigate } from "@reach/router";
import {
    getNameField, getEmailField, getPasswordField, getConfirmPasswordField,
    getMajorField,
} from "../../modules/UserFields.js";
import * as Yup from "yup";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import "./RegisterUser.css";
import ProjectTxtImg from "../../../assets/images/apply_txtbox.svg";
import ProjectImg from "../../../assets/images/apply_project.svg";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Please enter your name."),
    email: Yup.string()
        .email()
        .required("Please input a valid email")
        .matches(/.+@*.edu/i, "Mentors are required to use an .edu email.")
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
    const fields = fieldOrder.map((fieldRow, i) => {
        return (
        <div>
            <div className="field-row-label">
                {fieldOrderLabels[i]}
            </div>
            <Form.Row key={"row" + i}>
                {fieldRow.map((field) => {
                    return field(formik)})}
            </Form.Row>
        </div>
        );
    });

    const headerTitleStyle = {
        backgroundColor: "#ffffff",
        backgroundImage: `url(${ProjectTxtImg})`,
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        padding: "50px 40px 50px 40px"
    }
    
    //const fields = fieldGetters.map((field) => field(formik));
    const header = (
        <div className="header-container">
            <div className="Register-title" style={headerTitleStyle}>
                <h1 className="Title-first">Join the community</h1>
                <h4>Join the community of innovative college students,</h4>
                <h4>Explore existing projects or post your own for others to join.</h4>
            </div>
            <div className="Register-image">
                <img src={ProjectImg} />
            </div>
        </div>
    )
    return (
        <div className="RegisterUser-container" style={{ backgroundColor: "#ffffff" }}>
            <div>
                {header}
            </div>
            <div className="Register-form-container">
                <Form noValidate onSubmit={formik.handleSubmit}>
                    {fields}
                </Form>
                <div className="Register-submit">
                    <div id="button">
                        <RoundedButton label="Create Your Account" callback={() => formik.submitForm()} />
                    </div>
                </div>
            </div>
        </div>
        
    )

};

export default RegisterUser;
