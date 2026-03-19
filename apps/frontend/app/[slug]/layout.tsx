import { ReactNode } from 'react';

export default async function BookingLayout(props: { children: ReactNode, params: Promise<{ slug: string }> }) {
    const { children } = props;
    const params = await props.params;
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                            {params.slug.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 capitalize tracking-tight">{params.slug.replace('-', ' ')}</h1>
                            <p className="text-xs text-gray-500 font-medium">Powered by BookFlow</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 md:py-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="footer footer-center p-4 bg-white text-gray-500 text-sm border-t border-gray-100">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by BookFlow SaaS</p>
                </aside>
            </footer>
        </div>
    );
}
