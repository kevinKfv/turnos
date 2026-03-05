import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar } from 'lucide-react';

const Navbar = () => {
    const { user, logoutContext } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutContext();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <Calendar size={24} />
                TurnosApp
            </Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span className="text-muted">Hola, {user.nombre}</span>
                        <button onClick={handleLogout} className="nav-item form-button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-item">Ingresar</Link>
                        <Link to="/registro" className="nav-item">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
