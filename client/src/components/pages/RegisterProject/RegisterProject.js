/**
 * Registers a new project by a user.
 */
import React, { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider.js";
import { createNewProject } from "../../../api.js";
import { useNavigate } from "@reach/router";
// Form & Validation Libraries
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
// Fields are defined externally.
import {
    getProjectNameField,
    getDescriptionField,
    getTweetDescriptionField,
    getLinkField,
    getTeamDescriptionField,
    getDateField,
    getContactInfoField,
    getTeamSizeField,
    getHelpNeededField,
    getSkillsNeededField,
    getImageField,
} from "../../modules/ProjectFields.js";

// Styling Components
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./RegisterProject.css";

const ProjectSchema = Yup.object().shape({
    projectName: Yup.string().required("Please enter a project name"),
    tweetDescription: Yup.string().required("Please enter a one/two sentence description."),
    description: Yup.string().required("Please enter a description of your project."),
    teamSize: Yup.number().required("Please enter the team size"),
    dateStarted: Yup.date().required("Please enter the date the project started"),
    helpNeeded: Yup.string().required("Please describe the help needed in this project"),
    teamDescription: Yup.string().required("Please describe your team"),
    link: Yup.string(),
    image: Yup.mixed(),
    contactInfo: Yup.string(),
    skillsNeeded: Yup.string().required("Please input the skills needed to join."), 
});

const RegisterProject = () => {
    const navigate = useNavigate();
    // TODO: replace with useContext(UserContext) when authentication is fixed instead of this dummy token
    // const userProvider = useContext(UserContext);
    const userProvider = {user: {token: "token"}};

    const loadImage = (imageFile, cb) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            cb(e.target.result);
        }
        reader.readAsDataURL(imageFile);
    };

    const handleSubmit = async (values) => {
        const project = {...values};
        // TODO: this is yank please fix at some point.
        let imageFile = document.getElementById("validationimage").files[0];
        loadImage(imageFile, (imageData) => {
            project.photoData = imageData;
            createNewProject(project, userProvider.user.token)
                .then((proj) => {
                    navigate(`project/${proj._id}`)
                })
                .catch(() => {
                    alert("Unable to create new project.")
                });
        });
    }

    const formik = useFormik({
        initialValues: {
            projectName: "",
            tweetDescription: "",
            description: "",
            teamSize: "",
            dateStarted: "",
            image: undefined,
            helpNeeded: "", 
            teamDescription: "",
            link: "",
            contactInfo: "",
            skillsNeeded: [],
        },
        onSubmit: handleSubmit,
        validationSchema: ProjectSchema,
    });
    let handleImageLoad =  (e) => {
            console.log(e);
            let file = e.target.files[0];
            console.log(file + "  here!!!")
            let reader = new FileReader();
            reader.onload = function (item) {
                console.log("Loaded ")
                console.log(item);
                formik.setFieldValues(fieldName, item.target.result);
            }
            reader.readAsDataURL(file);
    }
    
    let fieldOrder = [
        [getProjectNameField, getTweetDescriptionField, getDateField],
        [getDescriptionField, (formik) => getImageField(formik, handleImageLoad)],
        [getTeamDescriptionField, getTeamSizeField],
        [getHelpNeededField, getSkillsNeededField],
        [getContactInfoField, getLinkField],
    ];
    const fields = fieldOrder.map((fieldRow, i)  => {
        return (
            <Form.Row key={`row${i}`}>
                {fieldRow.map((field) => {
                    return field(formik);
                })}
            </Form.Row>
        );
    });    

    const header = (
        <Jumbotron fluid style={{ backgroundColor: "#ebf5fa" }}>
            <Container>
                <div className="RegisterProject-title">
                    <div>
                        <h1>Register</h1>
                        <h3>Join the community of innovative college students. Explore existing projects or post your own project for others to join. Get access to industry professional mentors for your group. </h3>
                    </div>
                </div>
            </Container>
        </Jumbotron>
    );

    return (
        <div className="RegisterProject-container" style={{ backgroundColor: "#ebf5fa"}}>
            {header}
            <Form noValidate onSubmit={() => {
                formik.handleSubmit()
            }}>
                {fields}
                <Button onClick={() => formik.submitForm()}>Create project</Button>
            </Form>
        </div>
    )
};

export default RegisterProject;