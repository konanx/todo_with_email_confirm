import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    onClick={SpeechRecognition.startListening}
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const AddNewTask = () => {
  const [newTask, setNewTask] = useState();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Twoja przeglądarka nie wspiera zamiany tekstu na mowę :</span>;
  }
  useEffect(() => {
    setNewTask(transcript);
  }, [transcript]);
  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}
      <Search
        // placeholder="input search text"
        enterButton="Dodaj"
        value={newTask}
        onChange={(e: any) => setNewTask(e.target.value)}
        size="large"
        suffix={suffix}
        // onSearch={onSearch}
      />
    </div>
  );
};

export default AddNewTask;
