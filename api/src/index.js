const express = require('express')
const morgan = require('morgan')
const taskRoutes = require('./routes/tasks.routes.js')
const cors = require('cors')

// Inicializar el server con ExpressJS.
const app = express()
// Permite comunicar las aplicaciones Backend y Frontend desplegadas en diferentes dominios.
app.use(cors())
// Permite ver por la consola las solicitudes que llegan al Backend.
app.use(morgan('dev'))
// Permite leer en forma de json, las solicitudes (req.body).
app.use(express.json())
// Importando todas las tutas del archivo de tutas al server.
app.use(taskRoutes)
// Esta función solo se va a ejecutar cuando exista un error en las solicitudes.
// app.use((err, req, res, next) => { return res.json({ message: err.message }) })

app.listen(3000)
console.log('>>> Server on port 3000')
