import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

// Core
import { Box, CircularProgress, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';

// GraphQL
import { GET_CLIENT } from '../../../graphql';
import ListPair from '../ListPair/ListPair';

const GetClientById = id => {
    const { loading, data } = useQuery(GET_CLIENT, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, client: {} };
    return (data && { loading: false, client: data.getClient }) || [];
};

const DetailView = ({ id, type, content }) => {
    const { client, loading } = (id !== undefined && type === 'client') && GetClientById(id);
    const createdAt = content && new Date(content.createdAt);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;

    return (
        <Fragment>
            {client && (
                <List>
                    <Box py={2} display="flex" flexDirection="column">
                        <ListPair
                            dense
                            primary="Naam"
                            secondary={`${client.first_name} ${client.last_name}`}
                        />
                        <ListPair
                            dense
                            primary="Geboortedatum"
                            secondary={client.birthday}
                        />
                        <ListPair
                            dense
                            primary="Contactpersoon"
                            secondary={client.contact_person}
                        />
                    </Box>
                </List>
            )}

            {content && (
                <List>
                    <Typography gutterBottom color="primary" style={{ fontWeight: 600 }}>
                        Clientgegevens
                    </Typography>
                    <Divider />
                    <Box py={2} display="flex" flexDirection="column">
                        <ListPair
                            dense
                            primary="Naam"
                            secondary={`${content.client.first_name} ${content.client.last_name}`}
                        />
                        <ListPair
                            dense
                            primary="Geboortedatum"
                            secondary={content.client.birthday}
                        />
                        <ListPair
                            dense
                            primary="Contactpersoon"
                            secondary={content.client.contact_person}
                        />
                    </Box>

                    <Typography gutterBottom color="primary" style={{ fontWeight: 600 }}>
                        Observaties
                    </Typography>
                    <Divider />
                    <Box py={2} display="flex" flexDirection="column">
                        {content.observations.map(({ id, description }, index) => (
                            <Box key={id} pb={1}>
                                <Typography variant="body2" color="primary" gutterBottom style={{ fontWeight: 600 }}>
                                    {`${index + 1}.`}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Typography gutterBottom color="primary" style={{ fontWeight: 600 }}>
                        Dossierinformatie
                    </Typography>    
                    <Divider />
                    <Box py={2} display="flex" flexDirection="column">
                        <ListPair
                            dense
                            primary="Dienst"
                            secondary={content.shift}
                        />
                        <ListPair
                            dense
                            primary="Verzorgende"
                            secondary={content.user ? content.user.name : 'Onbekend'}
                        />
                        <ListPair
                            dense
                            primary="Datum & tijdstip"
                            secondary={createdAt.toLocaleString('nl-NL')}
                        />
                    </Box>
                </List>
            )}
            {(!client && !content) && (<CircularProgress color="secondary" />)}
        </Fragment>
    );
};

DetailView.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.object,
};

export default DetailView;