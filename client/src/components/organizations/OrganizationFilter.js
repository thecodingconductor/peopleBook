import React, { useContext, useRef, useEffect } from 'react';
import OrganizationContext from '../../context/organization/organizationContext';
import Form from 'react-bootstrap/Form';

const OrganizationFilter = () => {

    const organizationContext = useContext(OrganizationContext);
    const { filterOrganizations, clearOrgFilter, filtered } = organizationContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = e => {
        if (text.current.value !== '') {
            filterOrganizations(e.target.value);
        } else {
            clearOrgFilter();
        }
    }


    return (
        <Form>
            <Form.Group>
                <Form.Label>Search By Organization Name or Group Number</Form.Label>
                <Form.Control size="lg" type="text" ref={text} placeholder="Filter Organizations" onChange={onChange} />
            </Form.Group>
        </Form>
    )
}

export default OrganizationFilter