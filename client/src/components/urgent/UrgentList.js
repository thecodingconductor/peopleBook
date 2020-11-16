import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import UrgentItem from '../urgent/UrgentItem';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import { v4 as uuidv4 } from 'uuid';

const UrgentList = () => {

    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const { loadUser, user, loading } = authContext;



    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    if (user !== null && user.toDoList.length === 0) {
        return <p className="text-secondary text-muted">Please add some Urgent Contacts</p>
    }

    // if (user.toDoList !== null || user.toDoList.length === 0) {
    //     return <h4>Please Add Urgent Contacts</h4>
    // }

    return (
        <Fragment>
            {user !== null && !loading ? user.toDoList.map(contact => (
                <UrgentItem key={`${uuidv4()}`} contact={contact}></UrgentItem>
            )) :
                <Spinner />}
        </Fragment>
    )
}

export default UrgentList;