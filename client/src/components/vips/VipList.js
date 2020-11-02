import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import VipItem from '../vips/VipItem';

const VipList = () => {

    const contactContext = useContext(ContactContext);

    const { vips } = contactContext;

    if (vips.length === 0) {
        return <h4>Please Add Vips</h4>
    }

    return (
        <Fragment>
            {vips.map(vip => (
                <VipItem key={vip.id} contact={vip}></VipItem>
            )

            )}
        </Fragment>
    )
}

export default VipList;