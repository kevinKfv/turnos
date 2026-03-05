import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api/axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/stats');
                setStats(data);
            } catch (error) {
                console.error('Error al obtener estadísticas', error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <p>Cargando estadísticas...</p>;

    // Preparar datos para gráficos
    const estadoData = stats.estadoTurnos.map((e: any) => ({
        name: e.estado,
        cantidad: e._count._all
    }));

    return (
        <div className="admin-dashboard mt-4">
            <div className="grid">
                <div className="card text-center">
                    <h3>Ingresos Totales Confirmados</h3>
                    <h2 style={{ color: 'var(--success)' }}>${stats.ingresosPagados.toLocaleString()}</h2>
                </div>
                <div className="card text-center">
                    <h3>Total Usuarios</h3>
                    {stats.usuarios.map((u: any) => (
                        <p key={u.role}><strong>{u.role}:</strong> {u._count._all}</p>
                    ))}
                </div>
            </div>

            <div className="card mt-4" style={{ height: '300px' }}>
                <h3>Turnos por Estado</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={estadoData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cantidad" fill="var(--primary)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
