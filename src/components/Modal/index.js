import { useRef } from "react";
import {
  Modal as ModalBoostrap,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

import { postMessageClient } from "../../services/axios";
import { useChatModal } from "../../context/ChatModalContext";
import MessageBox from "./MessageBox";

import "./styles.css";

export default function Modal({ clientName, clientId, orderId }) {
  const ModalBodyRef = useRef(null);

  const { toggleModal, showModal, messages, setMessages } = useChatModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleSendMessage = async ({ message }) => {
    try {
      console.log(message);

      const feedback = await postMessageClient({
        clientId,
        orderId,
        content: message,
      });

      reset(feedback);

      setMessages([...messages, feedback]);
    } catch (error) {
      alert(error.message);
    }
  };

  console.log(messages);

  return (
    <ModalBoostrap
      className="my-custom-modal"
      show={showModal}
      onHide={toggleModal}
      size="xl"
    >
      <ModalBoostrap.Header closeButton>
        <ModalBoostrap.Title>{clientName}</ModalBoostrap.Title>
      </ModalBoostrap.Header>

      <ModalBoostrap.Body ref={ModalBodyRef}>
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            message={message.content}
            date={message.createdAt}
            position={message?.client?.id === clientId ? "right" : "left"}
          />
        ))}
      </ModalBoostrap.Body>

      <ModalBoostrap.Footer>
        <form
          className="input-send-message"
          onSubmit={handleSubmit(handleSendMessage)}
        >
          <InputGroup className="mb-3">
            <FormControl {...register("message", { required: true })} />
            <Button
              variant={isSubmitting ? "secondary" : "primary"}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </InputGroup>
        </form>
      </ModalBoostrap.Footer>
    </ModalBoostrap>
  );
}
