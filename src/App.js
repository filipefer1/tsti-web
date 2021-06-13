import { useEffect } from "react";
import { Header } from "./components/Header";
import CadastrarOrdem from "./pages/CadastrarOrdem";
import ListarOrdens from "./pages/ListarOrdens";
import { getDevs, getAdmins, getOrderOfServices } from "./services/axios";

function App() {
  useEffect(() => {
    getDevs();
    getAdmins();
    getOrderOfServices();
  }, []);
  return (
    <>
      <Header />
      {/* <CadastrarOrdem /> */}
      <ListarOrdens />
    </>
  );
}

export default App;
