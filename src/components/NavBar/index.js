import { ActiveLink } from "../ActiveLink";
import { FiUsers, FiPlusSquare } from "react-icons/fi";

import "./styles.css";

export const NavBar = () => {
  return (
    <div className="sidebar-container">
      <ActiveLink to="/">
        <p>
          <FiUsers />
          Lista de ordems
        </p>
      </ActiveLink>

      <ActiveLink to="/cadastrar">
        <p>
          <FiPlusSquare />
          Cadastrar
        </p>
      </ActiveLink>
    </div>
  );
};
