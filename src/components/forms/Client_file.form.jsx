import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import { useMutation } from '@apollo/client';

// Icons
import { RecordVoiceOver } from '@material-ui/icons';

// Core
import { Box, Button, Typography } from '@material-ui/core';
import { SelectField } from '../fields';
import { SHIFTS } from '../../constants/general.const';

// GraphQL
// import { CREATE_CLIENT_FILE } from '../../graphql';

const ClientFileForm = ({ clients }) => {
    const { handleSubmit, errors, control, watch } = useForm();
    // const { enqueueSnackbar } = useSnackbar();

    // const [createClient] = useMutation(CREATE_CLIENT, {
    //     onCompleted: data => {
    //         console.log(data);
    //         enqueueSnackbar(`Nieuwe cliënt toegevoegd!`, { variant: 'success' });
    //     },
    //     onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
    //   });

    const handleSubmitForm = async values => {
      console.log(values);

    //   await createClient({ variables: { ...values } });
    };

    const clientValues = clients;
    const observations = [];
    const selectedClient = watch('client');

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box borderRadius={4} bgcolor="#fff" p={2}>
                <Controller
                    as={SelectField}
                    name="client"
                    label="Cliënt"
                    items={clientValues}
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={SelectField}
                    name="shift"
                    label="Dienst"
                    items={SHIFTS}
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Box my={2}>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        startIcon={<RecordVoiceOver />} 
                        fullWidth
                    >
                        Nieuwe observatie
                    </Button>
                    <Box py={2}>
                    {observations.length > 0 ? (
                        observations
                    ) :
                    (
                        <Typography variant="body2" align="center">
                            Er zijn nog geen observaties toegevoegd
                        </Typography>
                    )}
                    </Box>
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Aanmaken
                </Button>
            </Box>
        </form>
    );
};

ClientFileForm.propTypes = {
    clients: PropTypes.array.isRequired,
};

export default ClientFileForm;