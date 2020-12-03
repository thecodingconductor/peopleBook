import React from 'react';
import { Button } from 'react-bootstrap';

const AddBtn = () => {





    return (
        <div>
            <Button className="d-flex align-items-center justify-content-center" style={{ marginBottom: "1rem" }} onClick={() => console.log('showmodal')}>
                <span className="button-text">Create new Contact</span>
                <i className="large material-icons">add</i>
            </Button>

        </div>
    )
}

export default AddBtn
