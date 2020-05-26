import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";

function JoinRequest() {
    const [show, setShow] = useState(false);

    const [message, setMessage ] = useState("");

    let handleSubmit = (event) => {
        alert("Messsage sent!")
        event.preventDefault();
    }
    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)} >
                Volunteer
            </Button>
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
                        <form noValidate autoComplete="off">
                            
                            <TextField
                                id="message"
                                label="Message"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                helperText="What do you like about this project?"
                                multiline
                                rows={4}
                                rowsMax={6}
                            />
                        </form>
                    </>
                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default JoinRequest;
