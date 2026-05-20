const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Experiencia:
 *       type: object
 *       required:
 *         - empresa
 *         - cargo
 *         - fechaInicio
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único generado por MongoDB
 *         empresa:
 *           type: string
 *           description: Nombre de la empresa
 *           example: "Tech Solutions S.A.S"
 *         cargo:
 *           type: string
 *           description: Cargo o puesto desempeñado
 *           example: "Desarrollador Frontend Junior"
 *         descripcion:
 *           type: string
 *           description: Descripción de las funciones realizadas
 *           example: "Desarrollo de interfaces web con React y mantenimiento de APIs REST"
 *         tecnologias:
 *           type: array
 *           items:
 *             type: string
 *           description: Tecnologías usadas en el trabajo
 *           example: ["HTML", "CSS", "JavaScript", "React"]
 *         fechaInicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio (YYYY-MM-DD)
 *           example: "2023-01-15"
 *         fechaFin:
 *           type: string
 *           format: date
 *           description: Fecha de fin (dejar vacío si es trabajo actual)
 *           example: "2024-06-30"
 *         trabajoActual:
 *           type: boolean
 *           description: Indica si es el trabajo actual
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const experienciaSchema = new mongoose.Schema(
  {
    empresa: {
      type: String,
      required: [true, "El nombre de la empresa es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede superar 100 caracteres"],
    },
    cargo: {
      type: String,
      required: [true, "El cargo es obligatorio"],
      trim: true,
      maxlength: [100, "El cargo no puede superar 100 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede superar 500 caracteres"],
      default: "",
    },
    tecnologias: {
      type: [String],
      default: [],
    },
    fechaInicio: {
      type: Date,
      required: [true, "La fecha de inicio es obligatoria"],
    },
    fechaFin: {
      type: Date,
      default: null,
    },
    trabajoActual: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model("Experiencia", experienciaSchema);
