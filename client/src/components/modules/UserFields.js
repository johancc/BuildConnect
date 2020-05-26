/**
 * This should be Formik fields that will be used by
 * the profile and account creation page.
 */
import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";


 export const getNameField = (formik) => {
     return (
         <Form.Group as={Col} md="12" controlId="validationCustom01">
             <Form.Label>Name</Form.Label>
             <Form.Control
                 name="name"
                 {...formik.getFieldProps("name")}
                 isInvalid={formik.touched.name && formik.errors.name}
                 required
                 type="text"
                 placeholder="Your Name"
             />
             <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
         </Form.Group>
     );
 };
export const getMajorField = (formik) => {
    return (
        <Form.Group as={Col} md="12" controlId="validationMajor">
            <Form.Label>Major</Form.Label>
            <Form.Control
                name="major"
                {...formik.getFieldProps("major")}
                isInvalid={formik.touched.major && formik.errors.major}
                required
                type="text"
                placeholder="Your major"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.major}</Form.Control.Feedback>
        </Form.Group>
    );
};
export const getEmailField = (formik) => {
    return (
        <Form.Group as={Col} md="12" controlId="validationEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                name="email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
                type="email"
                placeholder="user@domain.com"
                aria-describedby="inputGroupPrepend"
                required
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>
    );
};


export const getPasswordField = (formik) => {
    return (
        <>
            <Form.Group as={Col} md="6" controlId="validationPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    {...formik.getFieldProps("password")}
                    isInvalid={formik.touched.password && formik.errors.password}
                    type="password"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationPassword1">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    name="passwordConfirmation"
                    {...formik.getFieldProps("passwordConfirmation")}
                    isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                    type="password"
                    placeholder="Reenter Password"
                    aria-describedby="inputGroupPrepend"
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordConfirmation}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    );
};