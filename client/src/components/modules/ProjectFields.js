/**
 * Fields used when creating or editing a project listing.
 */
import fieldGenerator from "./FieldGenerator.js";

export const getProjectNameField = (formik) => {
    return fieldGenerator("project Name", formik, 4);
};

export const getTweetDescriptionField = (formik) => {
    return fieldGenerator("tweet Description", formik, 8);
}

export const getDescriptionField= (formik) => {
    return fieldGenerator("description", formik, 12);
}

export const getLinkField = (formik) => {
    return fieldGenerator("link", formik, 6);
};

export const getTeamDescriptionField = (formik) => {
    return fieldGenerator("team Description", formik, 10);
};

export const getTeamSizeField = (formik) => {
    return fieldGenerator("team Size", formik, 2);
}

export const getContactInfoField = (formik) => {
    return fieldGenerator("contact Info", formik, 6);
};

export const getSkillsNeededField = (formik) => {
    return fieldGenerator("skills Needed", formik, 12);
    /*
    return (
        <Form.Group as={Col} controlId="validationSkills">
            <Form.Label>Skills Need to Help</Form.Label>
            <Select
                value={formik.values.skillsNeeded}
                className={!!formik.errors.subjects && formik.touched.subjects ? "is-invalid" : ""}
                onChange={(selected) => formik.setFieldValue("skillsNeeded", selected)}
                isInvalid={formik.touched.subjects && formik.errors.subjects}
                onBlur={() => formik.setFieldTouched("skillsNeeded")}
                options={["Coding", "Writing", "Breathin"]}
                isMulti
            />
            <div className="invalid-feedback">{formik.errors.skillsNeeded}</div>
        </Form.Group>
    );*/
};


export const getPeopleField = (formik) => {
    return 
    // TODO: This should be an array of people
    // When the user hits enter a new person should be added.
}

export const getHelpNeededField = (formik) => {
    return fieldGenerator("help Needed", formik, 12, "What help are you looking for?")
};

