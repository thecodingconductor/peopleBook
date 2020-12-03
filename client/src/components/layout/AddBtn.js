import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddNewContactModal from '../../components/contacts/AddNewContactModal';

const AddBtn = () => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <Button className="d-flex align-items-center justify-content-center" style={{ marginBottom: "1rem" }} onClick={() => console.log('showmodal')}>
                <span className="button-text" onClick={handleShow}>Create new Contact</span>
                <i className="large material-icons">add</i>
            </Button>
            <AddNewContactModal show={show} handleClose={handleClose} />

        </div>
    )
}

export default AddBtn
