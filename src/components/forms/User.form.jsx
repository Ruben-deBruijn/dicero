import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';

// Core
import { Box, Button } from '@material-ui/core';
import { SelectField, TextField } from '../fields';

// GraphQL
import { CREATE_USER } from '../../graphql';
import { JOB_TITLES } from '../../constants/general.const';

const UserForm = () => {
    const { handleSubmit, errors, control } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted: data => {
            console.log(data);
            enqueueSnackbar(`Nieuwe gebruiker toegevoegd!`, { variant: 'success' });
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const handleSubmitForm = async values => {
      console.log(values);

      await createUser({ variables: { ...values } });
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

                <Controller
                    as={SelectField}
                    items={JOB_TITLES}
                    name="job_title"
                    label="Functie"
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

export default UserForm;