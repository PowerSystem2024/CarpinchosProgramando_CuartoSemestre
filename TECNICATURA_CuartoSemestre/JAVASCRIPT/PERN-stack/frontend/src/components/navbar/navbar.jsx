import { Link, useLocation } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./navigation.jsx";
import Container from "../ui/Container";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { signout } = useAuth();

  // Detectar si estamos en una ruta privada
  const privatePathPatterns = ['/tareas', '/perfil'];
  const isPrivateRoute = privatePathPatterns.some(pattern =>
    location.pathname.startsWith(pattern)
  );

  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">Proyecto PERN</h1>
        </Link>
        <ul className="flex gap-x-2">
          {isPrivateRoute ? (
            <>
              {PrivateRoutes.map(({ name, path }) => (
                <li
                  className={`text-slate-300 ${
                    location.pathname === path && "bg-sky-500 px-3 py-1"
                  }`}
                  key={name}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => signout()}
                  className="text-slate-300 hover:bg-red-500 px-3 py-1"
                >
                  Salir
                </button>
              </li>
            </>
          ) : (
            PublicRoutes.map(({ name, path }) => (
              <li
                className={`text-slate-300 ${
                  location.pathname === path && "bg-sky-500 px-3 py-1"
                }`}
                key={name}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
