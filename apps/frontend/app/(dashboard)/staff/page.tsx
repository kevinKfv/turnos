export const metadata = {
    title: 'Staff Management - BookFlow',
    description: 'Manage your staff and availability',
};

export default function StaffPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Staff Management</h1>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 shadow-sm transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Invite Staff
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
                    <li className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                                    JS
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-900 dark:text-white">John Smith</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Senior Consultant</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Edit Profile & Hours</button>
                            </div>
                        </div>
                    </li>

                    <li className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-lg">
                                    MJ
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Mary Jane</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Junior Therapist</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Edit Profile & Hours</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
