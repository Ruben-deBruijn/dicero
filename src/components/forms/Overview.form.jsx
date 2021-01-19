import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';

// Icons
import { CheckBoxOutlineBlank, ChevronRight } from '@material-ui/icons';

// Core
import { Box, Button, CircularProgress, Divider, Typography } from '@material-ui/core';

// GraphQL
import { GET_OBSERVATION_FILE } from '../../graphql';
import { CheckboxField } from '../fields';
import { OVERVIEW_PATH } from '../../routes/paths';

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
            <Box py={2}>
                <Typography variant="body2">
                    <b>Naam: </b>
                    {`${client.first_name} ${client.last_name}`}
                </Typography>
                <Typography variant="body2">
                    <b>Geboortedatum: </b>
                    {client.birthday}
                </Typography>
                <Typography variant="body2">
                    <b>Tijdvak observatie: </b>
                    {shift}
                </Typography>
                <Typography variant="body2">
                    <b>Zorgverlener: </b>
                    {user && user.name || '-'}
                </Typography>
            </Box>

            <Box py={2}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Typography color="primary" gutterBottom>
                        Observaties
                    </Typography>

                    <Divider />

                    <Box py={2}>
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
                    </Box>

                    <Box display="flex" py={2} alignItems="center">
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
                            disabled={!confirmationWatcher} 
                            type="submit" 
                            variant="outlined" 
                            color="primary" 
                            endIcon={<ChevronRight />}
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