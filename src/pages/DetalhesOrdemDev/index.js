import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import { OrdemDetails, getFeedback, finishOrder } from "../../services/axios";
import { ButtonOpenChat } from "../../components/Button";
import Modal from "../../components/Modal";
import { useChatModal } from "../../context/ChatModalContext";

import "./style.css";

const DetalhesOrdemDev = () => {
  const { toggleModal, messages, setMessages } = useChatModal();
  const history = useHistory();

  const [ordem, setOrdem] = useState();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const ordem = await OrdemDetails(params.id);

      const data = {
        ...ordem,
        createdAt: new Date(ordem.createdAt).toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      setOrdem(data);
    })();
  }, [params.id]);

  console.log({ ordem, messages });

  useEffect(() => {
    (async () => {
      const feedback = await getFeedback(params.id);

      setMessages(feedback);
    })();
  }, [params.id]);

  async function handleClick(id) {
    await finishOrder(id);
    history.goBack();
  }

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
          <h4>Desenvolvedor</h4>

          <Link to="/">
            <Button variant="secondary" className="d-flex align-items-center">
              <FiArrowLeft />
              <span className="ml-2">Voltar</span>
            </Button>
          </Link>
        </div>
        <header className="d-flex justify-content-between mb-4 ">
          <div>
            <h4>Nome</h4>
            <p className="text-muted">{ordem?.cliente.name}</p>
          </div>

          <div>
            <h4>Data de criação</h4>
            <p className="text-muted">{ordem?.createdAt}</p>
          </div>
        </header>
      </div>

      <div>
        <h4>Título</h4>
        <p className="text-muted"> {ordem?.title}</p>

        <h4>Descrição</h4>
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

      <div className="container-button">
        <Button
          variant="primary"
          type="submit"
          size="g"
          style={{ backgroundColor: "#251f46", border: "none" }}
          onClick={() => handleClick(params.id)}
        >
          <span>Finalizar ordem</span>
        </Button>
      </div>

      <ButtonOpenChat onClick={toggleModal} />
      <Modal
        clientName={ordem?.cliente.name}
        clientId={ordem?.dev?.id}
        orderId={ordem?.id}
        typeClient="dev"
      />
    </section>
  );
};

export default DetalhesOrdemDev;
