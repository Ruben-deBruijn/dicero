import React, { Fragment, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

// Core
import { Box, Button, CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core';
import { Main } from '../../components/layout';

// GraphQl
import { GET_CLIENT_FORM_VALUES } from '../../graphql';
import { CreateClientFileForm, ObservationForm } from '../../components/forms';
import { Description, NoteAdd, RecordVoiceOver } from '@material-ui/icons';
import { Prompt, useLocation } from 'react-router-dom';
import { CREATE_DOSSIER_PATH } from '../../routes/paths';

const GetClientFormValues = () => {
  const { loading, data } = useQuery(GET_CLIENT_FORM_VALUES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading: true, clientFormValues: [] };
  return (data && { loading: false, clientFormValues: data.getClients }) || [];
};

const CreateDossierPage = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = param => {
    if (param) {
      console.log(param);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { clientFormValues, loading } = GetClientFormValues();

  const createDossierSteps = [
    {
      label: 'Dossier aanmaken',
      icon: <NoteAdd />,
    },
    {
      label: 'Observaties',
      icon: <RecordVoiceOver />,
    },
    {
      label: 'Dossier compleet melden',
      icon: <Description />,
    },
  ];

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <CreateClientFileForm clients={clientFormValues} handleNext={handleNext} />;
      case 1:
        return <ObservationForm handleNext={handleNext} />;
      case 2:
        return <p>Observaties</p>;
      default:
        return 'Unknown';
    }
  }

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;

  return (
    <Fragment>
      <Box bgcolor="#fff" m={2} p={2} borderRadius={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {createDossierSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                disabled
                style={{ fontSize: 6 }}
                icon={step.icon}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

          <div>
            {getStepContent(activeStep)}
          </div>
      </Box>

      <Prompt
        message={promptLocation => {
          if (promptLocation.pathname !== location.pathname) {
            return "Weet je zeker dat je de pagina wilt verlaten? Het dossier gaat mogelijk verloren.";
          }
          return null;
        }}
      />
    </Fragment>
  )
};

export default CreateDossierPage;
