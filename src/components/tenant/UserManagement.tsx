import React from 'react';
import { useApp } from '../../context';
import { UserPlus, Search, MoreVertical, Mail, Building } from 'lucide-react';

export default function UserManagement() {
  const { users, currentUser } = useApp();

  const tenantUsers = users.filter(u => u.tenantId === currentUser.tenantId || !u.tenantId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-black">Users</h2>
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-50">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-black placeholder-gray-400"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 font-medium text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tenantUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt="" 
                      className="w-8 h-8 rounded-full object-cover bg-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-medium text-black">{user.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-0.5 rounded text-gray-600 text-xs font-medium bg-gray-100">
                    {user.role.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {user.departmentId ? (
                    <span className="flex items-center gap-1">
                      Dept {user.departmentId}
                    </span>
                  ) : (
                    <span className="text-gray-300 italic">No Dept</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {user.tenantId ? (
                    <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs font-medium">Tenant</span>
                  ) : (
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs font-medium">Global</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-black rounded-md">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
