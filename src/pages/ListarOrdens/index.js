import React, { useEffect, useState, useRef } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { listOrdens } from "../../services/axios";
import "./styles.css";
import { Button } from "react-bootstrap";

const ListarOrdens = () => {
  const [ordens, setOrdens] = useState([]);
  const history = useHistory();

  const [statusRequest, setStatusRequest] = useState({
    status: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setStatusRequest({
          status: "pending",
        });

        const result = await listOrdens();

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
    history.push(`/ordem/details/${id}`);
  }

  if (statusRequest.status !== "success") {
    return (
      <div className="d-flex justify-content-md-center align-items-center my-custom-spinner">
        {statusRequest.message === "pending" && (
          <>
            <Spinner animation="border" role="status" />
            <span className="pl-4"> Carregando...</span>
          </>
        )}

        {statusRequest.message === "error" && (
          <span className="pl-4"> Sem dado cadastrado</span>
        )}
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Sistema</th>
          <th>Data de abertura</th>
          <th>Situação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {ordens &&
          ordens.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.categoria}</td>
                <td>{item.sistema}</td>
                <td>
                  {new Date(item.dataAbertura).toLocaleDateString("pt-BR")}
                </td>
                <td>{item.status}</td>
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

export default ListarOrdens;
