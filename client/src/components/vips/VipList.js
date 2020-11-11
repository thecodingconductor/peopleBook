import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import VipItem from '../vips/VipItem';

const VipList = () => {

    // const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const { loadUser, user } = authContext;


    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    // if (user) {
    //     console.log(user)
    // } else {
    //     console.log('no user');
    // }

    // if (user.VIPS.length === 0) {
    //     return <h4>Please Add Vips</h4>
    // }

    return (


        <Fragment>
            {user ? user.VIPS.map(vip => (
                <VipItem key={vip._id} contact={vip}></VipItem>
            )

            ) :

                <Fragment>
                    <h1>
                        Error
                    </h1>
                </Fragment>
            }
        </Fragment>
    )
}

export default VipList;