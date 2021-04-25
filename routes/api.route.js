// It made me do this on my machine.
import {Router} from "express";

import {
  authUser,
  createUser,
  deleteUser
} from "../controllers/api.controller.js";

const apiRouter = Router();

apiRouter.post("/Auth", authUser);
apiRouter.post("/Create", createUser);
apiRouter.delete("/Delete", deleteUser);

export default apiRouter