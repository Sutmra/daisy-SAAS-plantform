import React from 'react';
import { useApp } from '../../context';
import { Network, Plus, MoreHorizontal, Users } from 'lucide-react';

export default function OrgStructure() {
  const { departments, currentUser } = useApp();

  const tenantDepts = currentUser.tenantId 
    ? departments.filter(d => d.tenantId === currentUser.tenantId)
    : departments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-black">Organization</h2>
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 p-6 min-h-[400px]">
        <div className="space-y-1">
          {tenantDepts.map((dept) => (
            <div 
              key={dept.id} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all group"
              style={{ marginLeft: dept.parentId ? '2rem' : '0' }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-md ${dept.parentId ? 'text-gray-400' : 'text-black'}`}>
                  <Network className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-black text-sm">{dept.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" /> 12 Members
                  </p>
                </div>
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <button className="text-xs font-medium text-black hover:underline">Add Sub-dept</button>
                <div className="h-3 w-px bg-gray-200"></div>
                <button className="p-1.5 text-gray-400 hover:text-black rounded-md">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
