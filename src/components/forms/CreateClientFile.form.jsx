import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';

// Icons
import { ChevronRight } from '@material-ui/icons';

// Core
import { Box, Button } from '@material-ui/core';
import { SelectField } from '../fields';
import { SHIFTS } from '../../constants/general.const';

// GraphQL
import { CREATE_CLIENT_FILE } from '../../graphql/clientfile/ClientFile.mutations';

const CreateClientFileForm = ({ clients, handleNext }) => {
    const { handleSubmit, errors, control } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    const clientValues = clients;

    const [createClientFile] = useMutation(CREATE_CLIENT_FILE, {
        onCompleted: data => {
            enqueueSnackbar(`Nieuwe cliënt toegevoegd!`, { variant: 'success' });
              handleNext(data.addClientFile.id);
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const handleSubmitForm = async values => {
      values.user = values.client;
      values.observations = [];
      await createClientFile({ variables: { ...values } });
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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

            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button type="submit" variant="outlined" color="primary" endIcon={<ChevronRight />}>
                    Verder
                </Button>
            </Box>
        </form>
    );
};

CreateClientFileForm.propTypes = {
    clients: PropTypes.array.isRequired,
    handleNext: PropTypes.func.isRequired,
};

export default CreateClientFileForm;