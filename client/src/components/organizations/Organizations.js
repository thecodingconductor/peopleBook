import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';

const Organizations = () => {
    const organizationContext = useContext(OrganizationContext);
    const { organizations } = organizationContext;

    if (organizations.length === 0) {
        return <h4>Please add some Organizations</h4>
    }

    console.log(organizations);
    return (

        <Fragment>
            {organizations.map(organization => (<OrganizationItem key={organization.id} organization={organization} />)

            )}
        </Fragment>
    )
}

export default Organizations;