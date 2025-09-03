// Importación de módulos
const express = require("express");
const cors = require("cors");
const path = require("path");

// Importación SDK MercadoPago v2.x
const mercadopago = require("mercadopago");

const app = express();

// Configuración del cliente de MercadoPago (SDK v2)
const client = new mercadopago.MercadoPagoConfig({
  accessToken: "APP_USR-8429076419853427-090312-250fcd57d8828359ff8a1830b039b583-2669401824" // ⚠️ Reemplazá con tu access token real
});

// Instancia para manejar preferencias
const preference = new mercadopago.Preference(client);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Client")));
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "Client", "media", "index.html"));
});

// Endpoint para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.description,
          quantity: Number(req.body.quantity),
          currency_id: "ARS",
          unit_price: Number(req.body.price),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    console.log("Creando preferencia con:", body); // 👀 Ver qué llega al backend

    const result = await mercadopago.preferences.create(body);

    console.log("Respuesta de MP:", result.body); // 👀 Ver si devuelve bien

    res.json({ id: result.body.id });
  } catch (error) {
    console.error("Error creando preferencia:", error); // 👀 Acá vas a ver el motivo real
    res.status(500).json({ error: "No se pudo crear la preferencia", details: error });
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
app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080 🚀");
});