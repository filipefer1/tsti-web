import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createOrder, getCategories, getSystems } from "../../services/axios";
import "./style.css";

const CadastrarOrdem = () => {
  const [categories, setCategories] = useState([]);
  const [systems, setSystems] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      const categoriesList = await getCategories();
      const systemslist = await getSystems();
      setCategories(categoriesList);
      setSystems(systemslist);
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("categoriaId", data.category);
    formData.append("sistemaId", data.system);
    formData.append("clienteId", "1");

    return createOrder(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <Form.Group controlId="title">
        <Form.Label>Título</Form.Label>
        <Form.Control
          {...register("title", { required: true, maxLength: 255 })}
          type="input"
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          {...register("description", { required: true, maxLength: 255 })}
          type="input"
        />
      </Form.Group>

      <Form.Group controlId="category">
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

      <Form.Group controlId="system">
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

      <Form.Group>
        <Form.File id="exampleFormControlFile1" label="Example file input" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
};

export default CadastrarOrdem;
