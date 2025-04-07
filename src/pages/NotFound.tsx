import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Página no encontrada</h2>
      <p className="mb-4">Lo sentimos, la página que busca no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;