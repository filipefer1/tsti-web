import { useEffect } from "react";

import CadastrarOrdem from "./pages/CadastrarOrdem";
import ListarOrdens from "./pages/ListarOrdens";
import { getDevs, getAdmins, getOrderOfServices } from "./services/axios";
import { Routes } from "./routes";

function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
