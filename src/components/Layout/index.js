import ChatModalProvider from "../../context/ChatModalContext";

import { Header } from "../Header";
import { NavBar } from "../NavBar";

export const Layout = ({ children }) => {
  return (
    <ChatModalProvider>
      <Header />
      <NavBar />
      {children}
    </ChatModalProvider>
  );
};
