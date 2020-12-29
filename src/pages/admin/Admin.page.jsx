import React from 'react';

// Icons
import { ExpandMoreOutlined } from '@material-ui/icons';

// Core
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ClientForm, UserForm } from '../../components/forms';
import { Main } from '../../components/layout';

const AdminPage = () => (
    <Main>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined color="primary" />}
            >
                <Typography color="primary">
                    Client aanmaken
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ClientForm />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined color="primary" />}
            >
                <Typography color="primary">
                    Gebruiker aanmaken
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <UserForm />
            </AccordionDetails>
        </Accordion>
    </Main>
);

export default AdminPage;