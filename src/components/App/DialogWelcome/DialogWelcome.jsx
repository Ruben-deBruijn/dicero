import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

// Icons
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

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
                <div>
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
                </div>
            </Slide>
            )}
            {activeStep === 1 && (
            <Slide direction="right" in={activeStep === 1} timeout={{ enter: 500 }}>
                <div>
                <Typography variant="h6" color="primary" gutterBottom>
                    U bent er bijna..
                </Typography>
                <Typography variant="body2" paragraph>
                    Om verder te gaan, selecteer een gebruiker
                </Typography>

                <SelectField
                    margin="dense"
                    fullWidth
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
                </div>
            </Slide>
            )}
            <MobileStepper
                style={{ backgroundColor: 'transparent', padding: '16px 0px 0px 0px' }}
                variant="dots"
                steps={2}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
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
