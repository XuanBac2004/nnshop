import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { authShema } from "../validSchema/authSchema.js";
import { showProfile } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const authRouter = Router();

authRouter.post("/register", validBodyRequest(authShema), register);
authRouter.post("/login", validBodyRequest(authShema), login);

authRouter.use("/", checkAuth);
authRouter.get("/me", showProfile);
// authRouter.patch("/me", updateProfile);

export default authRouter;
