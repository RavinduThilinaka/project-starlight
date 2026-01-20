import { FaEye, FaEdit, FaTrash, FaSearch, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserTable({ rows = [], viewUser, editUser, deleteUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const filteredRows = rows.filter(row =>
    Object.values(row).some(
      field => field != null && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortConfig.direction === 'asc' 
      ? (aValue < bValue ? -1 : 1)
      : (bValue < aValue ? -1 : 1);
  });

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="inline ml-1" />
      : <FaSortDown className="inline ml-1" />;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                User Management
              </h2>
              <p className="text-indigo-100">Manage your organization's user accounts</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-purple-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by name, email, role..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-100 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email Address' },
                  { key: 'age', label: 'Age' },
                  { key: 'role', label: 'Role' }
                ].map(({ key, label }) => (
                  <th 
                    key={key}
                    onClick={() => requestSort(key)}
                    className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        {label}
                      </span>
                      <span className="ml-2 text-indigo-500">
                        {getSortIcon(key)}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {sortedRows.length > 0 ? (
                  sortedRows.map((row, index) => (
                    <tr
                      key={row.id || row.email}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                            {row.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{row.name}</div>
                            <div className="text-xs text-gray-500">ID: {row._id?.substring(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm text-gray-900 font-medium">{row.email}</div>
                        <div className="text-xs text-gray-500">Active</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                          {row.age} years
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-2 rounded-lg text-xs font-bold ${
                          row.role === 'admin' 
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' 
                            : row.role === 'manager'
                            ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                            : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800'
                        }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => viewUser(row)}
                            className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 shadow-md hover:shadow-lg transition-all duration-200"
                            title="View User"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => editUser(row)}
                            className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 hover:from-amber-100 hover:to-amber-200 shadow-md hover:shadow-lg transition-all duration-200"
                            title="Edit User"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteUser(row._id)}
                            className="p-3 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 hover:from-rose-100 hover:to-rose-200 shadow-md hover:shadow-lg transition-all duration-200"
                            title="Delete User"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-20">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
                          <FaSearch className="text-gray-400 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No users found</h3>
                        <p className="text-gray-500 max-w-md">
                          {searchQuery 
                            ? `No results found for "${searchQuery}". Try a different search term.`
                            : 'No users in the database. Add your first user to get started!'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {sortedRows.length > 0 && (
          <div className="px-8 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-bold text-gray-800">{sortedRows.length}</span> of{' '}
                <span className="font-bold text-gray-800">{rows.length}</span> users
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 shadow-sm transition-all">
                  ← Previous
                </button>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        num === 1 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
                    10
                  </button>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 shadow-sm transition-all">
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}