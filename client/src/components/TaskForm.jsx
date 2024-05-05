import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '' })
  const navigate = useNavigate()
  // Estado para indicar el proceso de envio de datos el server en caso que el usuario tenga mala internet.
  const [loading, setLoading] = useState(false)
  // Manejar el parámetro pasado en la url.
  const params = useParams()
  // Estado para identificar si estamos creando o actualizando una tareas en este formulario.
  const [editing, setEditing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        await fetch(`http://localhost:3000/tasks/${params.id}`, {
          method: 'PUT',
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' }
        })
        setLoading(false)
        navigate('/')
      } else {
        await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' }
        })
        setLoading(false)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    // Con 'e.target' accedemos al input, luego con 'name' y 'value' a su nomnre y valor respectivamente.
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()
    setTask({ title: data[0].title, description: data[0].description })
    setEditing(true)
  }

  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
  }, [params.id])

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1E272E', padding: '1rem' }}>
          <Typography variant='h6' textAlign='center' color='white'>
            {editing ? 'Edit Task' : 'Create Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Write your title'
                sx={{ display: 'block', margin: '.5rem 0' }}
                name='title'
                value={task.title}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Write your description'
                multiline rows={4}
                sx={{ display: 'block', margin: '.5rem 0' }}
                name='description'
                value={task.description}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <Button variant='contained' color='primary' type='submit' disabled={!task.title || !task.description}>
                {
                  loading
                    ? <CircularProgress color='inherit' size={24} />
                    : editing
                      ? 'Edit'
                      : 'Create'
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm
