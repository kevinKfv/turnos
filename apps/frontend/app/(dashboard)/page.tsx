'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
    UsersIcon, 
    CalendarDaysIcon, 
    BanknotesIcon, 
    ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

const MOCK_REVENUE_DATA = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 550 },
  { name: 'Thu', revenue: 200 },
  { name: 'Fri', revenue: 700 },
  { name: 'Sat', revenue: 800 },
  { name: 'Sun', revenue: 450 },
];

const MOCK_APPOINTMENTS_DATA = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 3 },
  { name: 'Wed', count: 6 },
  { name: 'Thu', count: 2 },
  { name: 'Fri', count: 8 },
  { name: 'Sat', count: 9 },
  { name: 'Sun', count: 5 },
];

const MOCK_RECENT_ACTIVITY = [
  { id: 1, customer: 'Alice Smith', service: 'Haircut', time: '10:00 AM Today', price: '$45', status: 'Completed' },
  { id: 2, customer: 'Bob Johnson', service: 'Beard Trim', time: '11:30 AM Today', price: '$25', status: 'Completed' },
  { id: 3, customer: 'Charlie Davis', service: 'Hair Coloring', time: '2:00 PM Today', price: '$120', status: 'Pending' },
  { id: 4, customer: 'Diana Prince', service: 'Consultation', time: '4:00 PM Today', price: '$0', status: 'Pending' },
];

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Here is what is happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
           <select className="text-sm border-gray-200 rounded-lg focus:ring-blue-600 focus:border-blue-600 py-2 pl-3 pr-10">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>This Year</option>
           </select>
           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              Download Report
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
           <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                 <BanknotesIcon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                +12.5%
              </span>
           </div>
           <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">$3,400</p>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
           <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-50 rounded-lg">
                 <CalendarDaysIcon className="w-6 h-6 text-purple-600" />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                +8.2%
              </span>
           </div>
           <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Appointments</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">37</p>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
           <div className="flex items-center justify-between">
              <div className="p-2 bg-pink-50 rounded-lg">
                 <UsersIcon className="w-6 h-6 text-pink-600" />
              </div>
              <span className="flex items-center text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                0%
              </span>
           </div>
           <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
           <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-50 rounded-lg">
                 <CalendarDaysIcon className="w-6 h-6 text-amber-600" />
              </div>
           </div>
           <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Today</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
           </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Growth</h3>
           <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={MOCK_REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   formatter={(value: any) => [`$${value}`, 'Revenue']}
                 />
                 <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Appointments Volume</h3>
           <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={MOCK_APPOINTMENTS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   cursor={{fill: '#F3F4F6'}}
                 />
                 <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_RECENT_ACTIVITY.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{activity.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{activity.service}</td>
                  <td className="px-6 py-4 text-gray-600">{activity.time}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{activity.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
