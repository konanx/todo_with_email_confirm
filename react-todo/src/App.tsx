import { useState, useEffect, useContext } from "react";
import "regenerator-runtime/runtime";
import { RouterProvider } from "react-router";
import Root from "./routes/root";
import { createBrowserRouter } from "react-router-dom";
import Logowanie from "./components/Logowanie/Logowanie";
import { SocketContext } from "./components/contexts/Main";
import io from "socket.io-client";
import Rejestracja from "./components/Logowanie/Rejestracja";
import RouteNotFound from "./components/RouteNotFound";
import RejestracjaConfirm from "./components/Logowanie/RejestracjaConfirm";
import SnackAlert from "./SnackAlert";
import Panel from "./components/Panel/Panel";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ServerOffline from "./ServerOffline";
const SERVER = "http://127.0.0.1:10005/";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Logowanie />,
  },
  { path: "/register", element: <Rejestracja /> },
  { path: "/accountConfirm/:base64", element: <RejestracjaConfirm /> },
  { path: "/panel", element: <Panel /> },
  { path: "*", element: <RouteNotFound /> },
]);

function App() {
  const [socket, setSocket] = useState<any>();
  useEffect(() => {
    setSocket(io(SERVER, { transports: ["websocket"] }));
  }, []);
  return (
    <div className="App">
      <SocketContext.Provider value={[socket]}>
        <Provider store={store}>
          <RouterProvider router={router} errorElement={<Logowanie />} />
          <ServerOffline />
          <SnackAlert />
        </Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
