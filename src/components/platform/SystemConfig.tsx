import React from 'react';
import { useApp } from '../../context';
import { Save } from 'lucide-react';

export default function SystemConfig() {
  const { systemConfig, setSystemConfig } = useApp();

  const handleChange = (key: keyof typeof systemConfig, value: number) => {
    setSystemConfig({ ...systemConfig, [key]: value });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-xl font-light text-black">System Parameters</h2>
      </div>

      <div className="space-y-8">
        {/* Security Section */}
        <section>
          <h3 className="text-sm font-medium text-black uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">
            Security Policy
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Min Password Length
              </label>
              <input
                type="number"
                value={systemConfig.passwordMinLength}
                onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Password Expiry (Days)
              </label>
              <input
                type="number"
                value={systemConfig.passwordExpiryDays}
                onChange={(e) => handleChange('passwordExpiryDays', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={systemConfig.maxLoginAttempts}
                onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-black uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">
            Session
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Timeout (Minutes)
              </label>
              <input
                type="number"
                value={systemConfig.sessionTimeoutMinutes}
                onChange={(e) => handleChange('sessionTimeoutMinutes', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
