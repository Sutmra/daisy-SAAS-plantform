import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Multilingual() {
  const languages = [
    { code: 'en-US', name: 'English (US)', status: 'Active', completion: '100%' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', status: 'Active', completion: '98%' },
    { code: 'es-ES', name: 'Spanish', status: 'Draft', completion: '45%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light text-black">Languages</h2>
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {languages.map((lang) => (
          <div key={lang.code} className="bg-white p-6 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="text-lg font-medium text-black">{lang.name}</div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-black rounded-md">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-md">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 font-mono mb-6">{lang.code}</p>
            
            <div className="flex items-center justify-between text-sm mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                lang.status === 'Active' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-yellow-50 text-yellow-700'
              }`}>
                {lang.status}
              </span>
              <span className="text-gray-500">{lang.completion}</span>
            </div>
            
            <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black rounded-full" 
                style={{ width: lang.completion }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
