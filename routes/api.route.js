// It made me do this on my machine.
import {Router} from "express";

import {
  authUser,
  createUser,
  deleteUser,
  getUser,
  updatePassword
} from "../controllers/api.controller.js";

const apiRouter = Router();

apiRouter.post("/Auth", authUser); // GETS authentication uses post for security reasons
apiRouter.get("/User/:UserName", getUser);
apiRouter.post("/Create", createUser);
apiRouter.delete("/Delete/:UserName", deleteUser);
apiRouter.put("/Change", updatePassword);

export default apiRouter