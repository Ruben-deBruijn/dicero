import React from 'react';

// Core
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { Main } from '../layout';
import { Topbar } from '../navigation';

// Styles
import { useAppStyles } from './App.style';

const App = () => {
  const classes = useAppStyles() ;

  return (
    <div className={classes.wrapper}>
      <Topbar />
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
      </Main>
    </div>
  )
};

export default App;
