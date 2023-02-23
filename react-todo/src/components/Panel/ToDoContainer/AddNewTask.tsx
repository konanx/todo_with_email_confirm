import React, { useState, useEffect, useContext } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Input, Space } from "antd";
import { AudioOutlined, CloseOutlined } from "@ant-design/icons";
import { SocketContext } from "../../contexts/Main";
import { AuthObiectSessionStorageIE } from "../../../interfaces";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
const { Search } = Input;
const suffix = (
  <div className="" onClick={SpeechRecognition.startListening}>
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  </div>
);
const suffixOn = (
  <CloseOutlined
    onClick={() => {
      SpeechRecognition.stopListening();
    }}
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const AddNewTask = () => {
  const [socket] = useContext<any>(SocketContext);
  const listId = useSelector(
    (state: RootState) => state.selectedTodoList.selected
  );
  console.log(listId);
  const [newTask, setNewTask] = useState<any>();
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
  const handleAddNewTask = () => {
    let raw_user: AuthObiectSessionStorageIE | string = sessionStorage.getItem(
      "auth"
    ) as string;
    let user = JSON.parse(raw_user);
    let NewTask: any = {
      name: newTask,
      userId: user.id,
      listId: listId,
    };
    socket.emit("addNewTask", NewTask);
  };
  return (
    <div>
      <Search
        placeholder="Nazwa taska"
        enterButton="Dodaj"
        value={newTask}
        onChange={(e: any) => setNewTask(e.target.value)}
        size="large"
        suffix={listening ? suffixOn : suffix}
        onSearch={() => handleAddNewTask()}
      />
    </div>
  );
};

export default AddNewTask;
