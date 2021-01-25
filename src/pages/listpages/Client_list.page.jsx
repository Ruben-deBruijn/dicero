import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';

// Icons
import { InfoOutlined, Search } from '@material-ui/icons';

// Core
import { DetailView, Main } from '../../components/layout';

// GraphQL
import { GET_CLIENTS } from '../../graphql';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, Zoom } from '@material-ui/core';

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
            <Box pb={1}>
                <Typography variant="caption">
                    {`Totaal: ${clients.length}`}
                </Typography>
            </Box>
            <Divider />
            <List>
                {clients.map((client, index) => (
                    <Fragment key={client.id}>
                        <ListItem disableGutters>
                            <ListItemText 
                                primary={`${client.first_name} ${client.last_name}`}
                                primaryTypographyProps={{
                                    variant: 'body2'
                                }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton color="primary" edge="end" onClick={() => setDialog({ open: true, id: client.id })}>
                                    <InfoOutlined />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        
                        {((index + 1 !== clients.length) && (
                            <Box>
                                <Divider />
                            </Box>
                        ))}
                    </Fragment>
                ))}
            </List>
        </Main>

        <Dialog 
            open={dialog.open} 
            fullWidth 
            maxWidth="xl" 
            TransitionComponent={Zoom}
        >
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
