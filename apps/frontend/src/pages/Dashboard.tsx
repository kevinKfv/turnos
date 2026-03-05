import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useAuth, User } from '../context/AuthContext';
import api from '../api/axios';
import AdminDashboard from '../components/AdminDashboard';
import ProfessionalConfig from '../components/ProfessionalConfig';
import HistorialModal from '../components/HistorialModal';
import ReservationCalendar from '../components/ReservationCalendar';

interface Appointment {
    id: number;
    fechaHora: string;
    estado: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';
    precio: number;
    pagado: boolean;
    cliente: User;
    profesional: User;
}

const Dashboard = () => {
    const { user, logoutContext } = useAuth();
    const location = useLocation();

    const icons = {
        home: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
        calendar: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
        users: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
        settings: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
        logout: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="logo-icon">T</div>
                        <h2>TurnosPro</h2>
                    </div>
                </div>

                <div className="sidebar-user">
                    <div className="avatar">{user?.nombre?.charAt(0).toUpperCase()}</div>
                    <div className="user-info">
                        <p className="user-name">{user?.nombre}</p>
                        <p className="user-role">{user?.role}</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/dashboard" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        {icons.home} <span>Inicio</span>
                    </NavLink>

                    <NavLink to="/dashboard/turnos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        {icons.users} <span>Mis Turnos</span>
                    </NavLink>

                    {(user?.role === 'CLIENTE' || user?.role === 'ADMIN') && (
                        <NavLink to="/dashboard/reservar" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            {icons.calendar} <span>Agendar Turno</span>
                        </NavLink>
                    )
                    }

                    {
                        user?.role === 'PROFESIONAL' && (
                            <NavLink to="/dashboard/configuracion" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                {icons.settings} <span>Ajustes</span>
                            </NavLink>
                        )}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={logoutContext} className="logout-btn">
                        {icons.logout} <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="dashboard-main">
                <header className="topbar">
                    <h1 className="page-title">
                        {location.pathname === '/dashboard' ? 'Panel de Control' :
                            location.pathname === '/dashboard/turnos' ? 'Gestión de Turnos' :
                                location.pathname === '/dashboard/reservar' ? 'Reservar Turno' :
                                    location.pathname === '/dashboard/configuracion' ? 'Configuración Profesional' : ''}
                    </h1>
                    <div className="topbar-actions">
                        <span className="current-date">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </header>

                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<DashboardHome />} />
                        <Route path="turnos" element={<AppointmentsPage />} />
                        {(user?.role === 'CLIENTE' || user?.role === 'ADMIN') && <Route path="reservar" element={<CalendarPage />} />}
                        {user?.role === 'PROFESIONAL' && <Route path="configuracion" element={<SettingsPage />} />}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

// --- Sub Pages Component definitions ---

const DashboardHome = () => {
    const { user } = useAuth();
    return (
        <div className="page-fade-in animation-slide-up">
            {user?.role === 'ADMIN' ? (
                <AdminDashboard />
            ) : (
                <div className="welcome-banner card">
                    <div className="welcome-content">
                        <h2>¡Hola, {user?.nombre}! 👋</h2>
                        <p className="text-muted mt-2">Bienvenido al sistema de gestión. Selecciona una opción del menú lateral para comenzar a gestionar tus turnos o configuraciones.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const SettingsPage = () => (
    <div className="page-fade-in animation-slide-up">
        <ProfessionalConfig />
    </div>
);

const CalendarPage = () => {
    const handleCreateAppointmentFromCalendar = async (start: Date, profId: number) => {
        try {
            await api.post('/appointments', { profesionalId: profId, fechaHora: start.toISOString() });
            alert("Turno reservado con éxito para el " + start.toLocaleString());
        } catch (err: any) {
            alert(err.response?.data?.error || 'Error al crear el turno');
        }
    };
    return (
        <div className="page-fade-in animation-slide-up">
            <ReservationCalendar onSelectSlot={handleCreateAppointmentFromCalendar} />
        </div>
    )
};

const AppointmentsPage = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    // States Modales
    const [activeHistorial, setActiveHistorial] = useState<{ appId: number, cliId: number } | null>(null);
    const [reprogramarTurnoId, setReprogramarTurnoId] = useState<number | null>(null);
    const [nuevaFechaHora, setNuevaFechaHora] = useState('');

    const loadAppointments = async () => {
        try {
            const { data } = await api.get('/appointments');
            setAppointments(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { loadAppointments(); }, []);

    const updateStatus = async (id: number, status: string) => {
        try {
            await api.put(`/appointments/${id}/status`, { estado: status });
            loadAppointments();
        } catch (err) { alert('Error al actualizar turno'); }
    };

    const handlePay = async (id: number) => {
        try {
            await api.put(`/appointments/${id}/pay`);
            alert('¡Pago simulado exitoso!');
            loadAppointments();
        } catch (err) { alert('Error procesando pago'); }
    };

    const handleReschedule = async () => {
        if (!nuevaFechaHora || !reprogramarTurnoId) return;
        try {
            await api.put(`/appointments/${reprogramarTurnoId}/reschedule`, { nuevaFechaHora });
            alert('Turno reprogramado exitosamente');
            setReprogramarTurnoId(null);
            setNuevaFechaHora('');
            loadAppointments();
        } catch (err: any) {
            alert(err.response?.data?.error || 'Error al reprogramar');
        }
    };

    return (
        <div className="page-fade-in animation-slide-up list-appointments">
            <div className="grid">
                {appointments.length === 0 ? (
                    <div className="card text-center text-muted" style={{ gridColumn: '1 / -1' }}>No hay turnos registrados.</div>
                ) : (
                    appointments.map(app => (
                        <div key={app.id} className="card appointment-card" style={{ borderTop: `4px solid ${app.estado === 'CONFIRMADO' ? 'var(--success)' : app.estado === 'CANCELADO' ? 'var(--error)' : 'var(--warning)'}` }}>
                            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                <span className={`badge badge-${app.estado.toLowerCase()}`}>{app.estado}</span>
                                <span className={`badge ${app.pagado ? 'badge-confirmado' : 'badge-pendiente'}`}>
                                    {app.pagado ? 'Pagado' : 'No Pagado'}
                                </span>
                            </div>
                            <div className="card-body">
                                <h3>{new Date(app.fechaHora).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</h3>
                                {user?.role === 'CLIENTE' ? (
                                    <p className="mt-2" style={{ color: 'var(--text-muted)' }}>👨‍⚕️ Profesional: <strong>{app.profesional?.nombre}</strong></p>
                                ) : (
                                    <p className="mt-2" style={{ color: 'var(--text-muted)' }}>👤 Cliente: <strong>{app.cliente?.nombre}</strong> (Tel: {app.cliente?.telefono})</p>
                                )}
                                <p className="price-tag mt-2">💰 Precio: <strong>${app.precio}</strong></p>
                            </div>
                            <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                                {user?.role === 'PROFESIONAL' && app.estado === 'PENDIENTE' && (
                                    <>
                                        <button onClick={() => updateStatus(app.id, 'CONFIRMADO')} className="btn btn-primary btn-sm">Confirmar</button>
                                        <button onClick={() => updateStatus(app.id, 'CANCELADO')} className="btn btn-danger btn-sm">Cancelar</button>
                                    </>
                                )}
                                {user?.role === 'PROFESIONAL' && (app.estado === 'CONFIRMADO') && (
                                    <button onClick={() => setActiveHistorial({ appId: app.id, cliId: app.cliente!.id })} className="btn btn-secondary btn-sm" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>
                                        Ficha Clínica
                                    </button>
                                )}
                                {user?.role === 'CLIENTE' && app.estado === 'PENDIENTE' && (
                                    <button onClick={() => updateStatus(app.id, 'CANCELADO')} className="btn btn-danger btn-sm">Cancelar Turno</button>
                                )}
                                {user?.role === 'CLIENTE' && !app.pagado && app.estado !== 'CANCELADO' && (
                                    <button onClick={() => handlePay(app.id)} className="btn btn-success btn-sm">Pagar Ahora</button>
                                )}
                                {(user?.role === 'CLIENTE' || user?.role === 'ADMIN') && app.estado !== 'CANCELADO' && (
                                    <button onClick={() => setReprogramarTurnoId(app.id)} className="btn btn-warning btn-sm">Reprogramar</button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modales */}
            {activeHistorial && (
                <HistorialModal
                    clienteId={activeHistorial.cliId}
                    appointmentId={activeHistorial.appId}
                    onClose={() => setActiveHistorial(null)}
                />
            )}

            {reprogramarTurnoId && (
                <div className="modal-overlay">
                    <div className="card modal-content animation-slide-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Reprogramar Turno</h3>
                            <button onClick={() => setReprogramarTurnoId(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>
                        <p className="text-muted mb-4" style={{ marginBottom: '1.5rem' }}>Seleccione la nueva fecha y hora para su turno.</p>
                        <input
                            type="datetime-local"
                            className="form-input mb-4"
                            value={nuevaFechaHora}
                            style={{ marginBottom: '1.5rem' }}
                            onChange={(e) => setNuevaFechaHora(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => setReprogramarTurnoId(null)} className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)' }}>Cancelar</button>
                            <button onClick={handleReschedule} className="btn btn-primary">Confirmar Cambio</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
