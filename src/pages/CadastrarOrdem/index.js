import React, { useEffect, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createOrder, getCategories, getSystems } from "../../services/axios";
import "./style.css";

const CadastrarOrdem = () => {
  const [categories, setCategories] = useState([]);
  const [systems, setSystems] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    (async () => {
      const categoriesList = await getCategories();
      const systemslist = await getSystems();
      setCategories(categoriesList);
      setSystems(systemslist);
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categoriaId", data.category);
      formData.append("sistemaId", data.system);
      formData.append("clienteId", "1");

      return createOrder(formData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Form.Group controlId="title" className="col-md-12">
          <Form.Label>Título</Form.Label>
          <Form.Control
            {...register("title", { required: true, maxLength: 255 })}
            type="input"
          />
        </Form.Group>

        <Form.Group controlId="description" className="col-md-12">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            {...register("description", { required: true, maxLength: 255 })}
            type="input"
          />
        </Form.Group>

        <Form.Group controlId="category" className="col-md-12">
          <Form.Label>Categoria</Form.Label>
          <Form.Control as="select" {...register("category")}>
            {categories.length > 0 &&
              categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="system" className="col-md-12">
          <Form.Label>Sistema</Form.Label>
          <Form.Control {...register("system")} as="select">
            {systems.length > 0 &&
              systems.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-md-12">
          <Form.Label>Imagem</Form.Label>
          <Form.File
            id="exampleFormControlFile1"
            label="Example file input"
            data-browse="Selecione uma imagem"
            custom
            {...register("file")}
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
            <span>Cadastrar</span>
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default CadastrarOrdem;
