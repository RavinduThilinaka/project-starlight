import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiOutlineSave } from 'react-icons/ai';

const UserModal = ({ 
  modalType, 
  selectedUser, 
  formData, 
  handleCloseModal, 
  handleInputChange, 
  handleSaveUser 
}) => {
  if (!modalType) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleCloseModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-6 ${modalType === 'view' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : modalType === 'edit' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {modalType === 'view' ? 'View User' : modalType === 'edit' ? 'Edit User' : 'Add New User'}
                </h2>
                <p className="text-white/80">
                  {modalType === 'view' ? 'User details' : modalType === 'edit' ? 'Update user information' : 'Create a new user account'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <AiOutlineClose className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {modalType === 'view' ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {selectedUser?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedUser?.name}</h3>
                  <p className="text-gray-500">{selectedUser?.role?.toUpperCase()}</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <label className="text-sm text-gray-500">Email Address</label>
                    <p className="font-medium">{selectedUser?.email}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50">
                      <label className="text-sm text-gray-500">Age</label>
                      <p className="font-medium">{selectedUser?.age} years</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <label className="text-sm text-gray-500">Role</label>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        selectedUser?.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800'
                          : selectedUser?.role === 'manager'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedUser?.role}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50">
                    <label className="text-sm text-gray-500">User ID</label>
                    <p className="font-medium text-sm font-mono">{selectedUser?._id}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Enter full name"
                    required
                    autoFocus
                    onFocus={(e) => e.target.select()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="Age"
                      min="1"
                      max="120"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      required
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {modalType === 'edit' ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder={modalType === 'edit' ? 'Enter new password' : 'Enter password'}
                    required={modalType !== 'edit'}
                    minLength="6"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCloseModal}
                    className="flex-1 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 shadow-md"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-lg ${
                      modalType === 'edit' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                        : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
                    }`}
                  >
                    <AiOutlineSave className="w-5 h-5 inline mr-2" />
                    {modalType === 'edit' ? 'Update User' : 'Create User'}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserModal;