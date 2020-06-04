// This file contains components for generating a register page
import React from "react";
import Form from "react-bootstrap/Form";
import RoundedButton from "./RoundedButton";
import GoIcon from "../../assets/icons/go.svg";

// Styling
import './RegisterFields.css';

// Component for the header of a register page. Contains a banner with text and an image.
export const RegisterHeader = ({title, body, background, headerImage})  => {
    const headerTitleStyle = {
        backgroundColor: "#ffffff",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "50px 40px 50px 50px"
    }

    const bodyItems = body.map((text, i) =>
        <h4 key={i.toString()}>{text}</h4>
    );

    return (
        <div className="RegisterFields">
            <div className="header-container">
                <div className="header-text" style={headerTitleStyle}>
                    <h1 className="header-title">{title}</h1>
                    {bodyItems}
                </div>
                <div className="header-image">
                    <img src={headerImage} />
                </div>
            </div>
        </div>
    )
}

// Component for the form of a register page. Fields are grouped by fieldOrder subarrays and are each group is labeled
// by the corresponding label in `fieldOrderLabels`. The submit button is labeled by `submitLabel`.
export const RegisterForm = ({formik, fieldOrder, fieldOrderLabels, submitLabel}) => {
    const fields = fieldOrder.map((fieldRow, i) => {
        return (
            <div>
                <div className="form-field-label">
                    {fieldOrderLabels[i]}
                </div>
                <Form.Row key={"row" + i}>
                    {fieldRow.map((field) => {
                        return field(formik)})}
                </Form.Row>
            </div>
        );
    });

    return (
        <div className="RegisterFields">
            <div className="form-container">
                <div className="form">
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        {fields}
                    </Form>
                </div>
                <div className="form-submit">
                    <div id="button">
                        <RoundedButton label={submitLabel} icon={GoIcon} callback={() => formik.submitForm()} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default { RegisterHeader, RegisterForm };