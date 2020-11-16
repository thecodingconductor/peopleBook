import React, { Fragment, useContext, useRef } from 'react';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import Form from 'react-bootstrap/Form';


const CurrentOrgSearch = () => {

    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);
    const { filtered, filteredByOrg, clearFilteredByOrg, filterContacts, clearContactFilter, filterFilteredContacts } = contactContext;


    const text = useRef('');


    const onChange = e => {
        if (text.current.value !== '') {
            filterFilteredContacts(e.target.value);
        } else {
            clearFilteredByOrg();
        }
    }


    // useEffect(() => {
    //     if(filtered === null) {

    //     }
    // })



    return (
        <Form className="contacts-search-form">
            <Form.Group>
                <Form.Label>
                    Search Contacts by Name or Position
                </Form.Label>
                <Form.Control size="lg" type="text" ref={text} placeholder="Filter Contacts..." onChange={onChange}></Form.Control>
            </Form.Group>
        </Form>
    )
}

export default CurrentOrgSearch;