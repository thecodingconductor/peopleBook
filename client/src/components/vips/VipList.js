import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import VipItem from '../vips/VipItem';

const VipList = () => {

    // const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const { loadUser, user, loading } = authContext;


    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])


    if (user !== null && user.VIPS.length === 0) {
        return <p className="text-secondary text-muted">Please add some VIPS</p>
    }


    // if (user.VIPS !== null || user.VIPS.length === 0) {
    //     return <h4>Please Add Vips</h4>
    // }

    return (

        <Fragment>

            {user !== null && !loading ? user.VIPS.map(vip => (
                <VipItem key={vip._id} contact={vip}></VipItem>
            )) :
                <Spinner />
            }
        </Fragment>
    )
}

export default VipList;