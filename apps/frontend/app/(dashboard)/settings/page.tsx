"use client";
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración del Negocio</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona el perfil de tu empresa, integraciones de pago y notificaciones automáticas.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800 px-6 pt-4 flex space-x-8 overflow-x-auto hide-scrollbar">
          <button 
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'profile' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('profile')}
          >
            Perfil del Negocio
          </button>
          <button 
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'payments' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('payments')}
          >
            Pagos y Facturación
          </button>
          <button 
            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'notifications' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notificaciones (WhatsApp/Email)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          
          {/* PROFILE COMPONENT */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-6">Información Pública</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nombre del Negocio</label>
                    <input type="text" defaultValue="Barbería Los Hermanos" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">URL del Sistema (Slug)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium">turnos.com/</span>
                      <input type="text" defaultValue="barberia-los-hermanos" className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-r-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-shadow" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Descripción (Aparece en tu agenda pública)</label>
                    <textarea rows={3} defaultValue="Los mejores cortes clásicos y modernos de Buenos Aires." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-shadow"></textarea>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-all hover:-translate-y-0.5">Guardar Cambios</button>
              </div>
            </div>
          )}

          {/* PAYMENTS COMPONENT */}
          {activeTab === 'payments' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">Integraciones de Pasarelas de Pago</h3>
                <p className="text-gray-500 text-sm font-medium mb-6">Vincula tu cuenta para cobrar señas o turnos completos por adelantado, lo cual disminuye radicalmente las faltas (no-shows).</p>
                
                <div className="space-y-4">
                  {/* Stripe */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 bg-[#635BFF]/10 dark:bg-[#635BFF]/20 rounded-xl flex items-center justify-center border border-[#635BFF]/20">
                        <span className="text-[#635BFF] font-extrabold text-2xl">S</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Stripe</h4>
                        <p className="text-sm text-gray-500 font-medium">Cobros internacionales con Visa, Mastercard y Apple Pay.</p>
                      </div>
                    </div>
                    <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-bold rounded-full border border-gray-200 dark:border-gray-700">No vinculado</span>
                  </div>

                  {/* MercadoPago */}
                  <div className="border border-[#009EE3]/30 dark:border-[#009EE3]/50 bg-[#009EE3]/5 dark:bg-[#009EE3]/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#009EE3] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg tracking-wider">Recomendado en Latam</div>
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border border-[#009EE3]/30 shadow-sm">
                        <span className="text-[#009EE3] font-black text-xl italic tracking-tighter">MP</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Mercado Pago</h4>
                        <p className="text-sm text-gray-500 font-medium leading-snug max-w-sm">Acepta dinero en cuenta, tarjetas locales y cuotas. Ideal para usuarios en tu región.</p>
                      </div>
                    </div>
                    <button className="bg-[#009EE3] hover:bg-[#008DD0] text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap mt-2 md:mt-0">
                      Vincular MP
                    </button>
                  </div>
                </div>
              </div>

              {/* Ajustes de cobro */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-extrabold text-gray-900 dark:text-white mb-6 text-lg">Reglas de Cobro de Turnos</h4>
                <div className="space-y-5 bg-gray-50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <label className="flex items-start space-x-4 cursor-pointer group">
                    <div className="flex items-center h-6">
                      <input type="radio" name="payment_rule" className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    </div>
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold block mb-1">Requerir pago completo al agendar</span>
                      <span className="text-sm text-gray-500 font-medium">El cliente debe pagar el 100% del servicio para que su turno sea reservado.</span>
                    </div>
                  </label>
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  <label className="flex items-start space-x-4 cursor-pointer group">
                    <div className="flex items-center h-6">
                      <input type="radio" name="payment_rule" className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                    <div>
                      <span className="text-gray-900 dark:text-white font-bold block mb-1">Requerir solo seña anticipada</span>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-sm text-gray-500 font-medium">Monto de la seña: </span>
                        <div className="relative w-24">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                          <input type="number" defaultValue={30} className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-bold outline-none" disabled />
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-all hover:-translate-y-0.5">Guardar Preferencias de Pago</button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS COMPONENT */}
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">Recordatorios Automáticos</h3>
                <p className="text-gray-500 text-sm font-medium">Programa las notificaciones que reciben tus clientes al reservar, así se reduce drásticamente el ausentismo.</p>
              </div>

              {/* WhatsApp Config */}
              <div className="bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6 md:p-8 bg-emerald-50/50 dark:bg-emerald-900/10 border-b border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M2.083 17.5l1.636-5.968A11.96 11.96 0 0110.02 0c6.627 0 12 5.373 12 12s-5.373 12-12 12a11.96 11.96 0 01-6.108-1.67L0 23.957l2.083-6.457zm8.138-12.7c-.201 0-.493-.058-.707.011-.274.088-.567.411-.645.72-.116.467-.184 1.139.115 1.701.396.745 1.54 2.825 2.16 3.974.225.417.47.79.809.992.348.209.774.249 1.109.117.414-.162 1.4-1.026 1.76-1.393.18-.184.225-.494.045-.664-1.12-1.056-2.5-2.222-2.924-2.585-.164-.14-.476-.039-.672.285-.296.488-.501.791-.676.84-.176.049-.395-.084-.668-.31-1.018-.846-1.574-1.423-2.126-2.261-.137-.208-.046-.427.1-.555.201-.176.469-.47.59-.72.096-.197.026-.532-.123-.746-.35-.5-.956-1.385-1.105-1.554-.112-.126-.339-.176-.566-.176z" /></svg>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg">WhatsApp API Integrada</h4>
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-500">Recordatorios vía bots oficiales</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Mensaje de Confirmación de Turno</label>
                    <textarea rows={3} className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-500 rounded-xl dark:text-white outline-none font-medium transition-colors" defaultValue="¡Hola {{customer_name}}! 🎉 Tu turno para {{service_name}} ha sido confirmado para el {{appointment_date}} a las {{appointment_time}}. ¡Te esperamos en {{business_name}}!"></textarea>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-bold text-gray-500">Variables útiles:</span>
                      <code className="text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100">{"{{customer_name}}"}</code>
                      <code className="text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100">{"{{service_name}}"}</code>
                      <code className="text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100">{"{{appointment_time}}"}</code>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Recordatorio Previo (Avisar 24 hs antes)</label>
                    <textarea rows={3} className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-emerald-500 rounded-xl dark:text-white outline-none font-medium transition-colors" defaultValue="👋 Hola {{customer_name}}, este es un recordatorio de tu turno mañana a las {{appointment_time}}. Si necesitas reprogramar, responde a este chat."></textarea>
                  </div>
                </div>
              </div>

              {/* Email Config */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-lg">Correos Electrónicos (Email)</h4>
                      <p className="text-sm font-medium text-gray-500">Recibos de pagos y links de Google Meet/Zoom</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/40">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">El sistema envía automáticamente correos estilizados con el branding de tu negocio cuando un turno es agendado, cancelado o reprogramado. Las plantillas HTML se generan solas usando el logo y colores que definas en el Perfil del Negocio.</p>
                  <button className="mt-4 text-blue-700 dark:text-blue-400 font-bold text-sm bg-white dark:bg-gray-900 shadow-sm px-5 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path></svg>
                    Enviar correo de prueba
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-all hover:-translate-y-0.5">Guardar Notificaciones</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
