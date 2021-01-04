import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import { useMutation } from '@apollo/client';

// Icons
import { ChevronRight, RecordVoiceOver } from '@material-ui/icons';

// Core
import { Box, Button, Typography } from '@material-ui/core';
import { SelectField } from '../fields';
import { SHIFTS } from '../../constants/general.const';

// GraphQL
// import { CREATE_CLIENT_FILE } from '../../graphql';

const ObservationForm = ({ handleNext }) => {
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
      handleNext();

    //   await createClient({ variables: { ...values } });
    };

    const observations = [];

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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

            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button type="submit" variant="outlined" color="primary" endIcon={<ChevronRight />}>
                    Verder
                </Button>
            </Box>
        </form>
    );
};

ObservationForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
};

export default ObservationForm;