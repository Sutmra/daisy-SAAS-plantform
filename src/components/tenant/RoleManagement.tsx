import React from 'react';
import { useApp } from '../../context';
import { Shield, Lock, Plus, Edit2, Trash2, Info, Globe, Users } from 'lucide-react';

export default function RoleManagement() {
  const { roles, currentUser } = useApp();

  const globalRoles = roles.filter(r => r.type === 'GLOBAL');
  const customRoles = roles.filter(r => r.type === 'CUSTOM' && (!currentUser.tenantId || r.tenantId === currentUser.tenantId));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-black">Roles</h2>
      </div>

      {/* Global Roles Section */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          System Roles
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {globalRoles.map((role) => (
            <div key={role.id} className="bg-gray-50 rounded-lg border border-gray-100 p-5 relative">
              <div className="absolute top-4 right-4">
                <Lock className="w-3 h-3 text-gray-400" />
              </div>
              <div className="mb-3">
                <Shield className="w-5 h-5 text-gray-400 mb-2" />
                <h4 className="font-medium text-black">{role.name}</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Standard system role. Read-only.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Roles Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Custom Roles
          </div>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-black px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors">
            <Plus className="w-3 h-3" />
            Create Role
          </button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-400 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Role Name</th>
                <th className="px-6 py-4 font-medium">Permissions</th>
                <th className="px-6 py-4 font-medium">Users</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-black">{role.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map(p => (
                        <span key={p} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs border border-gray-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500">+3</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-black rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customRoles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400 flex flex-col items-center gap-2">
                    <Info className="w-6 h-6 text-gray-300" />
                    No custom roles defined.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
