'use client';

import { useState } from 'react';

export default function CheckoutForm({ slug }: { slug: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Simulate API call to create the Appointment locally in the database
            // const appointmentResponse = await fetch('/api/appointments', { method: 'POST', body: ... });
            // const { appointmentId } = await appointmentResponse.json();
            const mockupAppointmentId = 'mock-apt-1234';

            // 2. Call the NestJS backend to generate the Mercado Pago preference
            // In a real env, this points to your NestJS backend URL, e.g., process.env.NEXT_PUBLIC_API_URL
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
            
            // For MVP demonstration, we simulate the MP payload redirect
            const mpResponse = await fetch(`${apiUrl}/payment/checkout/${mockupAppointmentId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    successUrl: window.location.origin + `/${slug}/payment/success`,
                    failureUrl: window.location.origin + `/${slug}/payment/failure`,
                })
            });

            if (!mpResponse.ok) {
                // If backend is not available during dev, just simulate a redirect
                console.warn('Backend payment endpoint returned an error, simulating MP redirect...');
                setTimeout(() => {
                    window.location.href = `/${slug}/payment/success`;
                }, 1000);
                return;
            }

            const data = await mpResponse.json();
            
            // 3. Redirect the user to Mercado Pago checkout URL
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                throw new Error('No checkout URL returned');
            }

        } catch (error) {
            console.error('Checkout error:', error);
            // Simulate redirect on offline dev
            setTimeout(() => {
                window.location.href = `/${slug}/payment/success`;
            }, 1000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" placeholder="John" required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" placeholder="Doe" required />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" placeholder="john@example.com" required />
                <p className="text-xs text-gray-500">We will send a calendar invite and confirmation here.</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors" placeholder="+1 (555) 000-0000" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors min-h-[100px]" placeholder="Please share anything that will help prepare for our meeting."></textarea>
            </div>

            <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center disabled:opacity-70"
                >
                    {isLoading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Redirecting to MercadoPago...
                        </span>
                    ) : (
                        "Pay & Confirm Appointment"
                    )}
                </button>
            </div>
        </form>
    );
}
