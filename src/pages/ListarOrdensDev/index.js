import React, { useEffect, useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { listOrdensDev } from "../../services/axios";
import { FiFrown } from "react-icons/fi";

import "./styles.css";

const ListarOrdensDev = () => {
  const [ordens, setOrdens] = useState([]);
  const [statusRequest, setStatusRequest] = useState({
    status: "",
  });

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setStatusRequest({
          status: "pending",
        });

        const result = await listOrdensDev();

        if (result.lenght) {
          return setStatusRequest({
            status: "error",
          });
        }

        setOrdens(result);

        setStatusRequest({
          status: "success",
        });
      } catch (error) {
        return setStatusRequest({
          status: "error",
        });
      }
    })();
  }, []);

  function handleClick(id) {
    history.push(`/admin/${id}`);
  }
  if (statusRequest.status !== "success") {
    return (
      <div className="d-flex justify-content-md-center align-items-center my-custom-spinner">
        {statusRequest.status === "pending" && (
          <>
            <Spinner animation="border" role="status" />
            <span className="pl-4"> Carregando...</span>
          </>
        )}

        {statusRequest.status === "error" && (
          <h4 className="pl-4">
            <FiFrown /> Sem dado cadastrado
          </h4>
        )}
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Título</th>
          <th>Categoria</th>
          <th>Sistema</th>
          <th>Nome do cliente</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {ordens &&
          ordens.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.categoria.title}</td>
                <td>{item.sistema.name}</td>
                <td>{item.cliente.name}</td>
                <td>
                  <Button
                    variant="primary"
                    type="submit"
                    size="g"
                    style={{ backgroundColor: "#251f46", border: "none" }}
                    onClick={() => handleClick(item.id)}
                  >
                    <span>Detalhes</span>
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default ListarOrdensDev;
