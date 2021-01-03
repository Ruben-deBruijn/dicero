import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';

// Icons
import { Search } from '@material-ui/icons';

// Core
import { DetailView, Main } from '../../components/layout';

// GraphQL
import { GET_CLIENTS } from '../../graphql';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Zoom } from '@material-ui/core';

const GetClients = () => {
    const { loading, data } = useQuery(GET_CLIENTS, {
      fetchPolicy: 'cache-and-network',
    });
  
    if (loading) return { loading: true, clients: [] };
    return (data && { loading: false, clients: data.getClients }) || [];
};

const ClientListPage = () => {
  const { clients, loading } = GetClients();
  const [dialog, setDialog] = useState({ open: false, id: null });

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%" ><CircularProgress color="secondary" /></Box>;

  return (
      <Fragment>
        <Main>
            <List>
                {clients.map(client => (
                    <ListItem key={client.id}>
                        <ListItemText 
                            primary={client.name}
                            primaryTypographyProps={{
                                color: 'primary'
                            }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => setDialog({ open: true, id: client.id })}>
                                <Search />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Main>

        <Dialog open={dialog.open} fullWidth maxWidth="md" TransitionComponent={Zoom}>
            <DialogContent>
                <DetailView type="client" id={dialog.id} />
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="outlined" onClick={() => setDialog({ open: false })}>
                    Sluiten
                </Button>
            </DialogActions>
        </Dialog>
      </Fragment>
  )
};

export default ClientListPage;
