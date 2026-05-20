# 📄 API Hoja de Vida — Samuel Sanchez
### Node.js · Express · MongoDB · Swagger

---

## 📁 Estructura del proyecto

```
proyecto-cv/
├── backend/
│   ├── models/
│   │   └── Experiencia.js      ← Schema de MongoDB
│   ├── routes/
│   │   └── experiencias.js     ← Endpoints CRUD
│   ├── .env                    ← Variables de entorno
│   ├── package.json
│   └── server.js               ← Servidor principal
└── frontend/
    └── index.html              ← Tu página (modificada)
```

---

## ⚙️ Instalación y ejecución

### 1. Instalar Node.js
Descarga desde: https://nodejs.org (versión LTS)

### 2. Instalar MongoDB (elige una opción)
**Local:** https://www.mongodb.com/try/download/community  
**En la nube gratis (Atlas):** https://www.mongodb.com/atlas

### 3. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 4. Configurar la base de datos

Abre el archivo `.env` y ajusta `MONGO_URI`:

```env
# Si usas MongoDB local:
MONGO_URI=mongodb://localhost:27017/cv_samuel

# Si usas MongoDB Atlas (reemplaza con tus datos):
MONGO_URI=mongodb+srv://tuUsuario:tuPassword@cluster.mongodb.net/cv_samuel
```

### 5. Iniciar el servidor

```bash
npm start
```
Verás en la consola:
```
✅ Conectado a MongoDB
🚀 Servidor corriendo en http://localhost:3000
📄 Swagger UI disponible en http://localhost:3000/api-docs
```

### 6. Abrir el frontend
Copia `index.html` y `style.css` / `samupro.jpeg` en la misma carpeta  
y abre `index.html` en el navegador.

---

## 🔌 Endpoints del API

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/experiencias` | Listar todas |
| GET | `/api/experiencias/:id` | Obtener una |
| POST | `/api/experiencias` | Crear nueva |
| PUT | `/api/experiencias/:id` | Actualizar |
| DELETE | `/api/experiencias/:id` | Eliminar |

---

## 📬 Probar con Postman

### Crear experiencia (POST)
- URL: `http://localhost:3000/api/experiencias`
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "empresa": "Tech Solutions S.A.S",
  "cargo": "Desarrollador Frontend Junior",
  "descripcion": "Desarrollo de interfaces web con HTML, CSS y JavaScript",
  "tecnologias": ["HTML", "CSS", "JavaScript", "Bootstrap"],
  "fechaInicio": "2023-01-15",
  "fechaFin": "2024-06-30",
  "trabajoActual": false
}
```

### Listar todas (GET)
- URL: `http://localhost:3000/api/experiencias`
- Method: `GET`

### Actualizar (PUT)
- URL: `http://localhost:3000/api/experiencias/PEGA_EL_ID_AQUI`
- Method: `PUT`
- Body: mismos campos que quieras cambiar

### Eliminar (DELETE)
- URL: `http://localhost:3000/api/experiencias/PEGA_EL_ID_AQUI`
- Method: `DELETE`

---

## 📄 Probar con Swagger

Con el servidor corriendo, abre en el navegador:

```
http://localhost:3000/api-docs
```

Ahí puedes probar todos los endpoints directamente desde la interfaz visual.
