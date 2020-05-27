/**
 * Registers a user
 */
import React from "react";
import Button from "react-bootstrap/Button";
import { createNewUser } from "../../../api.js";
import { useNavigate } from "@reach/router";
import {
    getNameField, getEmailField, getPasswordField, getConfirmPasswordField,
    getMajorField,
} from "../../modules/UserFields.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import "./RegisterUser.css";

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
        console.log(user);
        createNewUser(user)
            .then(() => {
                navigate("/explore");
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
    const fields = fieldOrder.map((fieldRow, i) => {
        return(
        <Form.Row key={"row" + i}>
            {fieldRow.map((field) => {
                return field(formik)})}
        </Form.Row>
        )
        });
    
    //const fields = fieldGetters.map((field) => field(formik));
    const header = (
        <Jumbotron fluid style={{ backgroundColor: "#ebf5fa" }}>
            <Container>
                <div className="Explore-title">
                    <div>
                        <h1>Register</h1>
                        <h3>Join the community of innovative college students. Explore existing projects or post your own project for others to join. Get access to industry professional mentors for your group. </h3>
                    </div>
                </div>
            </Container>
        </Jumbotron>
    )
    return (
        <div className="RegisterUser-container" style={{ backgroundColor: "#ebf5fa" }}>
            {header}
            <Form noValidate onSubmit={formik.handleSubmit}>
                {fields}
                <Button onClick={() => formik.submitForm()}>Create account</Button>
            </Form>
        </div>
        
    )

};

export default RegisterUser;
