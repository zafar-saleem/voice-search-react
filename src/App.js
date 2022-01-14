import { useState } from "react";
import './App.css';

function App() {
  const [recognition] = useState(new window.webkitSpeechRecognition());
  const [isShow, setIsShow] = useState(false);
  const [saidText, setSaidText] = useState("");

  const startRecording = () => {
    setIsShow(true);
    recognition.start();
  };

  const stopRecording = () => {
    setIsShow(false);
    recognition.stop();
  };

  recognition.onresult = function (event) {
    let spokenText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        spokenText = event.results[i][0].transcript;
      } else {
        spokenText += event.results[i][0].transcript;
      }
    }

    setSaidText(spokenText);
  };

  recognition.onend = function (event) {
    setIsShow(false);
    recognition.stop();
  };

  return (
    <div>
      <label>
        Search
        <input type="text" defaultValue={saidText} />
      </label>
      <button
        type="button"
        id="start"
        className={!isShow ? `show` : `hide`}
        onClick={startRecording}
      >
        Start
      </button>
      <button
        type="button"
        id="stop"
        className={isShow ? `show` : `hide`}
        onClick={stopRecording}
      >
        Stop
      </button>
    </div>
  );
}

export default App;
