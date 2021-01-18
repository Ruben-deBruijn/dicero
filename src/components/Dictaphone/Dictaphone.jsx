import React from 'react';
import PropTypes from'prop-types';
import { useHistory } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// Icons
import { Autorenew, Mic, Stop } from '@material-ui/icons'

// Core
import { Box, IconButton } from '@material-ui/core'
import { OVERVIEW_PATH } from '../../routes/paths'

const Dictaphone = ({ handleCallback, clearTextField }) => {
  const history = useHistory();

  const commands = [
    {
      command: 'Ga naar overzicht',
      callback: () => history.push(OVERVIEW_PATH),
    },
    {
      command: 'Open nieuw observatiedossier',
      callback: () => history.push(OVERVIEW_PATH),
      isFuzzyMatch: true,
    },
  ];

  const { transcript, resetTranscript, listening } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const handleRecording = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'nl-NL' });
  };

  const handleStopRecording = async() => {
    await SpeechRecognition.stopListening();
    handleCallback(transcript);
  }

  const handleReset = () => {
    resetTranscript();
    handleCallback(transcript);
    clearTextField();
  };

  return (
    <Box display="flex" justifyContent='space-between' p={1}>
      <IconButton color="secondary" disabled={listening} onClick={handleRecording}><Mic /></IconButton>
      <IconButton color="secondary" onClick={handleStopRecording} disabled={!listening}><Stop /></IconButton>
      <IconButton color="secondary" onClick={handleReset} disabled={listening}><Autorenew /></IconButton>
    </Box>
  )
};

Dictaphone.propTypes = {
  handleCallback: PropTypes.func,
  clearTextField: PropTypes.func,
};

export default Dictaphone;