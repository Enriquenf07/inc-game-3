
import { useEffect } from "react";
import { NavBar } from "./layout/navbar";
import Page from "./layout/Page/page";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { useGameLoop } from "./gameLogic/useGameLoop";

function App() {

  useGameLoop()

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={3}
        theme="colored" />
      <NavBar />
      <Page />

    </div>
  )
}

export default App
