import React from "react";

import Form from "react-bootstrap/Form";
import { Col, Row, Button, Container, Alert } from 'react-bootstrap'

import { sendPasswordReset } from "../../../api";
import { getEmailField } from "../../modules/UserFields.js";

import * as Yup from "yup";
import { useFormik } from "formik";

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required("Please input a valid email.")
});

const ResetPassword = () => {
    const [err, setErr] = React.useState((<></>));

    const handleSubmit = (values) => {
        sendPasswordReset(values.email)
            .then(() => setErr((<Alert variant="success">Email sent.</Alert>)))
            .catch((err) => {
                if (err.code === "auth/user-not-found") {
                    setErr((<Alert variant="danger">No user was found associated with this email.</Alert>));
                }
            });
    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: ResetPasswordSchema,
        onSubmit: handleSubmit
    });

    return (
        <>
            <Container fluid="sm">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>Reset Password</h1>
                        <p>Please enter the email you used to register with CovEd. We'll email you the instructions to reset your password.</p>
                        {err}
                        <Form>
                            {getEmailField(formik)}
                            <Button className="submit" block onClick={(event) => formik.submitForm()}>
                                Send
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ResetPassword;