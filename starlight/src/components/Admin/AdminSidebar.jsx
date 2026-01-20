import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AiOutlineDashboard, 
  AiOutlineUser, 
  AiOutlineShoppingCart, 
  AiOutlineDollar, 
  AiOutlinePieChart, 
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineDatabase
} from 'react-icons/ai';
import { 
  FiUsers, 
  FiBarChart2, 
  FiPackage,
  FiCreditCard,
  FiActivity
} from 'react-icons/fi';
import { RiShieldUserLine } from 'react-icons/ri';

const AdminSidebar = ({ isSidebarOpen, handleLogout, activeTab, setActiveTab }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <AiOutlineDashboard className="w-6 h-6"/>, 
      path: "/admin",
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Users', 
      icon: <AiOutlineTeam className="w-6 h-6" />, 
      path: "/users",
      color: 'from-emerald-500 to-green-500'
    },
    { 
      name: 'Products', 
      icon: <FiPackage className="w-6 h-6" />, 
      path: "/products",
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Orders', 
      icon: <AiOutlineShoppingCart className="w-6 h-6" />, 
      path: "/orders",
      color: 'from-amber-500 to-orange-500'
    },
    { 
      name: 'Payments', 
      icon: <FiCreditCard className="w-6 h-6" />, 
      path: "/payments",
      color: 'from-rose-500 to-red-500'
    },
    { 
      name: 'Analytics', 
      icon: <AiOutlinePieChart className="w-6 h-6" />, 
      path: "/analytics",
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      name: 'Database', 
      icon: <AiOutlineDatabase className="w-6 h-6" />, 
      path: "/database",
      color: 'from-gray-600 to-gray-800'
    },
    { 
      name: 'Settings', 
      icon: <AiOutlineSetting className="w-6 h-6" />, 
      path: "/settings",
      color: 'from-gray-500 to-gray-700'
    },
  ];

  return (
    <motion.aside 
      initial={{ x: -100 }}
      animate={{ 
        x: isSidebarOpen ? 0 : -320,
        width: isSidebarOpen ? 320 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100,
        damping: 20 
      }}
      className="fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white z-50 overflow-hidden shadow-2xl"
    >
      {/* Sidebar Header */}
      <div className="p-8 border-b border-gray-700/50">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
              <span className="text-2xl font-bold">A</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Admin Pro
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-sm mt-1"
            >
              Premium Dashboard
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-2">
          <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-4 px-3">
            Main Menu
          </h3>
          
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 5 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setActiveTab(item.name.toLowerCase())}
                  className={({ isActive }) => 
                    `group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${item.color} shadow-lg` 
                        : 'hover:bg-gray-700/50 hover:shadow-md'
                    }`
                  }
                >
                  <motion.div 
                    animate={{ 
                      rotate: isActive ? [0, 10, -10, 0] : 0,
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : 'bg-gray-800/50'} group-hover:bg-white/10`}
                  >
                    {item.icon}
                  </motion.div>
                  
                  {isSidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {item.name}
                      </span>
                    </div>
                  )}
                  
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/30"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">System Status</span>
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">CPU</span>
              <span className="text-sm font-medium text-emerald-400">42%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Memory</span>
              <span className="text-sm font-medium text-amber-400">78%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-700/50">
        <motion.button 
          whileHover={{ 
            scale: 1.03, 
            backgroundColor: "#dc2626",
            boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)"
          }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-4 w-full p-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg"
          onClick={handleLogout}
        >
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 0] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="p-3 rounded-xl bg-white/20"
          >
            <AiOutlineLogout className="w-6 h-6"/>
          </motion.div>
          
          {isSidebarOpen && (
            <div className="flex-1 text-left">
              <span className="font-medium">Logout</span>
              <p className="text-xs text-white/70 mt-1">Sign out of your account</p>
            </div>
          )}
          
          <motion.div
            animate={{ 
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            →
          </motion.div>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;