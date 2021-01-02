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
                    {client.name}
                </Typography>
                <Typography variant="body2">
                    {client.email}
                </Typography>
                <Typography variant="body2">
                    {client.address}
                </Typography>
                <Typography variant="body2">
                    {client.postal_code}
                </Typography>
                <Typography variant="body2">
                    {client.city}
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