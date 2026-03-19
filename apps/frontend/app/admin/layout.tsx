export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
            {/* Dark Sidebar for Super Admin */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 hidden md:block text-slate-300">
                <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
                    <span className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6z"/></svg>
                        SaaS Admin
                    </span>
                </div>
                <nav className="p-4 space-y-2">
                    <a href="/admin" className="flex items-center space-x-3 px-3 py-2.5 bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        <span>Visión General</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        <span>Negocios (Tenants)</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2h3a2 2 0 002-2zm0 0V9a2 2 0 012-2h3a2 2 0 012 2v10m-6 0a2 2 0 002 2h3a2 2 0 002-2V11a2 2 0 012-2h3a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4-9-5 9h5z"></path></svg>
                        <span>Suscripciones & MRR</span>
                    </a>
                    <div className="pt-6 pb-2">
                        <div className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sistema</div>
                    </div>
                    <a href="/" className="flex items-center space-x-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <span>Volver a la Home</span>
                    </a>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
                <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200">
                    <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Super Admin Panel</h1>
                    <div className="flex items-center space-x-4 text-sm font-semibold text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></div>
                        System Owner
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
