import Link from 'next/link';

export const metadata = {
    title: 'Book an Appointment',
};

export default async function BookingPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    
    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-2 text-sm font-medium">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-sm ring-4 ring-blue-50">1</span>
                    <span className="text-blue-600 hidden sm:inline-block">Select Service</span>
                    <div className="w-4 h-px bg-gray-300 mx-2"></div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">2</span>
                    <span className="text-gray-400 hidden sm:inline-block">Choose Time</span>
                    <div className="w-4 h-px bg-gray-300 mx-2"></div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">3</span>
                    <span className="text-gray-400 hidden sm:inline-block">Details</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Service Card */}
                    <Link href={`/${params.slug}/book/time?service=consultation`} className="block group">
                        <div className="h-full border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md hover:bg-blue-50/30 transition-all duration-200 cursor-pointer flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">Initial Consultation</h3>
                                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-md">$150</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">A foundational meeting to discuss client needs and setup the project timeline.</p>
                            <div className="mt-auto flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                60 minutes
                            </div>
                        </div>
                    </Link>

                    {/* Service Card */}
                    <Link href={`/${params.slug}/book/time?service=followup`} className="block group">
                        <div className="h-full border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md hover:bg-blue-50/30 transition-all duration-200 cursor-pointer flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">Follow-up Session</h3>
                                <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-md">$75</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">Review progress and adjust strategies based on the initial consultation's roadmap.</p>
                            <div className="mt-auto flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                30 minutes
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
