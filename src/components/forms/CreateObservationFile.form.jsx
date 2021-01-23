import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

// Icons
import { ChevronRight } from '@material-ui/icons';

// Core
import { Box, Button } from '@material-ui/core';
import { SelectField } from '../fields';
import { SHIFTS } from '../../constants/general.const';
import { UserContext } from '../../providers/User.provider';

// GraphQL
import { CREATE_OBSERVATION_FILE } from '../../graphql/observation_file/ObservationFile.mutations';

const CreateObservationFileForm = ({ clients, handleNext }) => {
    const history = useHistory();
    const { handleSubmit, errors, control } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const { userState } = useContext(UserContext);

    const clientValues = clients;

    const [createObservationFile] = useMutation(CREATE_OBSERVATION_FILE, {
        onCompleted: data => {
            enqueueSnackbar(`Nieuwe cliënt toegevoegd!`, { variant: 'success' });
            history.push({ state: { id: data.addObservationFile.id }})
            handleNext();
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const handleSubmitForm = async values => {
      values.user = userState.id;
      values.observations = [];
      await createObservationFile({ variables: { ...values } });
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box py={2}>
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
            </Box>

            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button type="submit" variant="outlined" color="primary" endIcon={<ChevronRight />}>
                    Verder
                </Button>
            </Box>
        </form>
    );
};

CreateObservationFileForm.propTypes = {
    clients: PropTypes.array.isRequired,
    handleNext: PropTypes.func.isRequired,
};

export default CreateObservationFileForm;