import React, { useEffect, useState } from 'react';

// Core
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Box, 
    Button, 
    CircularProgress,
    Dialog, 
    DialogActions, 
    DialogContent, 
    IconButton, 
    Typography, 
    Zoom 
} from '@material-ui/core';
import { ExpandMoreOutlined, InfoOutlined } from '@material-ui/icons';
import { DetailView, Main } from '../../components/layout';
import { GET_OBSERVATION_FILES } from '../../graphql/observation_file/ObservationFile.queries';
import { useMutation, useQuery } from '@apollo/client';
import { GetFilteredDossiers } from '../../helpers/general.helper';
import { DELETE_OBSERVATION_FILE } from '../../graphql/observation_file/ObservationFile.mutations';

const GetObservationFiles = () => {
    const { loading, data } = useQuery(GET_OBSERVATION_FILES, {
      fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, observationFiles: [] };
    const removeEmpty = data.getObservationFiles.filter(file => file.observations.length === 0);
    const validFiles = data.getObservationFiles.filter(file => file.observations.length >= 1);
    return (data && { loading: false, observationFiles: validFiles, trash: removeEmpty }) || [];
};

const OverviewPage = () => {
    const { loading, observationFiles, trash } = GetObservationFiles();
    const observationFilesFiltered = observationFiles && GetFilteredDossiers(observationFiles);
    const { morningDossiers, afternoonDossiers, eveningDossiers, nightDossiers } = observationFilesFiltered || {};
    const [dialog, setDialog] = useState({ open: false, dossier: null});

    const setDetailView = dossier => {
        setDialog({
            open: true,
            dossier,
        });
    };

    const [deleteObservationFile] = useMutation(DELETE_OBSERVATION_FILE, {
        onCompleted: data => {
            console.log(data.deleteObservationFile);
        },
        onError: error => { console.log(error); }, 
    });

    // Not so clean at all, prevents filling DB with useless files
    useEffect(() => {
        if (trash && trash.length > 0) {
            for (let i = 0; i < trash.length; i += 1) {
                deleteObservationFile({
                   variables: {
                       id: trash[i].id,
                   },
           });
           }
        }
    }, [trash && trash.length > 0]);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" >
            <CircularProgress color="secondary" />
        </Box>
    );
    
    if (observationFiles.length === 0) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" >
            <Typography>
                Oeps, er zijn nog geen observatiedossiers!
            </Typography>
        </Box>
    );

    return (
        <Main transparent>
            <Box>
                {morningDossiers && morningDossiers.length > 0 && (
                    <Accordion defaultExpanded={morningDossiers.length <= 2}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlined color="primary" />}
                        >
                        <Typography color="primary">
                            {`Ochtend (${morningDossiers.length})`}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" width="100%">
                                {morningDossiers.map(dossier => (
                                    <Box key={dossier.id} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2">
                                            {`${dossier.client.first_name} ${dossier.client.last_name}`}
                                        </Typography>
                                        <IconButton size="small" color="primary" onClick={() => setDetailView(dossier)}>
                                            <InfoOutlined />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )}

                {afternoonDossiers && afternoonDossiers.length > 0 && (
                    <Accordion defaultExpanded={afternoonDossiers.length <= 2}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlined color="primary" />}
                        >
                        <Typography color="primary">
                            {`Middag (${afternoonDossiers.length})`}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" width="100%">
                                {afternoonDossiers.map(dossier => (
                                    <Box key={dossier.id} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2">
                                            {`${dossier.client.first_name} ${dossier.client.last_name}`}
                                        </Typography>
                                        <IconButton size="small" color="primary" onClick={() => setDetailView(dossier)}>
                                            <InfoOutlined />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )}

                {eveningDossiers && eveningDossiers.length > 0 && (
                    <Accordion defaultExpanded={eveningDossiers.length <= 2}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlined color="primary" />}
                        >
                        <Typography color="primary">
                            {`Avond (${eveningDossiers.length})`}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" width="100%">
                                {eveningDossiers.map(dossier => (
                                    <Box key={dossier.id} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2">
                                            {`${dossier.client.first_name} ${dossier.client.last_name}`}
                                        </Typography>
                                        <IconButton size="small" color="primary" onClick={() => setDetailView(dossier)}>
                                            <InfoOutlined />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )}

                {nightDossiers && nightDossiers.length > 0 && (
                    <Accordion defaultExpanded={nightDossiers.length <= 2}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreOutlined color="primary" />}
                        >
                        <Typography color="primary">
                            {`Nacht (${nightDossiers.length})`}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column" width="100%">
                                {nightDossiers.map(dossier => (
                                    <Box key={dossier.id} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2">
                                            {`${dossier.client.first_name} ${dossier.client.last_name}`}
                                        </Typography>
                                        <IconButton size="small" color="primary" onClick={() => setDetailView(dossier)}>
                                            <InfoOutlined />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Box>

            <Dialog 
                open={dialog.open}
                onClose={() => setDialog({ open: false, dossier: null })}
                fullWidth 
                maxWidth="xl" 
                TransitionComponent={Zoom}
            >
                <DialogContent>
                    <DetailView content={dialog.dossier} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="outlined" onClick={() => setDialog({ open: false, dossier: null })}>
                        Sluiten
                    </Button>
                </DialogActions>
            </Dialog>
        </Main>
    );
};

export default OverviewPage;
