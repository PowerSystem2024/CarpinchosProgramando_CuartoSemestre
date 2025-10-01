import { Router } from "express";
import { singin,singup, singout, profile } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/authmiddleware.js";

const router = Router();

router.post("/singin", singin);

router.post("/singup", singup);

router.post("/singout", singout);

router.get("/profile",isAuth, profile);

export default router;