import { Header } from "../Header";
import { NavBar } from "../NavBar";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      {children}
    </>
  );
};
