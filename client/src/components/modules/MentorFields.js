/**
 * Fields used when creating or editing a project listing.
 */
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { fieldGenerator, optionsFieldGenerator } from "./FieldGenerator.js";

export const getNameField = (formik) => {
    return fieldGenerator("name", "What is your name?", formik, 12, "John Doe");
};

export const getEmailField = (formik) => {
    return fieldGenerator("email", "What is your email?", formik, 12, "john.doe123@gmail.com");
};

export const getCompanyField = (formik) => {
    return fieldGenerator("company", "What Company do you work at?", formik, 12, "BuildConnect");
};

export const getReasonToMentorField = (formik) => {
    return fieldGenerator("reasonToMentor", "Why are you interested in being a mentor?", formik, 12, "I would like to help students grow in the software engineering field.", "textarea");
}

export const getShortBioField = (formik) => {
    return fieldGenerator("shortBio", "A short biography is needed for your profile", formik, 12, "I graduated in 2013 and have worked in the industry for 7 years on many projects.", "textarea");
}

export const getRoleField = (formik) => {
    return fieldGenerator("role", "What is your role?", formik, 12, "Head of Management");
}

export const getIndustryFieldField = (formik) => {
    const fieldName = "field";
    const options = [
        "Software engineering",
        "Mechanical engineering",
        "Data science / Machine Learning",
        "Product Manager",
        "Designer",
        "Hardware engineering",
        "Business / Management",
        "Other"
    ]

    return optionsFieldGenerator(fieldName, "What is your field?", formik, "radio", options);
}

export const getMentorTypesField = (formik) => {
    const fieldName = "mentorTypes";
    const options = [
        "Mentoring student projects",
        "1:1 Sessions",
        "Hosting mentor tech talks"
    ]

    return optionsFieldGenerator(fieldName, "What type of mentorship are you interested in?", formik, "checkbox", options);
}

// We aren't using the generic generator because we need
// to make the password hidden.
export const getPasswordField = (formik) => {
    return (
        <Form.Group as={Col} md="12" controlId={"validationpassword"}>
            <Form.Label>Create a password</Form.Label>
            <Form.Control
                name="password"
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
                required
                type="password"
                placeholder="***********"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        </Form.Group>
    );
}

export const getConfirmPasswordField = (formik) => {
    return (
        <Form.Group as={Col} md="12" controlId={"validationconfirmpassword"}>
            <Form.Label>Confirm your password</Form.Label>
            <Form.Control
                name="confirmpassword"
                {...formik.getFieldProps("confirmpassword")}
                isInvalid={formik.touched.confirmpassword && formik.errors.confirmpassword}
                required
                type="password"
                placeholder="***********"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.confirmpassword}</Form.Control.Feedback>
        </Form.Group>
    );
}