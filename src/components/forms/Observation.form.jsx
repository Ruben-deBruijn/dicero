import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import SpeechRecognition from 'react-speech-recognition';

// Icons
import { ChevronRight, PostAdd, Warning } from '@material-ui/icons';

// Core
import { Box, Button, Dialog, DialogContent, Divider, IconButton, Typography } from '@material-ui/core';
import { Dictaphone } from '../../components';
import { TextField } from '../fields';

// GraphQL
import { UPDATE_OBSERVATION_FILE, CREATE_OBSERVATION } from '../../graphql';
import { isIOS } from '../../helpers/general.helper';

const ObservationForm = ({ handleNext }) => {
    const location = useLocation();
    const fileId = location.state && location.state.id;
    const { enqueueSnackbar } = useSnackbar();
    const { handleSubmit, errors, control, setValue, watch } = useForm({
        defaultValues: { note: '' },
    });
    const noteWatcher = watch('note');

    const [dialog, setDialog] = useState(false);
    const [observations, setObservations] = useState([]);

    const getTranscript = transcript => {
        setValue("note", transcript);
    };

    const clearTextField = async() => {
        await setValue("note", '');
    };

    const [addObservation] = useMutation(CREATE_OBSERVATION, {
        onCompleted: data => {
            const newObservations = observations.concat([data.addObservation]);
            setObservations(newObservations);
            enqueueSnackbar(`Observatie toegevoegd!`, { variant: 'success' });
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const onObservationSubmit = async values => {
        await addObservation({ 
            variables: { 
                description: values.note, 
            },
        });
    };

    const [updateObservationFile] = useMutation(UPDATE_OBSERVATION_FILE, {
        onCompleted: data => {
            enqueueSnackbar(`Het observatiedossier is geüpdate!`, { variant: 'success' });
        },
        onError: () => { enqueueSnackbar(`Er ging iets verkeerd!`, { variant: 'error' }); },
      });

    const handleUpdateAndNext = async () => {
        const normalizedObservations = observations.map(item => item.id);
        await updateObservationFile({
            variables: {
                id: fileId,
                observations: normalizedObservations,
            }
        });
        handleNext();
    }

    return (
        <Fragment>
            <Box flexDirection="column" justifyContent="space-between" height="inherit">
                <Box my={2}>
                    <Box py={1} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="primary">
                            Observaties
                        </Typography>
                        <IconButton
                            size="small"
                            color="secondary" 
                            variant="outlined" 
                            onClick={() => setDialog(true)}
                        >
                            <PostAdd />
                        </IconButton>
                    </Box>

                    <Divider />

                    <Box my={2} display="flex" flexDirection="column" alignItems="center">
                        {observations && observations.length ? (
                            observations.map((item, index) => (
                                <Box key={item.id} display="flex" flexDirection="column" alignItems="flex-start" py={1} width="100%">
                                    <Typography variant="body2" gutterBottom color="primary">
                                        {`Observatie ${index + 1}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {item.description}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="caption" align="center" paragraph>
                                Er zijn nog geen observaties toegevoegd
                            </Typography>
                        )}
                    </Box>
                </Box>
                    
                <Box width="100%" display="flex" justifyContent="flex-end" py={2}>
                    <Button
                        onClick={handleUpdateAndNext} 
                        variant="contained"
                        disabled={observations.length === 0}
                        fullWidth
                        color="primary" 
                        endIcon={<ChevronRight />}
                    >
                        Verder
                    </Button>
                </Box>
            </Box>

            <Dialog open={dialog} maxWidth="md" fullWidth>
                <DialogContent>
                    <Box my={1}>
                        {SpeechRecognition.browserSupportsSpeechRecognition() && !isIOS() ? (
                        <Dictaphone handleCallback={getTranscript} clearTextField={clearTextField} />
                        ) : (
                            <Box p={1} display="flex" flexDirection="column">
                                <Box display="flex" alignItems="center" pb={1}>
                                    <Warning fontSize="small" color="error" style={{ marginRight: 8 }} />
                                    <Typography variant="caption">Let op!</Typography>
                                </Box>
                                    <Typography variant="caption">
                                        Opnames worden niet ondersteund door uw browser, handmatige invoer ingeschakeld.
                                    </Typography>
                             </Box>
                        )}
                    </Box>
                    <Divider />
                    <Box my={2}>
                        <form onSubmit={handleSubmit(onObservationSubmit)}>
                            <Controller
                                as={TextField}
                                fullWidth
                                name="note"
                                multiline
                                rows={4}
                                disabled={noteWatcher === '' && SpeechRecognition.browserSupportsSpeechRecognition() && !isIOS()}
                                label="Notitie"
                                control={control}
                                errors={errors}
                                required
                            />
                            <Box display="flex" justifyContent="space-between" pt={2}>
                                <Button 
                                    type="submit" 
                                    color="secondary" 
                                    variant="contained"
                                    disabled={!noteWatcher}
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