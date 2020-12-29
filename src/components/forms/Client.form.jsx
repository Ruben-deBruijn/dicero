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
            console.log(data);
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
                    name="name"
                    label="Naam"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="email"
                    label="E-mailadres"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="address"
                    label="Adres"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="postal_code"
                    label="Postcode"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Controller
                    as={TextField}
                    name="city"
                    label="Stad"
                    control={control}
                    errors={errors}
                    required
                    fullWidth
                />

                <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Aanmaken
                </Button>
            </Box>
        </form>
    );
};

export default ClientForm;