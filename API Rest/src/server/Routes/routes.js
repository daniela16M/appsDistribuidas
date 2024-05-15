import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const routes = Router();

const validToken = (token) => {
  if (token !== "1234") throw "Error token invalido";
};

const handleRouteError = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    res.status(400).json({ res: error });
  }
};

// Select
routes.get(
  "/users",
  handleRouteError(async (req, res) => {
    const data = await UserController.getUsers();
    res.status(200).json(data);
  })
);

// {data:{"id":0?,"nombre":""?}}

// Insert
routes.post(
  "/user",
  handleRouteError(async (req, res) => {
    validToken(req.headers["token"]);
    const { data: user } = req.body;
    const data = await UserController.insertUser({ user });
    res.status(201).json({ data, message: "Dato insertado con exito" });
  })
);

// Update
routes.put(
  "/user",
  handleRouteError(async (req, res) => {
    validToken(req.headers["token"]);
    const { data: user } = req.body;
    const data = await UserController.updateUser({ user });
    res.status(200).json({ data, message: "Dato modificado con exito" });
  })
);

// Delete
routes.delete(
  "/user",
  handleRouteError(async (req, res) => {
    const { data } = req.body;
    const { message } = await UserController.deleteUser(data.id);
    res.status(201).json({ message });
  })
);

routes.use("*", (req, res) =>
  res.status(401).json({ message: "Endpoint no valido" })
);

export default routes;
