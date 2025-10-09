import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TareasPage from './pages/TareasPage.jsx'
import TareaFormPage from './pages/TareaFormPage.jsx'


function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/perfil' element={<ProfilePage />} />
        <Route path='/tareas' element={<TareasPage />} />
        <Route path='/tareas/crear' element={<TareaFormPage />} />
        <Route path='/tareas/editar/:id' element={<TareaFormPage />} />
    </Routes>
  )
}

export default App