require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const experienciasRouter = require("./routes/experiencias");

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",   // En Render agrega FRONTEND_URL = https://tu-usuario.github.io
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// SWAGGER
// ─────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Hoja de Vida - Samuel Sanchez",
      version: "1.0.0",
      description: `
## API REST para gestionar experiencias profesionales

**Desarrollado con:** Node.js · Express.js · MongoDB · Mongoose

### Endpoints disponibles
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/experiencias | Listar todas |
| GET | /api/experiencias/:id | Obtener una |
| POST | /api/experiencias | Crear nueva |
| PUT | /api/experiencias/:id | Actualizar |
| DELETE | /api/experiencias/:id | Eliminar |
      `,
      contact: {
        name: "Samuel Sanchez",
        email: "Comsam464@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`,
        description: "Servidor activo",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "CV API - Samuel Sanchez",
  customCss: `
    .topbar { background-color: #212529 !important; }
    .swagger-ui .topbar-wrapper img { content: none; }
    .swagger-ui .info .title { color: #212529; }
  `,
}));

// ─────────────────────────────────────────────
// RUTAS
// ─────────────────────────────────────────────
app.use("/api/experiencias", experienciasRouter);

app.get("/", (req, res) => {
  res.json({
    mensaje: "✅ API Hoja de Vida - Samuel Sanchez",
    version: "1.0.0",
    documentacion: `${process.env.RENDER_EXTERNAL_URL || "http://localhost:" + PORT}/api-docs`,
    endpoints: {
      "GET    /api/experiencias":     "Listar todas las experiencias",
      "GET    /api/experiencias/:id": "Obtener una experiencia",
      "POST   /api/experiencias":     "Crear nueva experiencia",
      "PUT    /api/experiencias/:id": "Actualizar experiencia",
      "DELETE /api/experiencias/:id": "Eliminar experiencia",
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: `Ruta ${req.originalUrl} no encontrada` });
});

// ─────────────────────────────────────────────
// CONEXIÓN A MONGODB + INICIO
// ─────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`📄 Swagger UI: /api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });
