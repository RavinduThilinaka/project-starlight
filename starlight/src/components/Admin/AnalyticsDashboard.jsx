import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';
import { 
  AiOutlineMenu, 
  AiOutlineBell,
  AiOutlineDownload,
  AiOutlineCalendar,
  AiOutlineFilter,
  AiOutlineRise,
  AiOutlineFall
} from 'react-icons/ai';
import { 
  FiTrendingUp, 
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
  FiActivity,
  FiTarget
} from 'react-icons/fi';
import Sidebar from './AdminSidebar';

const AnalyticsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [activeMetric, setActiveMetric] = useState('users');

  const analyticsData = [
    { date: 'Jan 1', users: 120, orders: 85, revenue: 7850, sessions: 450 },
    { date: 'Jan 2', users: 180, orders: 120, revenue: 11200, sessions: 520 },
    { date: 'Jan 3', users: 150, orders: 95, revenue: 8900, sessions: 480 },
    { date: 'Jan 4', users: 210, orders: 140, revenue: 13200, sessions: 600 },
    { date: 'Jan 5', users: 240, orders: 160, revenue: 15400, sessions: 680 },
    { date: 'Jan 6', users: 300, orders: 200, revenue: 19000, sessions: 750 },
    { date: 'Jan 7', users: 350, orders: 240, revenue: 22500, sessions: 820 },
  ];

  const pieData = [
    { name: 'Direct', value: 400, color: '#8B5CF6' },
    { name: 'Social', value: 300, color: '#10B981' },
    { name: 'Referral', value: 300, color: '#F59E0B' },
    { name: 'Organic', value: 200, color: '#EF4444' },
  ];

  const radialData = [
    { name: 'Target', value: 78, fill: '#8B5CF6' },
    { name: 'Current', value: 65, fill: '#10B981' },
  ];

  const metrics = [
    { key: 'users', label: 'Users', value: '2.5K', change: '+12.5%', icon: <FiUsers />, color: 'blue' },
    { key: 'orders', label: 'Orders', value: '1.2K', change: '+8.2%', icon: <FiShoppingCart />, color: 'purple' },
    { key: 'revenue', label: 'Revenue', value: '$45.2K', change: '+23.1%', icon: <FiDollarSign />, color: 'green' },
    { key: 'sessions', label: 'Sessions', value: '15.2K', change: '+5.4%', icon: <FiActivity />, color: 'orange' },
  ];

  const totalUsers = analyticsData.reduce((sum, item) => sum + item.users, 0);
  const totalOrders = analyticsData.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = analyticsData.reduce((sum, item) => sum + item.revenue, 0);
  const avgConversion = ((totalOrders / totalUsers) * 100).toFixed(1);

  const handleLogout = () => {
    // Logout logic
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
          <p className="font-bold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="flex items-center" style={{ color: entry.color }}>
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: <span className="font-bold ml-2">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        handleLogout={handleLogout}
      />

      <div className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-8 py-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-md transition-all"
              >
                <AiOutlineMenu className="w-6 h-6 text-gray-700" />
              </motion.button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                <p className="text-gray-500">Real-time insights and metrics</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <AiOutlineCalendar />
                <span>Date Range</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 text-indigo-600"
              >
                <AiOutlineFilter />
                <span>Filters</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
              >
                <AiOutlineDownload />
                <span>Export</span>
              </motion.button>
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.key}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all ${
                  activeMetric === metric.key ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setActiveMetric(metric.key)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-${metric.color}-100 to-${metric.color}-50`}>
                    <div className={`text-2xl text-${metric.color}-500`}>
                      {metric.icon}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {metric.change.includes('+') ? (
                    <AiOutlineRise className="text-emerald-500 mr-1" />
                  ) : (
                    <AiOutlineFall className="text-rose-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.change.includes('+') ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {metric.change} from last month
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Performance Overview</h3>
                  <p className="text-gray-500">Key metrics over time</p>
                </div>
                <div className="flex space-x-2">
                  {['week', 'month', 'quarter'].map(range => (
                    <motion.button
                      key={range}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        timeRange === range 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#8B5CF6" 
                      fill="url(#colorUsers)" 
                      strokeWidth={3}
                      name="Registered Users"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      fill="url(#colorRevenue)" 
                      strokeWidth={3}
                      name="Revenue ($)"
                    />
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie Chart */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Traffic Sources</h3>
                  <p className="text-gray-500">User acquisition channels</p>
                </div>
                <FiTarget className="text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Bar Chart & Radial Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6">Orders vs Revenue</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="orders" fill="#8B5CF6" name="Orders" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue ($)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6">Target Achievement</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    innerRadius="20%" 
                    outerRadius="90%" 
                    data={radialData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar 
                      label={{ position: 'insideStart', fill: '#fff' }} 
                      background 
                      dataKey="value" 
                    />
                    <Legend iconSize={10} />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Data Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Daily Analytics</h3>
                  <p className="text-gray-500">Detailed performance metrics</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-lg"
                >
                  Export Data
                </motion.button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Orders</th>
                    <th className="px6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sessions</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analyticsData.map((item, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{item.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-blue-600 font-medium">{item.users}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-purple-600 font-medium">{item.orders}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-emerald-600 font-medium">${item.revenue.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-amber-600 font-medium">{item.sessions}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          (item.orders / item.users) * 100 > 15 
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {((item.orders / item.users) * 100).toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Summary Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-bold text-gray-800">7</span> days of analytics data
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{totalUsers}</div>
                    <div className="text-xs text-gray-500">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{totalOrders}</div>
                    <div className="text-xs text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">${(totalRevenue/1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-500">Total Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{avgConversion}%</div>
                    <div className="text-xs text-gray-500">Avg. Conversion</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <footer className="px-8 py-6 text-center text-gray-500 text-sm border-t border-gray-200/50">
          <p>Analytics Dashboard • Real-time Monitoring • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;