import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import VipItem from '../vips/VipItem';

const VipList = () => {

    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);

    const { user } = authContext;
    console.log(user);
    console.log(user.VIPS);

    // console.log(user.VIPS);



    if (user.VIPS.length === 0) {
        return <h4>Please Add Vips</h4>
    }

    return (

        // <Fragment>
        //     <h1>
        //         Error
        //     </h1>
        // </Fragment>
        <Fragment>
            {user.VIPS.map(vip => (
                <VipItem key={vip._id} contact={vip}></VipItem>
            )

            )}
        </Fragment>
    )
}

export default VipList;