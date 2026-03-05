import { useState, useEffect } from 'react';
import api from '../api/axios';

interface HistorialModalProps {
    appointmentId: number;
    clienteId: number;
    onClose: () => void;
}

const HistorialModal = ({ appointmentId, clienteId, onClose }: HistorialModalProps) => {
    const [notas, setNotas] = useState('');
    const [historialPrevio, setHistorialPrevio] = useState<any[]>([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const { data } = await api.get(`/historial/cliente/${clienteId}`);
                setHistorialPrevio(data);
            } catch (err) {
                console.error("Error cargando historial", err);
            }
        };
        fetchHistorial();
    }, [clienteId]);

    const handleSave = async () => {
        try {
            await api.post('/historial', {
                appointmentId,
                clienteId,
                notas
            });
            setMsg('Ficha guardada con éxito.');
            setNotas('');
            // Podríamos recargar el historial acá
            const { data } = await api.get(`/historial/cliente/${clienteId}`);
            setHistorialPrevio(data);
        } catch (error: any) {
            setMsg(error.response?.data?.error || 'Error al guardar');
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="card" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Ficha Clínica del Cliente</h3>
                    <button className="btn btn-danger" onClick={onClose} style={{ padding: '0.25rem 0.5rem' }}>x</button>
                </div>

                <div className="mt-4">
                    <h4>Nueva Nota</h4>
                    <textarea
                        className="form-input"
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        placeholder="Observaciones de la sesión..."
                        rows={4}
                    />
                    <button className="btn mt-4" style={{ background: 'var(--success)', color: 'white' }} onClick={handleSave}>Guardar Nota</button>
                    {msg && <p className="mt-4" style={{ color: msg.includes('Error') ? 'red' : 'green' }}>{msg}</p>}
                </div>

                <div className="mt-4">
                    <h4>Historial Previo</h4>
                    {historialPrevio.length === 0 ? <p>No hay historial previo.</p> : (
                        historialPrevio.map((h: any) => (
                            <div key={h.id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
                                <small><strong>{new Date(h.fecha).toLocaleDateString()}</strong> - {h.profesional.nombre}</small>
                                <p style={{ margin: '0.25rem 0' }}>{h.notas}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistorialModal;
