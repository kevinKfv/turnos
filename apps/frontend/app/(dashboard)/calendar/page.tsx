export const metadata = {
    title: 'Calendar - BookFlow',
    description: 'Manage your schedule and appointments',
};

export default function CalendarPage() {
    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Appointments Calendar</h1>
                <div className="flex space-x-3">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 h-10 px-4 py-2 transition-colors">
                        Today
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 shadow-sm transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        New Booking
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex items-center justify-center min-h-[500px]">
                {/* Placeholder for actual FullCalendar or React Big Calendar component */}
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Calendar View</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Interactive timeline will load here. Currently waiting for backend integration.</p>
                </div>
            </div>
        </div>
    );
}
