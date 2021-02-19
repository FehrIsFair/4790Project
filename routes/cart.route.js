import pkg from "express";

import { cart } from "../controllers/cart.controller";
import Book from "../models/book.model";

const { Router } = pkg;

export const cartRouter = Router();

cartRouter.get("/", cart);
