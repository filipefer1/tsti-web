import { useEffect } from "react";
import { Header } from "./components/Header";
import { Home } from "./pages/home";
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
      <Home />
    </>
  );
}

export default App;
