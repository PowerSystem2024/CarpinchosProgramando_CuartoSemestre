// Importación de módulos
const express = require("express");
const cors = require("cors");
const path = require("path");

// Importación SDK MercadoPago v2.x
const mercadopago = require("mercadopago");

const app = express();

// Configuración del cliente de MercadoPago (SDK v2)
const client = new mercadopago.MercadoPagoConfig({
  accessToken: "TU_ACCESS_TOKEN" // ⚠️ Reemplazá con tu access token real
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
    const result = await preference.create({
      body: {
        items: [
          {
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
          }
        ],
        back_urls: {
          success: "http://localhost:8080",
          failure: "http://localhost:8080",
          pending: ""
        },
        auto_return: "approved",
      }
    });

    res.json({ id: result.id });
  } catch (error) {
    console.error("Error creando la preferencia:", error);
    res.status(500).json({ error: "No se pudo crear la preferencia" });
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