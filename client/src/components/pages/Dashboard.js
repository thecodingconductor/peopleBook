import React, { Fragment, useContext, useEffect } from 'react';
import UrgentList from '../urgent/UrgentList';
import VipList from '../vips/VipList';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import NavContext from '../../context/nav/navContext';
// import OrganizationContext from '../../context/organization/organizationContext';
import AddBtn from '../../components/layout/AddBtn';
import AddNewContactModal from '../../components/contacts/AddNewContactModal';
import { Container, Row, Button } from 'react-bootstrap';


const Dashboard = () => {

    const authContext = useContext(AuthContext);
    const navContext = useContext(NavContext);
    const contactContext = useContext(ContactContext);
    

    const { user, addToVIPS } = authContext;
    const { current, clearCurrent } = contactContext;
    const { showModal, hideModalFunc } = navContext;

    useEffect(() => {

        if (showModal) {
            hideModalFunc();
        }

        if (current) {
            addToVIPS(current, user._id);
            clearCurrent();
        }

        // eslint-disable-next-line
    }, [current])

    return (
        <Fragment>
            <div className="d-flex justify-content-start align-items-center welcome-message-container">
                <h5>Hello, {user && user.name.split(' ')[0]}</h5>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center dashbord-main-container">
                <div className="d-flex flex-column justify-content-center align-items-center urgent-tasks-container">
                    <h6>Urgent Tasks</h6>
                    <div className="d-flex flex-column justify-content-center align-items-center urgent-tasks">
                        <UrgentList />
                    </div>

                </div>
                <div className="d-flex flex-column justify-content-center align-items-center next-seven-days-container">
                    <h6>Next 7 Days</h6>
                    <div className="d-flex flex-column justify-content-center align-items-center upcoming-items">
                        <VipList />
                    </div>

                </div>
                <AddBtn />
                <AddNewContactModal />
            </div>


            <Container className="bottom-buttons">
                <Row>
                    <Button variant="primary" href="/organizations" block style={{ width: "85%", margin: 'auto' }} className="to-organization-button">View All Organizations</Button>
                </Row>
            </Container>

        </Fragment>

    )
}


export default Dashboard;