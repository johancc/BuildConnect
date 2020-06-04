/**
 * Fields used when creating or editing a project listing.
 */
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import fieldGenerator from "./FieldGenerator.js";

export const getProjectNameField = (formik) => {
    return fieldGenerator("project Name", "project Name", formik, 5);
};

export const getTweetDescriptionField = (formik) => {
    return fieldGenerator("tweet Description", "tweet Description", formik, 5, "Describe your team in a sentence or two.");
}

export const getDescriptionField= (formik) => {
    return fieldGenerator("description", "description", formik, 10);
}

export const getLinkField = (formik) => {
    return fieldGenerator("link", "link", formik, 6);
};

export const getTeamDescriptionField = (formik) => {
    return fieldGenerator("team Description", "team Description", formik, 10);
};

export const getTeamSizeField = (formik) => {
    return fieldGenerator("team Size", "team Size", formik, 2);
}

export const getContactInfoField = (formik) => {
    return fieldGenerator("contact Info", "contact Info", formik, 6);
};

export const getSkillsNeededField = (formik) => {
    return fieldGenerator("skills Needed", "skills Needed", formik, 12);
};

export const getHelpNeededField = (formik) => {
    return fieldGenerator("help Needed", "help Needed", formik, 12, "What help are you looking for?")
};

export const getDateField = (formik) =>  {
    const fieldName = "dateStarted";
    return (
        <Form.Group as={Col} md="2" controlId={"validation"+fieldName}>
            <Form.Label>Date Started</Form.Label>
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
        <Form.Group as={Col} md="2" controlId={"validation" + fieldName}>
            <Form.Label>Project Image</Form.Label>
            <Form.Control
                name={fieldName}
                {...formik.getFieldProps(fieldName)}
                isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
                required
                type="file"
                accept="image/*"
            />
            <Form.Control.Feedback type="invalid">{formik.errors[fieldName]}</Form.Control.Feedback>
        </Form.Group>
    )
}