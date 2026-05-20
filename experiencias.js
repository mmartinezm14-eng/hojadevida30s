const express = require("express");
const router = express.Router();
const Experiencia = require("../models/Experiencia");

// ─────────────────────────────────────────────
// GET /api/experiencias  →  Obtener todas
// ─────────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias:
 *   get:
 *     summary: Obtener todas las experiencias profesionales
 *     tags: [Experiencias]
 *     responses:
 *       200:
 *         description: Lista de experiencias ordenadas por fecha de inicio (más reciente primero)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Experiencia'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", async (req, res) => {
  try {
    const experiencias = await Experiencia.find().sort({ fechaInicio: -1 });
    res.json({ ok: true, total: experiencias.length, data: experiencias });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al obtener experiencias", error: error.message });
  }
});

// ─────────────────────────────────────────────
// GET /api/experiencias/:id  →  Obtener una
// ─────────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias/{id}:
 *   get:
 *     summary: Obtener una experiencia por ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la experiencia
 *     responses:
 *       200:
 *         description: Experiencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Experiencia'
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error interno
 */
router.get("/:id", async (req, res) => {
  try {
    const experiencia = await Experiencia.findById(req.params.id);
    if (!experiencia) {
      return res.status(404).json({ ok: false, mensaje: "Experiencia no encontrada" });
    }
    res.json({ ok: true, data: experiencia });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "ID inválido o error del servidor", error: error.message });
  }
});

// ─────────────────────────────────────────────
// POST /api/experiencias  →  Crear nueva
// ─────────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias:
 *   post:
 *     summary: Crear una nueva experiencia profesional
 *     tags: [Experiencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - empresa
 *               - cargo
 *               - fechaInicio
 *             properties:
 *               empresa:
 *                 type: string
 *                 example: "Tech Solutions S.A.S"
 *               cargo:
 *                 type: string
 *                 example: "Desarrollador Frontend Junior"
 *               descripcion:
 *                 type: string
 *                 example: "Desarrollo de interfaces con React y mantenimiento de APIs"
 *               tecnologias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["HTML", "CSS", "JavaScript"]
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-30"
 *               trabajoActual:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Experiencia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 mensaje:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Experiencia'
 *       400:
 *         description: Datos inválidos o faltantes
 */
router.post("/", async (req, res) => {
  try {
    const nueva = new Experiencia(req.body);
    const guardada = await nueva.save();
    res.status(201).json({ ok: true, mensaje: "Experiencia creada exitosamente", data: guardada });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: "Error al crear la experiencia", error: error.message });
  }
});

// ─────────────────────────────────────────────
// PUT /api/experiencias/:id  →  Actualizar
// ─────────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias/{id}:
 *   put:
 *     summary: Actualizar una experiencia profesional
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la experiencia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa:
 *                 type: string
 *               cargo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               tecnologias:
 *                 type: array
 *                 items:
 *                   type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               trabajoActual:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Experiencia actualizada correctamente
 *       404:
 *         description: Experiencia no encontrada
 *       400:
 *         description: Error de validación
 */
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizada) {
      return res.status(404).json({ ok: false, mensaje: "Experiencia no encontrada" });
    }
    res.json({ ok: true, mensaje: "Experiencia actualizada correctamente", data: actualizada });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: "Error al actualizar", error: error.message });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/experiencias/:id  →  Eliminar
// ─────────────────────────────────────────────
/**
 * @swagger
 * /api/experiencias/{id}:
 *   delete:
 *     summary: Eliminar una experiencia profesional
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de MongoDB de la experiencia a eliminar
 *     responses:
 *       200:
 *         description: Experiencia eliminada correctamente
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const eliminada = await Experiencia.findByIdAndDelete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ ok: false, mensaje: "Experiencia no encontrada" });
    }
    res.json({ ok: true, mensaje: "Experiencia eliminada correctamente", data: eliminada });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al eliminar", error: error.message });
  }
});

module.exports = router;
