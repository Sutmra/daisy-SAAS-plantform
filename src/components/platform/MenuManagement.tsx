import React, { useState } from 'react';
import { useApp } from '../../context';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

export default function MenuManagement() {
  const { menus, setMenus } = useApp();
  const [activeSystem, setActiveSystem] = useState<string>('ALL');

  const systems = ['ALL', 'PLATFORM', 'AMI', 'CIS', 'VENDING'];

  const filteredMenus = activeSystem === 'ALL' 
    ? menus 
    : menus.filter(m => m.system === activeSystem);

  const toggleVisibility = (id: string) => {
    setMenus(menus.map(m => m.id === id ? { ...m, visibleToTenants: !m.visibleToTenants } : m));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-black">Menus</h2>
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="flex gap-6 border-b border-gray-100">
        {systems.map(sys => (
          <button
            key={sys}
            onClick={() => setActiveSystem(sys)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeSystem === sys 
                ? 'text-black' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {sys}
            {activeSystem === sys && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 font-medium text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">System</th>
              <th className="px-6 py-4 font-medium">Path</th>
              <th className="px-6 py-4 font-medium">Visibility</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredMenus.map((menu) => (
              <tr key={menu.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-black">
                  {menu.title}
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500 text-xs">
                    {menu.system}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                  {menu.path}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleVisibility(menu.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                      menu.visibleToTenants 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {menu.visibleToTenants ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {menu.visibleToTenants ? 'Visible' : 'Hidden'}
                  </button>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
