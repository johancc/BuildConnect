import React, { useState, useContext, } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import RoundedButton from "../../../components/modules/RoundedButton.js"
import { UserContext } from "../../../providers/UserProvider.js";
import { requestMentor } from "../../../api.js";

const MentorRequestButton = ({ mentor }) => {
    const [show, setShow] = useState(false);
    const userProvider = useContext(UserContext);
    const [message, setMessage] = useState("");

    let handleSubmit = (event) => {
        event.preventDefault();

        requestMentor(message, mentor, userProvider.user.token)
            .then((resp) => {
                alert("Message Sent!");
                setMessage("");
                setShow(false);
                console.log(resp);
            })
            .catch((err) => {
                alert("Unable to request a mentor. Please try again later.");
                console.log(err);
            })
    };

    return (
        <>
            <RoundedButton label="Request Mentorship" bgcolor="#13133A" callback={() => setShow(true)} >
                Request Mentorship
            </RoundedButton>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {mentor.name}
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <h5>{mentor.longBio}</h5>
                        <br/>
                        <p>You can include a personalized message to {mentor.name}: </p>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                                id="message"
                                label="Message"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                helperText="What should the mentor know about your project?"
                                multiline
                                value={message}
                                onInput={e => setMessage(e.target.value)}
                                rows={4}
                                rowsMax={6}
                            />
                            <Button
                                type="submit">
                                Request
                            </Button>
                        </form>
                    </>

                </Modal.Body>
            </Modal>
        </>
    )
}
export default MentorRequestButton;