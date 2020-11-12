import React, { Fragment } from 'react';
import cancel from './cancel.svg';

const Cancel = () => {
    return (
        <Fragment>
            <img src={cancel} alt="Close" style={{ height: "1rem", width: "1rem" }} />
        </Fragment>
    )
}

export default Cancel;