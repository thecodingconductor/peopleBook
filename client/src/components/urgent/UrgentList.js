import React, { Fragment, useContext, useEffect } from 'react'
import UrgentItem from '../urgent/UrgentItem';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const UrgentList = () => {


    const authContext = useContext(AuthContext);
    const { loadUser, user, loading } = authContext;



    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    if (user !== null && user.toDoList.length === 0) {
        return <p className="text-secondary text-muted">Please add some Urgent Contacts</p>
    }


    return (
        <Fragment>
            {user !== null && !loading ? user.toDoList.map(contact => (
                <UrgentItem key={contact._id} contact={contact}></UrgentItem>
            )) :
                <Spinner />}
        </Fragment>
    )
}

export default UrgentList;