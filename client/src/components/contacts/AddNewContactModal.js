import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


const AddNewContactModal = ({ show, handleClose }) => {



    return (
        <Fragment>
            <Modal show={show} onHide={handleClose} id="add-contact-modal">
                <Modal.Header>
                    <Modal.Title>
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Youre reading ModalBody Text</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleClose}>Save</Button>
                </Modal.Footer>

            </Modal>
        </Fragment>
    )
}

export default AddNewContactModal;
