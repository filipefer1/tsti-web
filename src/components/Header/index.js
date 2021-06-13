import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./styles.css";
export const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="https://toppng.com/uploads/preview/document-check-icon-customer-experience-icon-11568949199rr3lwogyxy.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Sistema de ordem de serviço
      </Navbar.Brand>
      <Nav className={["mr-auto", "nav"]}>
        <Nav.Link href="#home">Cliente</Nav.Link>
      </Nav>
    </Navbar>
  );
};
