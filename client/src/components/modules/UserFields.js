/**
 * This should be Formik fields that will be used by
 * the profile and account creation page.
 */
import fieldGenerator from "./FieldGenerator.js";
import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export const getNameField = (formik) => {
     return fieldGenerator("name", "Your Name", formik, 12, "John Doe");
 };

export const getMajorField = (formik) => {
    return fieldGenerator("major", "Tell us your major", formik, 12, "john.doe123@gmail.com");
};

export const getEmailField = (formik) => {
    return fieldGenerator("email", "Your Email", formik, 12, "Computer Science");
};

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