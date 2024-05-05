import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import { Container } from '@mui/material'
import Navbar from './components/Navbar.jsx'

function App () {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
export default App
