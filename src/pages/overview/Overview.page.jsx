import React from 'react';

// Core
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { Main } from '../../components/layout';


const OverviewPage = () => {

  return (
    <Main>
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined color="primary" />}
            >
            <Typography color="primary">
                Ochtend
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined color="primary" />}
            >
            <Typography color="primary">
                Middag
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined color="primary" />}
            >
            <Typography color="primary">
                Avond
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined color="primary" />}
            >
            <Typography color="primary">
                Nacht
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
            </AccordionDetails>
        </Accordion>
    </Main>
  )
};

export default OverviewPage;
