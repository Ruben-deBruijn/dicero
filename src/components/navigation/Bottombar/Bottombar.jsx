import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useHistory } from 'react-router-dom';

// Icons
import MicIcon from '@material-ui/icons/Mic';

// Core
import { Box, Fab, useTheme } from '@material-ui/core';
import { ADMIN_PATH, CLIENT_LIST_PATH, CREATE_DOSSIER_PATH, DOSSIER_LIST_PATH, OVERVIEW_PATH } from '../../../routes/paths';

const Bottombar = () => {
    const theme = useTheme();
    const history = useHistory();
    
    const commands = [
        {
            command: 'Ga naar overzicht',
            callback: () => history.push(OVERVIEW_PATH),
        },
        {
            command: 'Ga naar cliënten overzicht',
            callback: () => history.push(CLIENT_LIST_PATH),
        },
        {
            command: 'Ga naar dossieroverzicht',
            callback: () => history.push(DOSSIER_LIST_PATH),
        },
        {
            command: 'Open nieuw observatiedossier',
            callback: () => history.push(CREATE_DOSSIER_PATH),
            isFuzzyMatch: true,
        },
        {
            command: 'Ga naar administratie',
            callback: () => history.push(ADMIN_PATH),
        },
      ];

    const { listening } = useSpeechRecognition({ commands })

    const handleListener = () => {
        SpeechRecognition.startListening({ language: 'nl-NL' });
    };

    return (
        <Box width="100%" height={55} position="fixed" bottom={0} bgcolor="#0C3C60" boxShadow={2} display="flex" justifyContent="center">
            <Fab 
                size="medium" 
                style={{ position: 'relative', top: -24, backgroundColor: listening ? theme.palette.success.main : theme.palette.secondary.main }}
                onClick={handleListener}
            >
                <MicIcon />
            </Fab>
        </Box>
    )
};

export default Bottombar;