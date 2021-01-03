import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

// Core
import { Box, CircularProgress, Typography } from '@material-ui/core';

// GraphQL
import { GET_CLIENT } from '../../../graphql';

const GetClientById = id => {
    const { loading, data } = useQuery(GET_CLIENT, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, client: {} };
    return (data && { loading: false, client: data.getClient }) || [];
};

const DetailView = ({ id, type }) => {
    const { client, loading } = (id !== undefined && type === 'client') && GetClientById(id);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;

    return (
        <Fragment>
            {client && (
            <Box>
                <Typography color="primary" gutterBottom>
                   {`${client.first_name} ${client.last_name}`}
                </Typography>
                <Typography variant="body2">
                    {client.birthday}
                </Typography>
                <Typography variant="body2">
                    {client.contact_person}
                </Typography>
            </Box>
            )}
            {!client && (<CircularProgress color="secondary" />)}
        </Fragment>
    );
};

DetailView.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
};

export default DetailView;