import { useState } from 'react';
import api from '../api/axios';

const ProfessionalConfig = () => {
    const [config, setConfig] = useState({
        precioConsulta: '',
        diasLaborables: '',
        horaInicio: '',
        horaFin: ''
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put('/professionals/profile', config);
            setMsg('Perfil actualizado correctamente');
        } catch (err) {
            setMsg('Error al actualizar');
        }
    };

    return (
        <div className="card mt-4">
            <h3>Configuración Profesional</h3>
            {msg && <p style={{ color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Precio de la Consulta ($)</label>
                    <input type="number" name="precioConsulta" className="form-input" value={config.precioConsulta} onChange={handleChange} placeholder="Ej: 5000" />
                </div>
                <div className="form-group">
                    <label className="form-label">Días Laborables (0=Dom, 1=Lun, ..., 6=Sab)</label>
                    <input type="text" name="diasLaborables" className="form-input" value={config.diasLaborables} onChange={handleChange} placeholder="Ej: 1,2,3,4,5" />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Hora Inicio</label>
                        <input type="time" name="horaInicio" className="form-input" value={config.horaInicio} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Hora Fin</label>
                        <input type="time" name="horaFin" className="form-input" value={config.horaFin} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Configuración</button>
            </form>
        </div>
    );
};

export default ProfessionalConfig;
