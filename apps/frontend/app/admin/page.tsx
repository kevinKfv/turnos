export default function AdminDashboard() {
  const dummyTenants = [
    { id: "t_1", name: "Barbería Los Hermanos", slug: "barberia-los-hermanos", plan: "Pro", status: "Active", revenue: "$49.00", users: 5 },
    { id: "t_2", name: "Dra. Ana López (Dentista)", slug: "dra-ana", plan: "Basic", status: "Active", revenue: "$19.00", users: 1 },
    { id: "t_3", name: "Spa Belleza Total", slug: "spa-belleza", plan: "Enterprise", status: "Active", revenue: "$99.00", users: 12 },
    { id: "t_4", name: "Consultoría Legal Sur", slug: "consultoria-sur", plan: "Basic", status: "Past Due", revenue: "$0.00", users: 2 },
    { id: "t_5", name: "Centro Terapéutico Paz", slug: "terapia-paz", plan: "Pro", status: "Active", revenue: "$49.00", users: 3 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Resumen de la Plataforma Global</h2>
          <p className="text-slate-500 mt-1">Monitorea el crecimiento, suscripciones y métricas de todos los negocios (Tenants).</p>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Negocios Activos</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-slate-800">142</p>
            <p className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">+15 mes</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">MRR (Ingresos Recurrentes)</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-slate-800">$4,850</p>
            <p className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">+12%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usuarios Registrados</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-slate-800">854</p>
            <p className="text-sm text-slate-500 font-medium">Plataforma entera</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tasa de Deserción (Churn)</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-extrabold text-rose-600">2.1%</p>
            <p className="text-sm text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-md">+0.3%</p>
          </div>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Negocios Registrados (Tenants)</h3>
          <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors flex items-center">
            Ver todos los registros 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-bold">Negocio</th>
                <th className="px-6 py-4 font-bold">Suscripción</th>
                <th className="px-6 py-4 font-bold">Estado</th>
                <th className="px-6 py-4 font-bold">Base de Usuarios</th>
                <th className="px-6 py-4 font-bold text-right">MRR Aportado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800">{tenant.name}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">/{tenant.slug}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-100/50 text-indigo-700">
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full mr-2 shadow-sm ${tenant.status === 'Active' ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-amber-500 shadow-amber-500/30'}`}></div>
                      <span className="text-sm font-bold text-slate-600">{tenant.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-500">{tenant.users} miembros</td>
                  <td className="px-6 py-5 text-sm font-extrabold text-slate-800 text-right tracking-tight">{tenant.revenue} / mes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
