import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import React from 'react';

// Core
import { Topbar } from '../layout';

// Styles
import { useAppStyles } from './App.style';

const App = () => {
  const classes = useAppStyles() ;

  return (
    <div className={classes.wrapper}>
      <Topbar />
      <Box p={2} height="100%" width="100%">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
          >
            <Typography color="primary">
              Ochtend
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
          >
            <Typography color="primary">
              Middag
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
          >
            <Typography color="primary">
              Avond
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quod. Modi dicta consequatur ipsa officia non? Sed saepe porro ipsa?
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  )
};

export default App;
