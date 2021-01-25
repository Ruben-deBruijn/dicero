import React from 'react';
import PropTypes from'prop-types';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// Icons
import { Autorenew, Mic, Stop, Warning } from '@material-ui/icons'

// Core
import { Box, IconButton, Typography } from '@material-ui/core'

const Dictaphone = ({ handleCallback, clearTextField }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition()

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

  if (SpeechRecognition.browserSupportsSpeechRecognition()) return (
    <Box p={1} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" pb={1}>
        <Warning fontSize="small" color="error" style={{ marginRight: 8 }} />
        <Typography variant="caption">Let op!</Typography>
      </Box>
      <Typography variant="caption">
        Opnames worden niet ondersteund door uw browser, handmatige invoer ingeschakeld.
      </Typography>
    </Box>
  )

  return (
    <Box display="flex" justifyContent='space-between' p={1}>
      <IconButton color="secondary" disabled={listening} onClick={handleRecording}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height={50}>
          <Mic />
          <Typography variant="caption">
            Start
          </Typography>
        </Box>
      </IconButton>
      <IconButton color="secondary" onClick={handleStopRecording} disabled={!listening}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height={50}>
          <Stop />
          <Typography variant="caption">
            Stop
          </Typography>
        </Box>
      </IconButton>
      <IconButton color="secondary" onClick={handleReset} disabled={listening || !transcript}>
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height={50}>
          <Autorenew />
          <Typography variant="caption">
            Reset
          </Typography>
        </Box>
      </IconButton>
    </Box>
  )
};

Dictaphone.propTypes = {
  handleCallback: PropTypes.func,
  clearTextField: PropTypes.func,
};

export default Dictaphone;