import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

// Icons
import { CheckBox, CheckBoxOutlineBlank, ChevronRight } from '@material-ui/icons';

// Core
import { Box, Button, Checkbox, CircularProgress, Divider, Typography } from '@material-ui/core';
import { TextField } from '../fields';

// GraphQL
import { GET_OBSERVATION_FILE } from '../../graphql';

const GetObservationFile = id => {
    const { loading, data } = useQuery(GET_OBSERVATION_FILE, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, observationFile: [] };
    return (data && { loading: false, observationFile: data.getObservationFile }) || [];
  };

const OverviewForm = ({ handleNext }) => {
    const location = useLocation();
    const { handleSubmit, errors, control } = useForm();
    const { enqueueSnackbar } = useSnackbar();

    // const dossierId = location.search && location.search.slice(1);
    // const { loading, observationFile } = GetObservationFile(dossierId);

    // if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;

    const handleSubmitForm = async values => {
        console.log(values);
    };

    return (
        <Fragment>
            {/* <Box py={2}>
                <Typography variant="body2">
                    <b>Naam: </b>
                    {`${observationFile.client.first_name} ${observationFile.client.last_name}`}
                </Typography>
                <Typography variant="body2">
                    <b>Geboortedatum: </b>
                    {observationFile.client.birthday}
                </Typography>
                <Typography variant="body2">
                    <b>Tijdvak observatie: </b>
                    {observationFile.shift}
                </Typography>
                <Typography variant="body2">
                    <b>Zorgverlener: </b>
                    {observationFile.user && observationFile.user.name || '-'}
                </Typography>
            </Box> */}

            <Box py={2}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Typography color="primary" gutterBottom>
                        Observaties
                    </Typography>

                    <Divider />

                    <Box display="flex" py={2} alignItems="center">
                        <Controller
                            as={Checkbox}
                            size="small"
                            icon={<CheckBoxOutlineBlank color="primary" />}
                            color="secondary"
                            control={control}
                            errors={errors}
                            required
                        />
                        <Typography variant="caption">
                            Ik heb het dossier nagekeken en bevestig dat de ingevoerde gegevens juist zijn.
                        </Typography>
                    </Box>


                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="outlined" color="primary" endIcon={<ChevronRight />}>
                            Bevestigen
                        </Button>
                    </Box>
                </form>
            </Box>
        </Fragment>
    );
};

OverviewForm.propTypes = {
    handleNext: PropTypes.func,
};

export default OverviewForm;