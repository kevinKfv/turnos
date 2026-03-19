import Link from 'next/link';

export const metadata = {
    title: 'Choose a Time - BookFlow',
};

export default async function BookingTimePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    
    return (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-2 text-sm font-medium">
                    <Link href={`/${params.slug}`} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </Link>
                    <span className="text-gray-500 hidden sm:inline-block">Select Service</span>
                    <div className="w-4 h-px bg-blue-600 mx-2"></div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-sm ring-4 ring-blue-50">2</span>
                    <span className="text-blue-600 hidden sm:inline-block">Choose Time</span>
                    <div className="w-4 h-px bg-gray-300 mx-2"></div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">3</span>
                    <span className="text-gray-400 hidden sm:inline-block">Details</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Select a Date & Time</h2>
                        <p className="text-gray-500 mt-1">Initial Consultation (60 min)</p>
                    </div>
                    <Link href={`/${params.slug}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                        Change Service
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Calendar Placeholder */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Select Date</h3>
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 aspect-square flex items-center justify-center text-gray-400 font-medium">
                            [ Interactive Calendar Component ]
                        </div>
                    </div>

                    {/* Time Slots Placeholder */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Available Times</h3>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500 mb-2">Showing times for: <span className="font-semibold text-gray-900">Oct 24, 2026</span></p>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href={`/${params.slug}/book/confirm`} className="flex items-center justify-center border border-blue-200 bg-white text-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-lg py-2.5 font-medium transition-colors">
                                    09:00 AM
                                </Link>
                                <Link href={`/${params.slug}/book/confirm`} className="flex items-center justify-center border border-blue-200 bg-white text-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-lg py-2.5 font-medium transition-colors">
                                    10:00 AM
                                </Link>
                                <Link href={`/${params.slug}/book/confirm`} className="flex items-center justify-center border border-blue-200 bg-white text-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-lg py-2.5 font-medium transition-colors">
                                    11:30 AM
                                </Link>
                                <Link href={`/${params.slug}/book/confirm`} className="flex items-center justify-center border border-blue-200 bg-white text-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-lg py-2.5 font-medium transition-colors">
                                    01:00 PM
                                </Link>
                                <Link href={`/${params.slug}/book/confirm`} className="flex items-center justify-center border border-blue-200 bg-white text-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-lg py-2.5 font-medium transition-colors">
                                    03:30 PM
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
