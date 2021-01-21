import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';

// Core
import { DetailView, Main } from '../../components/layout';
import { GET_OBSERVATION_FILES } from '../../graphql/observation_file/ObservationFile.queries';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Zoom } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';

const GetObservationFiles = () => {
  const { loading, data } = useQuery(GET_OBSERVATION_FILES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading: true, observationFiles: [] };
  return (data && { loading: false, content: data.getObservationFiles }) || [];
};

const DossierListPage = () => {
const { loading, content } = GetObservationFiles();
const [dialog, setDialog] = useState({ open: false, content: null });

if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;
  return (
    <Main>
      <List>
          {content.map((dossier, index) => (
              <Fragment key={dossier.client.id}>
                <ListItem disableGutters>
                    <ListItemText 
                        primary={`${dossier.client.first_name} ${dossier.client.last_name}`}
                        primaryTypographyProps={{
                            variant: 'body2'
                        }}
                    />
                    <ListItemSecondaryAction>
                        <IconButton color="primary" edge="end" onClick={() => setDialog({ open: true, content: dossier })}>
                            <InfoOutlined />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                {((index + 1 !== content.length) && (
                    <Box>
                        <Divider />
                    </Box>
                ))}
              </Fragment>
          ))}
      </List>

      <Dialog 
          open={dialog.open} 
          fullWidth 
          maxWidth="xl" 
          TransitionComponent={Zoom}
      >
          <DialogContent>
              <DetailView type="client" content={dialog.content} />
          </DialogContent>
          <DialogActions>
              <Button color="primary" variant="outlined" onClick={() => setDialog({ open: false, content: null })}>
                  Sluiten
              </Button>
          </DialogActions>
      </Dialog>
    </Main>
  )
};

export default DossierListPage;
