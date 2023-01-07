import { useState, useEffect, useContext } from "react";
import { RouterProvider } from "react-router";
import Root from "./routes/root";
import { createBrowserRouter } from "react-router-dom";
import Logowanie from "./components/Logowanie/Logowanie";
import { SocketContext } from "./components/contexts/Main";
import io from "socket.io-client";

const SERVER = "http://127.0.0.1:10005/";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  { path: "/logowanie", element: <Logowanie /> },
]);

function App() {
  const [socket, setSocket] = useState<any>();
  useEffect(() => {
    setSocket(io(SERVER, { transports: ["websocket"] }));
  }, []);
  return (
    <div className="App">
      <SocketContext.Provider value={[socket]}>
        <RouterProvider router={router} />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
