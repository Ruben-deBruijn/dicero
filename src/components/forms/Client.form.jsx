import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';

// Core
import { Box, Button } from '@material-ui/core';
import { TextField } from '../fields';

// GraphQL
import { CREATE_CLIENT } from '../../graphql';

const ClientForm = () => {
    const { handleSubmit, errors, control } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const [createClient] = useMutation(CREATE_CLIENT, {
        onCompleted: data => {
            enqueueSnackbar(`Nieuwe cliënt toegevoegd!`, { variant: 'success' });
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const handleSubmitForm = async values => {
      console.log(values);

      await createClient({ variables: { ...values } });
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box>
                <Controller
                    as={TextField}
                    name="first_name"
                    label="Voornaam"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="last_name"
                    label="Achternaam"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="birthday"
                    label="Geboortedatum"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="contact_person"
                    label="Contactpersoon"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Aanmaken
                </Button>
            </Box>
        </form>
    );
};

export default ClientForm;