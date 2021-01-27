// It made me do this on my machine.
import pkg from "express";

import { api } from "../controllers/api.controller.js";

const { Router } = pkg;

export const apiRouter = Router();

apiRouter.get("/", api);
