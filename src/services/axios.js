import { api } from "./api";

export const getDevs = async () => {
  try {
    const { data } = await api.get("/devs");
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAdmins = async () => {
  try {
    const { data } = await api.get("/admins");
    console.log("\x1b[35m", data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getOrderOfServices = async () => {
  try {
    const { data } = await api.get("/ordem-servico");
    console.log("\x1b[35m", data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    console.log("\x1b[35m", data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getSystems = async () => {
  try {
    const { data } = await api.get("/systems");
    console.log("\x1b[35m", data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createOrder = async (data) => {
  try {
    console.log("\x1b[35m", { request: data });
    await api.post("/ordem-servico", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const listOrdens = async () => {
  try {
    const { data } = await api.get("/ordem-servico/client/1");
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const OrdemDetails = async (ordemId) => {
  try {
    const { data } = await api.get(`/ordem-servico/client/${ordemId}/details`);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const listOrdensAdmin = async () => {
  try {
    const { data } = await api.get(`/ordem-servico`);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const listOrdensDev = async () => {
  try {
    const { data } = await api.get(`/ordem-servico/dev/2`);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const updateOrder = async (data, id) => {
  try {
    console.log("\x1b[35m", { request: data });
    await api.patch(`/ordem-servico/${id}`, data);
    return;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const getFeedback = async (orderId) => {
  try {
    const { data } = await api.get(`/feedback/${orderId}?clientId=1`);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const postMessageClient = async ({ orderId, clientId, content }) => {
  try {
    const { data } = await api.post(`/feedback/`, {
      orderId,
      content,
      clientId,
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
