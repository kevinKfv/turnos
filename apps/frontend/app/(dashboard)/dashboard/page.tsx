export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Analíticas</h1>
                    <p className="text-gray-500 dark:text-gray-400">Métricas clave de tu negocio en tiempo real.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Turnos Hoy</h3>
                        <span className="text-emerald-500 text-sm font-semibold flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/30">
                            +12% <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        </span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3 flex items-baseline gap-2">124 <span className="text-sm font-medium text-gray-400 lowercase font-normal tracking-normal">reservas</span></p>
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Ingresos (Mes)</h3>
                        <span className="text-emerald-500 text-sm font-semibold flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/30">
                            +8.1% <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        </span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">$24,500</p>
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Ocupación</h3>
                        <span className="text-rose-500 text-sm font-semibold flex items-center bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-md border border-rose-100 dark:border-rose-800/30">
                            -1.2% <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">84%</p>
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Retención</h3>
                        <span className="text-emerald-500 text-sm font-semibold flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/30">
                            +5.4% <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7-7m-7-7v18"></path></svg>
                        </span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3 flex items-baseline gap-2">78% <span className="text-sm font-medium text-gray-400 lowercase font-normal tracking-normal">regresan</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ingresos Chart Mockup */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-8 text-lg">Ingresos Mensuales</h3>
                    <div className="flex items-end justify-between space-x-2 h-52 mt-4 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                            <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                            <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                            <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                        </div>
                        
                        <div className="w-[12%] bg-blue-100 dark:bg-blue-900/30 rounded-t-sm h-[40%] relative group hover:bg-blue-200 transition-colors z-10"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$12k</div></div>
                        <div className="w-[12%] bg-blue-200 dark:bg-blue-900/40 rounded-t-sm h-[50%] relative group hover:bg-blue-300 transition-colors z-10"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$15k</div></div>
                        <div className="w-[12%] bg-blue-300 dark:bg-blue-900/50 rounded-t-sm h-[45%] relative group hover:bg-blue-400 transition-colors z-10"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$14k</div></div>
                        <div className="w-[12%] bg-blue-400 dark:bg-blue-900/60 rounded-t-sm h-[65%] relative group hover:bg-blue-500 transition-colors z-10"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$19k</div></div>
                        <div className="w-[12%] bg-blue-500 dark:bg-blue-800/70 rounded-t-sm h-[80%] relative group hover:bg-blue-600 transition-colors z-10"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$23k</div></div>
                        <div className="w-[12%] bg-blue-600 dark:bg-blue-600 rounded-t-sm h-[95%] relative group hover:bg-blue-700 transition-colors z-10 shadow-lg shadow-blue-500/20"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">$28k</div></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-400 dark:text-gray-500 mt-4 px-1">
                        <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
                    </div>
                </div>

                {/* Popular Services */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-8 text-lg">Servicios Más Populares</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Corte de Cabello Premium</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">45%</span>
                            </div>
                            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Perfilado de Barba</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">28%</span>
                            </div>
                            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Corte + Barba + Lavado</span>
                                <span className="font-bold text-violet-600 dark:text-violet-400">17%</span>
                            </div>
                            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-violet-500 h-2.5 rounded-full" style={{ width: '17%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Colorimetría</span>
                                <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">10%</span>
                            </div>
                            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-fuchsia-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Appointments Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Próximos Turnos</h2>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-800 transition-colors">Ver calendario completo →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold">Cliente</th>
                                <th className="px-6 py-4 font-bold">Servicio</th>
                                <th className="px-6 py-4 font-bold">Profesional</th>
                                <th className="px-6 py-4 font-bold">Horario</th>
                                <th className="px-6 py-4 font-bold">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                                <td className="px-6 py-5 flex items-center space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">JS</div>
                                    <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Juan Pérez</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 dark:text-gray-400 font-medium">Corte Premium</td>
                                <td className="px-6 py-5 text-gray-600 dark:text-gray-400 font-medium">Miguel Ángel</td>
                                <td className="px-6 py-5 text-gray-600 dark:text-gray-400 font-medium">10:00 AM</td>
                                <td className="px-6 py-5">
                                    <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800/30 dark:text-emerald-400">Confirmado</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                                <td className="px-6 py-5 flex items-center space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">ED</div>
                                    <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Elena Díaz</span>
                                </td>
                                <td className="px-6 py-5 text-gray-600 dark:text-gray-400 font-medium">Perfilado Barba</td>
                                <td className="px-6 py-5 text-gray-600 dark:text-gray-400 font-medium">Sara Williams</td>
                                <td className="px-6 py-5 text-gray-600 dark:text-gray-400 font-medium">11:30 AM</td>
                                <td className="px-6 py-5">
                                    <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-amber-50 border border-amber-100 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800/30 dark:text-amber-400">Pendiente</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
