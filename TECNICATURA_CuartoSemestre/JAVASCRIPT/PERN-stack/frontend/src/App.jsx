import Navbar from './components/navbar/navbar.jsx'
import { Container } from './components/ui/Container.jsx'

import { ProtectedRoute } from './components/ProtectedRoutes.jsx'

import { useAuth } from './context/AuthContext.jsx'
import { TareasProvider } from './context/TareasContext.jsx'

import { Routes, Route, Outlet } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TareasPage from './pages/TareasPage.jsx'
import TareaFormPage from './pages/TareaFormPage.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const { isAuth } = useAuth();
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="tareas" />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}>
            <Route path="/perfil" element={<ProfilePage />} />

            <Route element={<TareasProvider>
              <Outlet />
            </TareasProvider>}>

              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/tareas/crear" element={<TareaFormPage />} />
              <Route path="/tareas/editar/:id" element={<TareaFormPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;                 