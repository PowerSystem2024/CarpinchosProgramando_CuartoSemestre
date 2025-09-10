import express from "express";
import cors from "cors";
import path from "path";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();
const port = 8080;

// Configuración del cliente de MercadoPago (SDK v2)
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-5056574560531615-090123-7edbab2ac12d72ea938afdaaf950377d-2660554541" // ⚠️ Reemplazá con tu access token real
});

// Instancia para manejar preferencias
const preference = new Preference(client);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "Client")));
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "Client", "media", "index.html"));
});

// Endpoint para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    if (!title || !quantity || !price) {
      throw new Error("Faltan datos en la solicitud");
    }

    const body = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          currency_id: "ARS",
          unit_price: Number(price),
        },
      ],
      back_urls: {
        success: "https://capymarket.netlify.app/gracias.html",
        failure: "https://capymarket.netlify.app/gracias.html",
        pending: "https://capymarket.netlify.app/gracias.html",
      },
      auto_return: "approved",
    };

    console.log("Creando preferencia con:", body);

    const result = await preference.create({ body });

    console.log("Respuesta completa de Mercado Pago:", result);

    if (!result || !result.id) {
    throw new Error("La respuesta de Mercado Pago no contiene un ID");
    }

    console.log("Preferencia creada:", result.id);

    res.json({ id: result.id });
  } catch (error) {
    console.error("Error creando preferencia:", error.message);
    res.status(500).json({ error: "No se pudo crear la preferencia", details: error.message });
  }
});

// Endpoint para recibir feedback de MercadoPago
app.get("/feedback", (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:8080 🚀");
});