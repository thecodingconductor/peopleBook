import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';

const Organizations = () => {
    const organizationContext = useContext(OrganizationContext);
    const { organizations, filtered, getOrganizations } = organizationContext;

    useEffect(() => {
        getOrganizations();
        // eslint-disable-next-line
    }, [])


    if (organizations === null || organizations.length === 0) {
        return <h4>Please add some Organizations</h4>
    }


    return (

        <Fragment>
            {filtered !== null ?
                filtered.map(organization => (<OrganizationItem key={organization.id} organization={organization} />)) :
                organizations.map(organization => (<OrganizationItem key={organization.id} organization={organization} />))}

        </Fragment>
    )
}

export default Organizations;