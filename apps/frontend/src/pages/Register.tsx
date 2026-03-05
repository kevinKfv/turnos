import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        role: 'CLIENTE',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al registrarse');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Crear Cuenta</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Teléfono (con código de país, ej: +549...)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            placeholder="+5491123456789"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tipo de Cuenta</label>
                        <select
                            className="form-select"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="CLIENTE">Cliente</option>
                            <option value="PROFESIONAL">Profesional</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Registrarse
                    </button>
                </form>
                <p className="text-center mt-4 text-muted">
                    ¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
