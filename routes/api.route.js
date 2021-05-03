// It made me do this on my machine.
import {Router} from "express";

import {
  authUser,
  createUser,
  deleteUser,
  getCharacters,
  getUser,
  updatePassword
} from "../controllers/api.controller.js";

const apiRouter = Router();

apiRouter.post("/Auth", authUser); // GETS authentication by verifying user, uses post for security reasons
apiRouter.get("/User/:UserName", getUser); // does not return password
apiRouter.get("/Char", getCharacters);
apiRouter.post("/Create", createUser);
apiRouter.delete("/Delete/:UserName", deleteUser);
apiRouter.put("/Change", updatePassword);

export default apiRouter