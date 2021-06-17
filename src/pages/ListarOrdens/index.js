import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { listOrdens } from "../../services/axios";
import "./styles.css";

const ListarOrdens = () => {
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await listOrdens();
      console.log(result);
      setOrdens(result);
    })();
  }, []);
  return (
    <>
      {ordens.length ? (
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
                    <td>Opções</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex justify-content-md-center align-items-center my-custom-spinner">
          <Spinner animation="border" role="status" />
          <span className="pl-4"> Carregando...</span>
        </div>
      )}
    </>
  );
};

export default ListarOrdens;
