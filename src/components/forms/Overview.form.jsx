import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';

// Icons
import { CheckBoxOutlineBlank } from '@material-ui/icons';

// Core
import { Box, Button, CircularProgress, Divider, Typography } from '@material-ui/core';
import { CheckboxField } from '../fields';
import { OVERVIEW_PATH } from '../../routes/paths';
import ListPair from '../layout/ListPair/ListPair';

// GraphQL
import { GET_OBSERVATION_FILE } from '../../graphql';

const GetObservationFile = id => {
    const { loading, data } = useQuery(GET_OBSERVATION_FILE, {
        variables: {
            id,
        },
        fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, observationFile: {} };
    return (data && { loading: false, observationFile: data.getObservationFile }) || [];
  };

const OverviewForm = () => {
    const location = useLocation();
    const history = useHistory();
    
    const { handleSubmit, watch, control } = useForm();
    const confirmationWatcher = watch('confirm');

    const fileId = location.state && location.state.id;
    const { loading, observationFile } = GetObservationFile(fileId);
    const { client, user, observations, shift } = observationFile;

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" >
            <CircularProgress color="secondary" />
        </Box>
    );

    const handleSubmitForm = values => {
        if (values.confirm) {
            history.push(OVERVIEW_PATH);
        }
    };

    return (
        <Fragment>
            <Box pt={3}>
                <Typography color="primary" gutterBottom>
                    Dossiergegevens
                </Typography>
            </Box>
            <Divider />
            <Box py={3}>
                <ListPair
                    dense
                    primary="Cliënt"
                    secondary={`${client.first_name} ${client.last_name}`}
                />
                <ListPair
                    dense
                    primary="Geboortedatum"
                    secondary={client.birthday}
                />
                <ListPair
                    dense
                    primary="Tijdvak"
                    secondary={shift}
                />
                <ListPair
                    dense
                    primary="Zorgverlener"
                    secondary={user.name}
                />
            </Box>

            <Box pb={2}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Typography color="primary" gutterBottom>
                        Observaties
                    </Typography>

                    <Divider />

                    <Box py={3}>
                        {observations && observations.map(({ id, description }, index) => (
                            <Box key={id} display="flex" flexDirection="column" alignItems="flex-start" py={2} width="100%">
                                <Typography variant="body2" gutterBottom color="primary">
                                    {`Observatie ${index + 1}`}
                                </Typography>
                                <Typography variant="body2">
                                    {description}
                                </Typography>
                            </Box>
                        ))}
                        {observations.length < 1 && (
                            <Typography variant="caption" align="center">
                                Er zijn observaties opgeslagen
                            </Typography>
                        )}
                    </Box>
                    <Divider/>           
                    <Box display="flex" py={3} alignItems="center">
                        <Controller
                            as={CheckboxField}
                            name="confirm"
                            size="small"
                            icon={<CheckBoxOutlineBlank color="primary" />}
                            color="secondary"
                            control={control}
                            required
                        />
                        <Typography variant="caption">
                            Ik heb het dossier nagekeken en bevestig dat de ingevoerde gegevens juist zijn.
                        </Typography>
                    </Box>


                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <Button
                            fullWidth
                            disabled={!confirmationWatcher} 
                            type="submit" 
                            variant="contained"
                            color="primary" 
                        >
                            Bevestigen
                        </Button>
                    </Box>
                </form>
            </Box>
        </Fragment>
    );
};

export default OverviewForm;