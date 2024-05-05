const pool = require('../../database/connect.js')

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks')
    return res.status(200).json(tasks.rows)
  } catch (error) {
    return res.status(500).json({ message: error.message })
    // Llamada de la función de errores global que está en: 'index.js'.
    // next(error)
  }
}

const getTask = async (req, res, next) => {
  const id = req.params.id
  try {
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    if (task.rows.length === 0) return res.status(404).json([{ message: 'Task not found!' }])
    return res.status(200).json(task.rows)
  } catch (error) {
    return res.status(500).json({ message: error.message })
    // Llamada de la función de errores global que está en: 'index.js'.
    // next(error)
  }
}

const createTask = async (req, res, next) => {
  const { title, description } = req.body
  try {
    // Al final de la consulta sql dice: 'RETURNING *', esta terminación es para que luego de ejecutarse la consulta me retorne lo insertado.
    const task = await pool.query('INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [title, description])
    return res.status(200).json(task.rows[0])
  } catch (error) {
    return res.status(500).json({ message: error.message })
    // Llamada de la función de errores global que está en: 'index.js'.
    // next(error)
  }
}

const deleteTask = async (req, res, next) => {
  const id = req.params.id
  try {
    // Elimina la tarea y devuelve la tarea aliminada al incluir en la consulta: 'RETURNING *'.
    const task = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    if (task.rows.length === 0) return res.status(404).json([{ message: 'Task not found!' }])
    // El código 204 significa que se realizó la acción con éxito pero indica que no habrá retorno alguno de datos o mensajes.
    return res.status(200).json('Task deleted!')
  } catch (error) {
    return res.status(500).json({ message: error.message })
    // Llamada de la función de errores global que está en: 'index.js'.
    // next(error)
  }
}

const updateTask = async (req, res, next) => {
  const { id } = req.params
  const { title, description } = req.body
  try {
    // Actualiza la tarea y devuelve la tarea actualizada al incluir en la consulta: 'RETURNING *'.
    const task = await pool.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])
    if (task.rows.length === 0) return res.status(404).json([{ message: 'Task not found!' }])
    return res.status(200).json(task.rows[0])
  } catch (error) {
    return res.status(500).json({ message: error.message })
    // Llamada de la función de errores global que está en: 'index.js'.
    // next(error)
  }
}

module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask }
