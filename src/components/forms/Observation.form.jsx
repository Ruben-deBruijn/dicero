import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';

// Icons
import { ChevronRight, Mic, RecordVoiceOver } from '@material-ui/icons';

// Core
import { Box, Button, Dialog, DialogActions, DialogContent, Divider, Typography } from '@material-ui/core';
import { Dictaphone } from '../../components';
import { TextField } from '../fields';

// GraphQL
import { UPDATE_OBSERVATION_FILE, CREATE_OBSERVATION, GET_OBSERVATION_FILE } from '../../graphql';

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

const ObservationForm = ({ handleNext }) => {
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    const observationFileId = location.state && location.state.id;
    const { observationFile, loading } = GetObservationFile(observationFileId);

    const { handleSubmit, errors, control, setValue, watch } = useForm({
        defaultValues: { observation: '' },
    });
    const observationWatcher = watch('observation');

    // const [updateObservationFile] = useMutation(UPDATE_OBSERVATION_FILE, {
    //     onCompleted: data => {
    //         console.log(data);
    //         enqueueSnackbar(`Nieuwe cliënt toegevoegd!`, { variant: 'success' });
    //     },
    //     onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
    //   });

    const [addObservation] = useMutation(CREATE_OBSERVATION, {
        onCompleted: data => {
            enqueueSnackbar(`Observatie toegevoegd!`, { variant: 'success' });
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const onObservationSubmit = async values => {
        await addObservation({ 
            variables: { 
                description: values.observation, 
            },
        });
    };

    const [dialog, setDialog] = useState(false);

    const getTranscript = transcript => {
        setValue("observation", transcript);
    };

    const clearTextField = async() => {
        await setValue("observation", '');
    };

    if (loading) return 'Loading...';

    return (
        <Fragment>
                <Box my={2}>
                    <Box py={4}>
                        <Typography color="primary" gutterBottom>
                            Observaties
                        </Typography>

                        <Divider />

                        <Box my={2} display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="body2" align="center" paragraph>
                                Er zijn nog geen observaties toegevoegd
                            </Typography>
                        </Box>

                        <Divider />

                        <Box my={2}>
                            <Button
                                size="small"
                                color="secondary" 
                                variant="outlined" 
                                startIcon={<RecordVoiceOver />} 
                                onClick={() => setDialog(true)}
                            >
                                Nieuwe observatie
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box width="100%" display="flex" justifyContent="flex-end">
                    <Button onClick={handleNext} variant="outlined" color="primary" endIcon={<ChevronRight />}>
                        Verder
                    </Button>
                </Box>

            <Dialog open={dialog} maxWidth="md" fullWidth>
                <DialogContent>
                    <Box my={1}>
                        <Dictaphone handleCallback={getTranscript} clearTextField={clearTextField} />
                    </Box>
                    <Divider />
                    <Box my={2}>
                        <form onSubmit={handleSubmit(onObservationSubmit)}>
                            <Controller
                                as={TextField}
                                fullWidth
                                // disabled
                                name="observation"
                                label="Observatie"
                                control={control}
                                errors={errors}
                                required
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Button 
                                    type="submit" 
                                    color="secondary" 
                                    variant="contained"
                                    disabled={!observationWatcher}
                                    onClick={() => setDialog(false)}
                                >
                                    Opslaan
                                </Button>
                                <Button 
                                    color="primary" 
                                    variant="outlined"
                                    onClick={() => { clearTextField(); setDialog(false); }}
                                >
                                    Sluiten
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

ObservationForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
};

export default ObservationForm;