import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                BookFlow
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors font-medium">Panel de Control</Link>
              <Link href="/auth/login" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">Iniciar Sesión</Link>
              <Link href="/auth/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:opacity-20"></div>
          <div className="absolute top-0 left-0 -ml-20 mt-32 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>

          <div className="text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-8">
              Scheduling made <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">effortless</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-neutral-600 dark:text-neutral-400 mx-auto mb-10">
              The ultimate multi-tenant booking platform for barbershops, salons, doctors, and consultants. Manage your time, clients, and team in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center">
                Crea tu cuenta gratis
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </Link>
              <Link href="/dashboard" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all shadow-sm flex items-center justify-center">
                Ir al Panel (Dashboard)
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
              <div className="flex items-center px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
                <div className="col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-neutral-50 dark:bg-neutral-950">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"></div>
                    <div className="h-10 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"></div>
                    <div className="h-10 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800"></div>
                  </div>
                </div>
                <div className="col-span-2 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-900">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4 mb-6"></div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-24 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50"></div>
                    <div className="h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50"></div>
                    <div className="h-24 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 dark:border-violet-800/50"></div>
                  </div>
                  <div className="h-32 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
