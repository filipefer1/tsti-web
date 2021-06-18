import React, { useEffect, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createOrder,
  getAdmins,
  getDevs,
  updateOrder,
} from "../../services/axios";

const UpdateOrdemAdmin = () => {
  const [devs, setDevs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const devs = await getDevs();
      const admins = await getAdmins();
      setDevs(devs);
      setAdmins(admins);
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      const body = {
        devId: data.dev,
        adminId: data.admin,
        qtdDias: Number(data.qtdDias),
      };

      return updateOrder(body, params.id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Form.Group controlId="admin" className="col-md-12">
          <Form.Label>Admins</Form.Label>
          <Form.Control as="select" {...register("admin")}>
            {admins.length > 0 &&
              admins.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="dev" className="col-md-12">
          <Form.Label>Desenvolvedores</Form.Label>
          <Form.Control {...register("dev")} as="select">
            {devs.length > 0 &&
              devs.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="qtdDias" className="col-md-12">
          <Form.Label>Quantidade de dias</Form.Label>
          <Form.Control
            {...register("qtdDias", { required: true, maxLength: 255 })}
            type="number"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          size="lg"
          disabled={isSubmitting}
          style={{ backgroundColor: "#251f46", border: "none" }}
        >
          {isSubmitting ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <span>Atualizar</span>
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateOrdemAdmin;
