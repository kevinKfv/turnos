import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api/axios';
import { useAuth, User } from '../context/AuthContext';

const locales = {
    'es': es,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface Appointment {
    id: number;
    fechaHora: string;
    estado: string;
    profesional?: User;
    cliente?: User;
}

const ReservationCalendar = ({
    onSelectSlot
}: {
    onSelectSlot: (start: Date, professionalId: number) => void
}) => {
    const { user } = useAuth();
    const [events, setEvents] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<User[]>([]);
    const [selectedProf, setSelectedProf] = useState('');
    const [view, setView] = useState<View>(Views.WEEK);

    useEffect(() => {
        const fetchProfessionals = async () => {
            if (user?.role === 'CLIENTE' || user?.role === 'ADMIN') {
                try {
                    const { data } = await api.get('/appointments/professionals');
                    setProfessionals(data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchProfessionals();
    }, [user]);

    const loadAppointments = async (profId: string) => {
        try {
            // Un endpoint u optamos por filtrar en cliente
            const { data } = await api.get('/appointments');
            const filtered = profId ? data.filter((a: Appointment) => a.profesional?.id === Number(profId)) : data;

            setEvents(filtered.map((app: Appointment) => ({
                id: app.id,
                title: app.estado === 'PENDIENTE' || app.estado === 'CONFIRMADO' ? 'Ocupado' : 'Disponible',
                start: new Date(app.fechaHora),
                end: new Date(new Date(app.fechaHora).getTime() + 60 * 60 * 1000), // Asumimos 1 hora por turno
                allDay: false
            })));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (selectedProf) {
            loadAppointments(selectedProf);
        } else {
            setEvents([]);
        }
    }, [selectedProf]);

    const handleSelectSlot = (slotInfo: { start: Date, end: Date }) => {
        if (!selectedProf) {
            alert("Por favor selecciona un profesional primero.");
            return;
        }
        onSelectSlot(slotInfo.start, Number(selectedProf));
    };

    return (
        <div className="card mt-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Calendario de Disponibilidad</h3>
                {(user?.role === 'CLIENTE' || user?.role === 'ADMIN') && (
                    <select className="form-select" style={{ width: '250px' }} value={selectedProf} onChange={e => setSelectedProf(e.target.value)}>
                        <option value="">Seleccione un Profesional...</option>
                        {professionals.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                )}
            </div>

            <div style={{ height: '500px', marginTop: '1rem' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    culture="es"
                    view={view}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    onView={(v) => setView(v)}
                    selectable={true}
                    onSelectSlot={handleSelectSlot}
                    min={new Date(0, 0, 0, 8, 0, 0)} // Empieza 8am
                    max={new Date(0, 0, 0, 20, 0, 0)} // Termina 8pm
                    messages={{
                        next: "Sig",
                        previous: "Ant",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                    }}
                />
            </div>
        </div>
    );
};

export default ReservationCalendar;
