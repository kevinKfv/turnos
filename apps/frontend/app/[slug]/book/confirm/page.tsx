import Link from 'next/link';
import CheckoutForm from './CheckoutForm';

export const metadata = {
    title: 'Confirm Details - BookFlow',
};

export default async function BookingConfirmPage(props: { params: Promise<{ slug: string }> }) {
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
                    <Link href={`/${params.slug}/book/time`} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </Link>
                    <span className="text-gray-500 hidden sm:inline-block">Choose Time</span>
                    <div className="w-4 h-px bg-blue-600 mx-2"></div>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white shadow-sm ring-4 ring-blue-50">3</span>
                    <span className="text-blue-600 hidden sm:inline-block">Details</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">

                {/* Left: Booking Summary */}
                <div className="p-6 sm:p-8 bg-gray-50 md:w-1/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Booking Summary</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Service</p>
                                <p className="text-lg font-semibold text-gray-900">Initial Consultation</p>
                                <p className="text-sm text-gray-500">60 minutes</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Date & Time</p>
                                <p className="text-lg font-semibold text-gray-900">October 24, 2026</p>
                                <p className="text-sm text-gray-500">09:00 AM - 10:00 AM</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Total</p>
                                <p className="text-2xl font-bold text-gray-900">$150.00</p>
                            </div>
                        </div>
                    </div>

                    <Link href={`/${params.slug}/book/time`} className="mt-8 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Go Back
                    </Link>
                </div>

                {/* Right: Customer Form */}
                <div className="p-6 sm:p-8 md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Details</h2>

                    <CheckoutForm slug={params.slug} />
                </div>

            </div>
        </div>
    );
}
