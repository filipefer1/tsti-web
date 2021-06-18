import { useState } from "react";
import { useEffect } from "react";
import { OrdemDetails } from "../../services/axios";
import { useParams } from "react-router-dom";
import { Container, Spinner, Button } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./style.css";

const DetalhesOrdem = () => {
  const [ordem, setOrdem] = useState();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const response = await OrdemDetails(params.id);

      const data = {
        ...response,
        createdAt: new Date(response.createdAt).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      setOrdem(data);
    })();
  }, [params.id]);

  if (!ordem) {
    return (
      <div className="d-flex justify-content-md-center align-items-center my-custom-spinner">
        <Spinner animation="border" role="status" />
        <span className="pl-4"> Carregando...</span>
      </div>
    );
  }

  return (
    <section className="details-ordem-section">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Cliente</h4>

          <Link to="/">
            <Button variant="secondary" className="d-flex align-items-center">
              <FiArrowLeft />
              <span className="ml-2">Voltar</span>
            </Button>
          </Link>
        </div>
        <header className="d-flex justify-content-between mb-4 ">
          <div>
            <h4>Name</h4>
            <p className="text-muted">{ordem?.cliente.name}</p>
          </div>

          <div>
            <h4>Data de criação</h4>
            <p className="text-muted">{ordem?.createdAt}</p>
          </div>
        </header>
      </div>

      <div>
        <h4>Title</h4>
        <p className="text-muted"> {ordem?.title}</p>

        <h4>Description</h4>
        <p className="text-muted">{ordem?.description}</p>

        <h4>Status</h4>
        <p className="text-muted">{ordem?.status}</p>
      </div>

      <div>
        <h4>Categoria</h4>
        <p className="text-muted">{ordem?.categoria.title}</p>

        <h4>Sistema</h4>
        <p className="text-muted">{ordem?.sistema.name}</p>
      </div>
    </section>
  );
};

export default DetalhesOrdem;