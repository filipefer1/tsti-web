import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { listOrdens } from "../../services/axios";

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
    <Table striped bordered hover>
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
  );
};

export default ListarOrdens;
