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
