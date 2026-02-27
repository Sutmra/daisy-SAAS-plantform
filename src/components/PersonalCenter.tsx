import React from 'react';
import { useApp } from '../context';
import { Mail, Shield, Building, Calendar } from 'lucide-react';

export default function PersonalCenter() {
  const { currentUser } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-12 pt-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <img 
          src={currentUser.avatar} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover bg-gray-100"
          referrerPolicy="no-referrer"
        />
        <div>
          <h1 className="text-3xl font-light text-black mb-2">{currentUser.name}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
              {currentUser.role.replace(/_/g, ' ')}
            </span>
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Info */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">Details</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <div className="text-xs text-gray-400 mb-1">Department</div>
                <div className="text-sm text-black flex items-center gap-2">
                  <Building className="w-3 h-3 text-gray-400" />
                  {currentUser.departmentId || 'Not Assigned'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Joined</div>
                <div className="text-sm text-black flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  Jan 12, 2024
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Email</div>
                <div className="text-sm text-black flex items-center gap-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {currentUser.email}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Role Type</div>
                <div className="text-sm text-black flex items-center gap-2">
                  <Shield className="w-3 h-3 text-gray-400" />
                  {currentUser.role}
                </div>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">Activity Log</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm text-gray-900">Updated system configuration parameters.</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Actions */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-6">Settings</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 hover:border-gray-200">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 hover:border-gray-200">
              Notifications
            </button>
            <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 hover:border-gray-200">
              Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
