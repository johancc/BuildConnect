/**
 * Fields used when creating or editing a project listing.
 */
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import fieldGenerator from "./FieldGenerator.js";

export const getProjectNameField = (formik) => {
    return fieldGenerator("project Name", "What will you name this project?", formik, 12, "Project title");
};

export const getShortDescriptionField = (formik) => {
    return fieldGenerator("short Description", "Describe your project in 2 sentences or less", formik, 12, "Make museums more interactive!", "textarea");
}

export const getLongDescriptionField= (formik) => {
    return fieldGenerator("long Description", "Describe your project in more detail", formik, 12, "Build an interactive museum experience! Make art at home and transform them using different GANs. Then, find your match with a current museum piece.", "textarea");
}

export const getLinkField = (formik) => {
    return fieldGenerator("link", "List a website", formik, 8, "abc123.com");
};

export const getTeamDescriptionField = (formik) => {
    return fieldGenerator("team Description", "Describe the current state of your team", formik, 12, "We have 3 people. All of us are engineers from Carnegie Mellon. We're looking for at least 2 more people, preferably PM and a designer.", "textarea");
};

export const getTeamSizeField = (formik) => {
    return fieldGenerator("team Size", "What is your ideal team size?", formik, 8, "E.g. 5");
}

export const getContactInfoField = (formik) => {
    return fieldGenerator("contact Info", "List an email for students to contact", formik, 8, "abcxyz@gmail.com");
};

export const getSkillsNeededField = (formik) => {
    return fieldGenerator("skills Needed", "Describe the skills you need to complete this project", formik, 12, "Python, Javascript, Tensorflow, Figma");
};

export const getHelpNeededField = (formik) => {
    return fieldGenerator("help Needed", "What help are you looking for?", formik, 12, "We are looking for a designer to design our UI and a PM to lead the team!", "textarea");
};

export const getDateField = (formik) =>  {
    const fieldName = "dateStarted";
    return (
        <Form.Group as={Col} md="4" controlId={"validation"+fieldName}>
            <Form.Label>When did you start this project?</Form.Label>
            <Form.Control
                name={fieldName}
                {...formik.getFieldProps(fieldName)}
                isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
                required
                type="date"
                placeholder={Date.now()}
            />
            <Form.Control.Feedback type="invalid">{formik.errors[fieldName]}</Form.Control.Feedback>
        </Form.Group>)
};

export const getImageField = (formik, setFieldValue) => {
    const fieldName = "image";
    return (
        <Form.Group as={Col} md="12" controlId={"validation" + fieldName}>
            <Form.Label> Upload a cover image (600 pixels x 400 pixels recommended) </Form.Label>
            <Form.Control
                name={fieldName}
                {...formik.getFieldProps(fieldName)}
                isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
                required
                type="file"
                accept="image/x-png, image/jpeg"
            />
            <Form.Control.Feedback type="invalid">{formik.errors[fieldName]}</Form.Control.Feedback>
        </Form.Group>
    )
}