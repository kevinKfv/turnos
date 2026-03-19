export default function CustomersPage() {
  const dummyCustomers = [
    { id: 1, name: "María Gómez", email: "maria@example.com", phone: "+54 9 11 1234-5678", totalVisits: 5, noShows: 0, lastVisit: "2026-03-10" },
    { id: 2, name: "Carlos López", email: "carlos@example.com", phone: "+54 9 11 8765-4321", totalVisits: 2, noShows: 1, lastVisit: "2026-02-28" },
    { id: 3, name: "Ana Martínez", email: "ana.m@example.com", phone: "+54 9 11 5555-5555", totalVisits: 12, noShows: 0, lastVisit: "2026-03-15" },
    { id: 4, name: "Julieta Silva", email: "jsilva@example.com", phone: "+54 9 11 4444-4444", totalVisits: 1, noShows: 0, lastVisit: "2026-03-01" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CRM de Clientes</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestiona tus clientes, historial de turnos y notas.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Añadir Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Clientes</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,248</p>
          <p className="text-sm text-green-600 font-medium mt-2">+12 esta semana</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasa de Asistencia</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">94%</p>
          <p className="text-sm text-gray-500 mt-2">Promedio mensual</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Faltas (No-shows)</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-500 mt-2">14</p>
          <p className="text-sm text-gray-500 mt-2">Últimos 30 días</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/20">
          <h2 className="font-semibold text-gray-900 dark:text-white">Directorio de Clientes</h2>
          <div className="relative">
            <input type="text" placeholder="Buscar cliente..." className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white outline-none" />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Contacto</th>
                <th className="p-4 font-medium">Turnos</th>
                <th className="p-4 font-medium">Faltas</th>
                <th className="p-4 font-medium">Última Visita</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {dummyCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mr-3">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{customer.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900 dark:text-white">{customer.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{customer.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30">
                      {customer.totalVisits} visitas
                    </span>
                  </td>
                  <td className="p-4">
                    {customer.noShows > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/30">
                        {customer.noShows} faltas
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">0</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {customer.lastVisit}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold transition-colors">Ver Perfil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
