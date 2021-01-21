import React, { useState } from 'react';

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
import { useQuery } from '@apollo/client';
import { GetFilteredDossiers } from '../../helpers/general.helper';

const GetObservationFiles = () => {
    const { loading, data } = useQuery(GET_OBSERVATION_FILES, {
      fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, observationFiles: [] };
    return (data && { loading: false, observationFiles: data.getObservationFiles }) || [];
};

const OverviewPage = () => {
    const { loading, observationFiles } = GetObservationFiles();
    const observationFilesFiltered = observationFiles && GetFilteredDossiers(observationFiles);
    const { morningDossiers, afternoonDossiers, eveningDossiers, nightDossiers } = observationFilesFiltered || {};
    const [dialog, setDialog] = useState({ open: false, dossier: null});
    const setDetailView = dossier => {
        setDialog({
            open: true,
            dossier,
        });
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" >
            <CircularProgress color="secondary" />
        </Box>
    );

    if (!observationFiles) return (
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
