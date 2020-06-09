import React, { useState, useContext,  } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import RoundedButton from "../../../components/modules/RoundedButton.js"
import { UserContext } from "../../../providers/UserProvider.js";
import { requestToJoin } from "../../../api.js";


const JoinRequest = ({projectID}) => {
    const [show, setShow] = useState(false);
    const userProvider = useContext(UserContext);
    const [message, setMessage ] = useState("");

    let handleSubmit = (event) => {
        event.preventDefault();
        requestToJoin(message, projectID, userProvider.user.token)
            .then((resp) => {
                alert("Message sent!");
                setMessage("");
                setShow(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <RoundedButton label="Join" bgcolor="#13133A" callback={() => setShow(true)} >
                Volunteer
            </RoundedButton>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        You're about to request to join
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <b> Are you sure? The project owner will be alerted.</b>
                        <p> You can include a note about why you're interested and anything else
                            the project owner should know.
                        </p>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            
                            <TextField
                                id="message"
                                label="Message"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                helperText="What do you like about this project?"
                                multiline
                                value={message}
                                onInput={e => setMessage(e.target.value)}
                                rows={4}
                                rowsMax={6}
                            />
                            <Button
                             type="submit"
                            > Send Request </Button>
                        </form>
                    </>
                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default JoinRequest;
