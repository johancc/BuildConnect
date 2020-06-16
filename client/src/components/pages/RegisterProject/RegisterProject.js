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
    getShortDescriptionField,
    getLongDescriptionField,
    getLinkField,
    getTeamDescriptionField,
    getProjectLengthField,
    getContactInfoField,
    getTeamSizeField,
    getHelpNeededField,
    getSkillsNeededField,
    getImageField,
} from "../../modules/ProjectFields.js";

// Styling Components
import "./RegisterProject.css";
import { RegisterForm, RegisterHeader } from "../../modules/RegisterFields";
import HeaderBackground from "../../../assets/images/home_showcase.svg";
import HeaderImage from "../../../assets/images/rocket.svg";

const ProjectSchema = Yup.object().shape({
    projectName: Yup.string().required("Please enter a project name"),
    shortDescription: Yup.string().required("Please enter a one/two sentence description."),
    longDescription: Yup.string().required("Please enter a description of your project."),
    teamSize: Yup.number().required("Please enter the team size"),
    projectLength: Yup.number().required("Please enter the expected duration"),
    helpNeeded: Yup.string().required("Please describe the help needed in this project"),
    teamDescription: Yup.string().required("Please describe your team"),
    link: Yup.string(),
    image: Yup.mixed(),
    contactInfo: Yup.string()
        .required("Please input a valid email")
        .matches(/.+@*.*/i, "Please input a valid email")
        .required("Please input a valid email"),
    skillsNeeded: Yup.string().required("Please input the skills needed to join"),
});

const RegisterProject = () => {
    const navigate = useNavigate();
    // TODO: replace with useContext(UserContext) when authentication is fixed instead of this dummy token
    // const userProvider = useContext(UserContext);
    // You really out here.
    const userProvider = useContext(UserContext);

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
                    alert("Project submission successful! The BuildConnect team will review your project and notify you when it is approved.");
                    navigate("/project", {state: {projectData: proj}})
                })
                .catch(() => {
                    alert("Unable to create new project.")
                });
        });
    }

    const formik = useFormik({
        initialValues: {
            projectName: "",
            shortDescription: "",
            longDescription: "",
            teamSize: "",
            projectLength: "",
            image: undefined,
            helpNeeded: "", 
            teamDescription: "",
            link: "",
            contactInfo: "",
            skillsNeeded: "",
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
        [getProjectNameField, getShortDescriptionField, getLongDescriptionField, getProjectLengthField, (formik) => getImageField(formik, handleImageLoad)],
        [getTeamDescriptionField, getSkillsNeededField, getHelpNeededField, getTeamSizeField],
        [getContactInfoField, getLinkField]
    ]

    const fieldOrderLabels = [
        "The Project",
        "The Team",
        "Contact Information"
    ]

    const headerTitle = "Launch Your Idea";
    const headerBody = [
        "Looking for team members or mentors?",
        "Your project must be longer than 4 weeks long and have more than 2 people."
    ];
    const submitLabel = "Submit your project";

    return (
        <div className="col" style={{ backgroundColor: "#ffffff" }}>
            <RegisterHeader title={headerTitle} body={headerBody} background={HeaderBackground} headerImage={HeaderImage} />
            <RegisterForm formik={formik} fieldOrder={fieldOrder} fieldOrderLabels={fieldOrderLabels} submitLabel={submitLabel} />
        </div>
    );
};

export default RegisterProject;