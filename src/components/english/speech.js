import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  stopListening: PropTypes.func
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
  findWitchSpeech
}) => {
  if (!browserSupportsSpeechRecognition) { //Jika browser tidak support
    return null;
  }

  const calling = () => {
      console.log("Calling");
      findWitchSpeech(transcript);  //Parsing word dari voice
      resetTranscript();    //Reset Word pada form
      stopListening();      //Hentikan Listening
  }

  return (
    <div>
      <button 
        onMouseDown={startListening}
        onMouseUp={()=>calling()}
        onMouseLeave={stopListening}
      >Listen</button>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

var options = { //Matikan fitur autostart Voice
    autoStart: false
}

export default SpeechRecognition(options)(Dictaphone);