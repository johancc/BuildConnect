import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
export const fieldGenerator = (fieldName, formik, md) => {
    // TODO: Use title case for label 
    return (<Form.Group as={Col} md={md} controlId={"validation" + fieldName}>
        <Form.Label>{fieldName}</Form.Label>
        <Form.Control
            name={fieldName}
            {...formik.getFieldProps(fieldName)}
            isInvalid={formik.touched[fieldName] && formik.errors[fieldName]}
            required
            type="text"
            placeholder={"Your " + fieldName}
        />
        <Form.Control.Feedback type="invalid">{formik.errors[fieldName]}</Form.Control.Feedback>
    </Form.Group>)
}
