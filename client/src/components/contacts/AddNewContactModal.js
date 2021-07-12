import React, { Fragment, useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import OrganizationContext from '../../context/organization/organizationContext';
import { Modal, Button, Form } from 'react-bootstrap';



const AddNewContactModal = ({ show, handleClose }) => {

    const contactContext = useContext(ContactContext);

    const organizationContext = useContext(OrganizationContext);

   
    const { createNewContact, current} = contactContext;
    const { filterOrganizations, clearOrgFilter, filtered, getOrganizations } = organizationContext;



    useEffect(() => {
        getOrganizations();
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                organization: '',
                position: '',
                addToVIP: false
            });
        }

        // eslint-disable-next-line
    }, [contactContext, current]);

 


    const [contact, setContact] = useState({
        name: '',
        organization: '',
        position: '',
        addToVIP: false
    });

    const { name, organization, position, addToVIP } = contact;

    const onChange = e => {

        // Handling the form entry -- also performing the dynamic org search
        setContact({ ...contact, [e.target.name]: e.target.value });

        // Handle checbox state
        if (e.target.name === 'addVIP' && e.target.checked === true) {
            setContact({ ...contact, addToVIP: true })
        } else if (e.target.name === 'addVIP' && e.target.checked === false) {
            setContact({ ...contact, addToVIP: false });
        }

        // Dynamic Org Search
        if (e.target.name === 'organization' && e.target.value !== '') {
            filterOrganizations(e.target.value);
        } else if (e.target.value === '') {
            clearOrgFilter();
        }

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        // Add New Contact to Database
        createNewContact(contact, addToVIP);

        handleClose();
    }

    // Move seleted org to Form Field/State
    const setOrgField = e => {
        setContact({ ...contact, organization: e.target.textContent });
        clearOrgFilter();
    }

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose} id="add-contact-modal">
                <Modal.Header>
                    <Modal.Title>
                        Create new contact
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text"
                                name='name'
                                value={name}
                                onChange={onChange}
                                placeholder="Please enter contact name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Organization
                            </Form.Label>

                            <Form.Control type="text"
                                name="organization"
                                onChange={onChange}
                                value={organization}
                                placeholder="Please enter contact organization" />
                        </Form.Group>
                        {/* Dynamic Org Search */}
                        {filtered &&

                            <div className=" org-filter-result">
                                <ul className="d-flex flex-column align-items-flex-start justify-content-flex-start">
                                    {filtered.map(item => <li key={item._id} onClick={setOrgField}>{item.name}</li>)}
                                </ul>
                            </div>
                        }


                        <Form.Group>
                            <Form.Label>
                                Position
                            </Form.Label>
                            <Form.Control type="text"
                                name="position"
                                value={position}
                                onChange={onChange}
                                placeholder="Please enter contact position" />
                        </Form.Group>

                        <div className="check-box-container move-to-urgent-container">
                            <input type="checkbox" name="addVIP" id="addToVIP" className="remove-vip-checkbox move-to-urgent-checkbox" onChange={onChange} />
                            <label htmlFor="addToVIP">Add new contact to VIPS</label>
                        </div>
                        <Form.Group>
                            <Button type="submit">Save</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </Fragment>
    )
}

export default AddNewContactModal;
