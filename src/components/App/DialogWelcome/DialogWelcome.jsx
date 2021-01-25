import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

// Icons
import { KeyboardArrowLeft, KeyboardArrowRight, Mic } from '@material-ui/icons';

// Core
import { Box, Button, Dialog, DialogContent, MobileStepper, Slide, Typography } from '@material-ui/core';
import { UserContext } from '../../../providers/User.provider';
import { SelectField } from '../../fields';
import { UserForm } from '../../forms';

// GraphQL
import { GET_USERS } from '../../../graphql';

const GetUsers = () => {
  const { loading, data } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { usersLoading: true, users: [] };
  return (data && { usersLoading: false, users: data.getUsers }) || [];
};

const DialogWelcome = () => {
  const { users, loading } = GetUsers();
  const { userState, setUser } = useContext(UserContext);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onUserSelect = values => {
    const selectedUser = users.filter(user => user.id === values);
    setUser(selectedUser[0]);
  };

  if (loading) return 'Loading...';

  return (
    <Dialog 
        open={!userState}
        fullWidth
        maxWidth="xl"
    >
        <DialogContent>
        <Box>
            
            {activeStep === 0 && (
            <Slide direction="right" in={activeStep === 0} timeout={{ enter: 500 }}>
                <Box minHeight={300}>
                    <Typography variant="h6" color="primary" paragraph>
                        Welkom bij de Dicero demo!
                    </Typography>

                    <Typography variant="body2" paragraph>
                        Omdat Dicero vol in de ontwikkeling is, ondersteunt Dicero momenteel een beperkt aantal browsers.
                        <ul>
                            <li>Chrome (Desktop & Android)</li>
                            <li>Microsoft Edge</li>
                            <li>Android Webview</li>
                            <li>Samsung Internet</li>
                        </ul>
                    </Typography>
                </Box>
            </Slide>
            )}

            {activeStep === 1 && (
                <Slide direction="right" in={activeStep === 1} timeout={{ enter: 500 }}>
                    <Box minHeight={300}>
                        <Typography variant="h6" color="primary" paragraph>
                            Voor je verder gaat
                        </Typography>

                        <Typography variant="body2" paragraph>
                            Dicero maakt gebruik van audio opnames en spraakbesturing, daarom is er toestemming nodig om je microfoon te gebruiken.
                        </Typography>

                        <Typography variant="body2" paragraph>
                            Bij het starten van een audio opname zal je webbrowser je vragen om <b>Toestemming</b>, deze dien je te <b>Accepeteren</b> om gebruik te maken van alle functionaliteiten van Dicero.
                        </Typography>

                        <Typography variant="body2" paragraph>
                            Krijg je deze melding niet? Ga dan naar <b>Instellingen</b> in je browser om je microfoon te activeren.
                        </Typography>
                    </Box>
                </Slide>
            )}

            {activeStep === 2 && (
                <Slide direction="right" in={activeStep === 2} timeout={{ enter: 500 }}>
                    <Box minHeight={300}>
                        <Typography variant="h6" color="primary" paragraph>
                            Moeiteloos navigeren
                        </Typography>

                        <Typography variant="body2" gutterBottom>
                            Dicero maakt navigeren makkelijker dan ooit.
                        </Typography>

                        <Typography variant="body2" paragraph>
                            Door middel van een <b>Commando</b> kan je navigeren en allerlei acties uitvoeren!
                        </Typography>

                        <Typography variant="body2" paragraph>
                            Zoek in de navigatiebalk onderin je scherm naar het volgende icoon <span style={{ position: 'relative', bottom: -5 }}><Mic fontSize="small" /></span>
                        </Typography>

                        <Typography variant="body2" paragraph>
                            Wanneer je op de knop met het icoon klikt, wordt deze groen en is de microfoon <b style={{ color: 'green' }}>Actief</b>. U kunt nu een <b>Commando</b> inspreken.
                        </Typography>

                        <Typography variant="body2">
                            Dicero beschikt over de volgende commando's:
                            <ul style={{ marginBottom: 0 }}>
                                <li style={{ paddingBottom: 8 }}>"<i>Ga naar overzicht</i>"<br />Dicero navigeert naar het <b>Algemene overzicht</b></li>
                                <li style={{ paddingBottom: 8 }}>"<i>Ga naar cliëntenoverzicht</i>"<br />Dicero navigeert naar het <b>Cliëntenoverzicht</b></li>
                                <li style={{ paddingBottom: 8 }}>"<i>Ga naar dossieroverzicht</i>"<br />Dicero navigeert naar het <b>Dossieroverzicht</b></li>
                                <li style={{ paddingBottom: 8 }}>"<i>Open nieuw observatiedossier</i>" <br />Dicero start een nieuw <b>Observatiedossier</b></li>
                            </ul>
                        </Typography>
                    </Box>
                </Slide>
            )}  

            {activeStep === 3 && (
            <Slide direction="right" in={activeStep === 3} timeout={{ enter: 500 }}>
                <Box minHeight={300}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Je bent er bijna..
                    </Typography>
                    <Typography variant="body2" paragraph>
                        Om verder te gaan, selecteer een gebruiker
                    </Typography>

                    <SelectField
                        margin="dense"
                        fullWidth
                        disabled={users.length === 0}
                        label="Gebruiker" 
                        items={users}
                        value={(userState && userState.id) || ''}
                        onChange={event => onUserSelect(event.target.value)}
                    />
                    <Typography variant="body2" color="primary" style={{ fontWeight: 600 }} gutterBottom>
                        Nog niet geregistreerd?
                    </Typography>
                    <Typography variant="body2">
                        Maak nu een nieuwe gebruiker aan!
                    </Typography>

                    <UserForm auth />
                </Box>
            </Slide>
            )}

            <MobileStepper
                style={{ backgroundColor: 'transparent', padding: '16px 0px 0px 0px' }}
                variant="dots"
                steps={4}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
                    Volgende
                    <KeyboardArrowRight />
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Vorige
                </Button>
                }
            />
        </Box>
        </DialogContent>
    </Dialog>
  )
};

export default DialogWelcome;
