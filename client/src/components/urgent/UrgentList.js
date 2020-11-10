import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import UrgentItem from '../urgent/UrgentItem';
import AuthContext from '../../context/auth/authContext';
import { v4 as uuidv4 } from 'uuid';

const UrgentList = () => {

    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const { loadUser, user } = authContext;

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])


    // if (urgent.length === 0) {
    //     return <h4>Please Add Urgent Contacts</h4>
    // }

    return (
        <Fragment>
            {user ? user.toDoList.map(contact => (
                <UrgentItem key={`${uuidv4()}`} contact={contact}></UrgentItem>
            )) :
                <h1>
                    Error</h1>}
        </Fragment>
    )
}

export default UrgentList;