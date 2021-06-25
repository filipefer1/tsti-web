import { useRef } from "react";
import {
  Modal as ModalBoostrap,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

import { postMessageClient, postMessageDev } from "../../services/axios";
import { useChatModal } from "../../context/ChatModalContext";
import MessageBox from "./MessageBox";

import "./styles.css";

export default function Modal({
  clientName,
  clientId,
  orderId,
  typeClient = "client",
}) {
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

      let feedback = {};

      if (typeClient === "dev") {
        feedback = await postMessageDev({
          devId: "2",
          orderId,
          content: message,
        });

        console.log({ feedback });
      } else {
        feedback = await postMessageClient({
          clientId,
          orderId,
          content: message,
        });
      }

      reset(feedback);

      setMessages([...messages, feedback]);
    } catch (error) {
      alert(error.message);
    }
  };

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
            clientOrDevName={message?.client?.name || message?.dev?.name}
            message={message.content}
            date={message.createdAt}
            position={
              message?.dev?.id === clientId || message?.client?.id === clientId
                ? "right"
                : "left"
            }
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
