import React from 'react';
import { useQuery } from '@apollo/client';

// Core
import { Box, CircularProgress } from '@material-ui/core';
import { Main } from '../../components/layout';

// GraphQl
import { GET_CLIENT_FORM_VALUES } from '../../graphql';
import { ClientFileForm } from '../../components/forms';

const GetClientFormValues = () => {
  const { loading, data } = useQuery(GET_CLIENT_FORM_VALUES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading: true, clientFormValues: [] };
  return (data && { loading: false, clientFormValues: data.getClients }) || [];
};

const CreateDossierPage = () => {
  const { clientFormValues, loading } = GetClientFormValues();

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;
  return (
    <Main>
        <ClientFileForm clients={clientFormValues} />
    </Main>
  )
};

export default CreateDossierPage;
