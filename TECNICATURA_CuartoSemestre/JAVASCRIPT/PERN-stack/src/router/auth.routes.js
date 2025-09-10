import { Router } from "express";

const router = Router();

router.post("/singin", (req, res) => res.send("ingresando"));

router.post("/singup", (req, res) => res.send("registrando"));

router.post("/singout", (req, res) => res.send("Cerrando sesión"));

router.get("/profile", (req, res) => res.send("Perfil del usuario"))

export default router;