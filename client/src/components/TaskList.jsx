import { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const navegate = useNavigate()

  const loadTasks = async () => {
    try {
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id) => {
    // try {
    //   await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
    //   setTasks(tasks.filter(task => task.id !== id))
    // } catch (error) {
    //   console.log(error)
    // }
    navegate(`/tasks/${id}/edit`)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <h1>Task List</h1>
      {
        tasks.map(task => (
          <Card key={task.id} style={{ marginBottom: '.7rem', background: '#1E272E' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ color: 'white' }}>
                <Typography>{task.title}</Typography>
                <Typography>{task.description}</Typography>
              </div>
              <div>
                <Button variant='contained' color='inherit' onClick={() => handleEdit(task.id)}>Edit</Button>
                <Button variant='contained' color='warning' onClick={() => handleDelete(task.id)} style={{ marginLeft: '.5rem' }}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}

export default TaskList
