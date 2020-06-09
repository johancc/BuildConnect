import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

/**
 * Creates a formik field component based for a field.
 * Note: the field name will have spaces only on the field label.
 * This means that according to formik, the field has no spaces.
 * @param {String} fieldName - name of the field
 * @param {Formik} formik - formik instace 
 * @param {Number} md - bootstrap grid size
 * @param {String} placeholder - field hint to appear before the user touches the field.
 * @param {String} htmlType - the type of the underlying HTML element to use when rendering
 */
const fieldGenerator = (fieldName, fieldTitle, formik, md, placeholder, htmlType="input") => {
    // Preprocessing
    md = md.toString();
    let fieldNameNoSpace = removeWhitespace(fieldName); 
    return (
    <Form.Group as={Col} md={md} controlId={"validation" + fieldNameNoSpace}>
        <Form.Label>{fieldTitle}</Form.Label>
        <Form.Control
            className="underline"
            name={fieldNameNoSpace}
            {...formik.getFieldProps(fieldNameNoSpace)}
            isInvalid={formik.touched[fieldNameNoSpace] && formik.errors[fieldNameNoSpace]}
            required
            type="text"
            placeholder={ placeholder || "Your " + fieldName}
            as={htmlType}
        />
        <Form.Control.Feedback type="invalid">{formik.errors[fieldNameNoSpace]}</Form.Control.Feedback>
    </Form.Group>)
}


const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const removeWhitespace = (str) => {
    return str.replace(/\s/g, '');
}


export default fieldGenerator;