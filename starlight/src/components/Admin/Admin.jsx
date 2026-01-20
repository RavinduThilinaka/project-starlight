import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  AiOutlineMenu, 
  AiOutlineBell,
  AiOutlineDollar,
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlinePlus
} from 'react-icons/ai';
import { 
  FiTrendingUp,
  FiSettings,
  FiFilter,
} from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import axios from 'axios';
import UserTable from './UserTable';
import { useNavigate } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import UserModal from './UserModal';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('week');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    role: 'user'
  });

  const [analyticsData, setAnalyticsData] = useState({
    userRoles: {
      labels: ['Admin', 'User'],
      datasets: [{
        data: [1, 1],
        backgroundColor: ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
        borderColor: '#fff',
        hoverOffset: 20
      }]
    },
    ageDistribution: {
      labels: ['<18', '18-24', '25-34', '35-44', '45-54', '55+'],
      datasets: [{
        label: 'Users by Age',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: '#8B5CF6',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    userGrowth: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'New Users',
        data: [12, 19, 8, 15, 22, 18, 25],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    }
  });

  const userName = localStorage.getItem('userName');
  const userFirstLetter = localStorage.getItem('userFirstLetter');

  useEffect(() => {
    getUsers();
    const interval = setInterval(() => {
      getUsers();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    const token = localStorage.getItem('authToken');
    axios.get("http://localhost:3001/api/getUsers", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const usersData = response.data?.response || [];
      setUsers(usersData);
      prepareAnalyticsData(usersData);
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    });
  };

  const prepareAnalyticsData = (users) => {
    const rolesCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, { admin: 0, user: 0, manager: 0 });

    const ageGroups = users.reduce((acc, user) => {
      const age = user.age || 0;
      if (age < 18) acc['<18']++;
      else if (age < 25) acc['18-24']++;
      else if (age < 35) acc['25-34']++;
      else if (age < 45) acc['35-44']++;
      else if (age < 55) acc['45-54']++;
      else acc['55+']++;
      return acc;
    }, { '<18': 0, '18-24': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55+': 0 });

    const growthData = Array.from({ length: 7 }, () => 
      Math.floor(Math.random() * 10) + 5
    );

    setAnalyticsData(prev => ({
      ...prev,
      userRoles: {
        ...prev.userRoles,
        labels: Object.keys(rolesCount).map(r => r.charAt(0).toUpperCase() + r.slice(1)),
        datasets: [{
          ...prev.userRoles.datasets[0],
          data: Object.values(rolesCount)
        }]
      },
      ageDistribution: {
        ...prev.ageDistribution,
        datasets: [{
          ...prev.ageDistribution.datasets[0],
          data: Object.values(ageGroups)
        }]
      },
      userGrowth: {
        ...prev.userGrowth,
        datasets: [{
          ...prev.userGrowth.datasets[0],
          data: growthData
        }]
      }
    }));
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalType('view');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      age: user.age || '',
      password: '',
      role: user.role || 'user'
    });
    setModalType('edit');
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      age: '',
      password: '',
      role: 'user'
    });
    setModalType('add');
  };

  const handleCloseModal = useCallback(() => {
    setModalType(null);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      age: '',
      password: '',
      role: 'user'
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      axios.post("http://localhost:3001/api/signupUser", formData)
        .then(response => {
          alert('User added successfully!');
          getUsers();
          handleCloseModal();
        })
        .catch(error => {
          console.error("Error adding user:", error);
          alert('Error adding user');
        });
    } else if (modalType === 'edit' && selectedUser) {
      const updateData = { ...formData };
      if (!updateData.password.trim()) {
        delete updateData.password;
      }
      
      axios.post(`http://localhost:3001/api/updateUser/${selectedUser._id}`, updateData)
        .then(response => {
          alert('User updated successfully!');
          getUsers();
          handleCloseModal();
        })
        .catch(error => {
          console.error("Error updating user:", error);
          alert('Error updating user');
        });
    }
  };

  const deleteUser = (_id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:3001/api/deleteUser/${_id}`)
      .then(() => {
        alert('User deleted successfully!');
        getUsers();
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        alert('Error deleting user');
      });
    }
  };

  const handleLogout = () => {
    document.body.classList.add('animate-fadeOut');
    setTimeout(() => {
      localStorage.clear();
      navigate('/login');
    }, 500);
  };

  const statsCards = [
    {
      title: "Total Users",
      value: users.length,
      change: "+12.5%",
      trend: "up",
      icon: <HiOutlineUserGroup className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      title: "Active Sessions",
      value: "142",
      change: "+8.2%",
      trend: "up",
      icon: <AiOutlineUser className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500",
      bg: "bg-gradient-to-br from-emerald-50 to-green-50"
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "+23.1%",
      trend: "up",
      icon: <AiOutlineDollar className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      bg: "bg-gradient-to-br from-purple-50 to-pink-50"
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      change: "-1.2%",
      trend: "down",
      icon: <FiTrendingUp className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        handleLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className={`flex-1 transition-all duration-500 ease-out ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-8 py-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-md transition-all"
              >
                <AiOutlineMenu className="w-6 h-6 text-gray-700" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{userFirstLetter}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{userName}</span>
                  </h2>
                  <p className="text-gray-500 text-sm">Admin Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-md">
                  <AiOutlineBell className="w-6 h-6 text-gray-700" />
                </button>
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  3
                </span>
              </div>
              
              <button className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-xl transition-all">
                <FiSettings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((stat, index) => (
                  <div
                    key={stat.title}
                    className={`${stat.bg} p-6 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {stat.trend === 'up' ? (
                        <AiOutlineArrowUp className="text-emerald-500 mr-1" />
                      ) : (
                        <AiOutlineArrowDown className="text-rose-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {stat.change} from last month
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">User Growth</h3>
                      <p className="text-gray-500 text-sm">Last 7 days performance</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${timeRange === 'week' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setTimeRange('week')}
                      >
                        Week
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${timeRange === 'month' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setTimeRange('month')}
                      >
                        Month
                      </button>
                    </div>
                  </div>
                  <div className="h-64">
                    <Line 
                      data={analyticsData.userGrowth}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Role Distribution</h3>
                      <p className="text-gray-500 text-sm">User roles overview</p>
                    </div>
                    <BsThreeDotsVertical className="text-gray-400" />
                  </div>
                  <div className="h-64">
                    <Doughnut 
                      data={analyticsData.userRoles}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/50 shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Age Distribution</h3>
                    <p className="text-gray-500 text-sm">Users by age groups</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium">
                    <FiFilter />
                    Filter
                  </button>
                </div>
                <div className="h-64">
                  <Bar 
                    data={analyticsData.ageDistribution}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-200/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">User Management</h3>
                      <p className="text-gray-500">Manage all user accounts and permissions</p>
                    </div>
                    <button
                      onClick={handleAddUser}
                      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl"
                    >
                      <AiOutlinePlus className="w-5 h-5" />
                      <span>Add New User</span>
                    </button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="py-20 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <UserTable
                    rows={users}
                    viewUser={handleViewUser}
                    editUser={handleEditUser}
                    deleteUser={deleteUser}
                  />
                )}
              </div>
            </>
          )}
        </main>

        <footer className="px-8 py-6 text-center text-gray-500 text-sm border-t border-gray-200/50">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Admin Panel v2.0. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <span className="text-indigo-600 font-medium">Premium Support</span>
              <span className="text-gray-400">•</span>
              <span>Last updated: Just now</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Import and use the separate UserModal component */}
      <UserModal
        modalType={modalType}
        selectedUser={selectedUser}
        formData={formData}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSaveUser={handleSaveUser}
      />
    </div>
  );
};

export default Admin;