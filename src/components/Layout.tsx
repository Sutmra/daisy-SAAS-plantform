import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Building2, 
  Globe, 
  Menu as MenuIcon, 
  Shield, 
  UserCircle,
  Network
} from 'lucide-react';
import { useApp } from '../context';
import { RoleType } from '../types';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
        active 
          ? 'text-black font-semibold bg-gray-100 rounded-lg' 
          : 'text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg'
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-gray-400'}`} />
      {label}
    </button>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, activePage, onNavigate }: LayoutProps) {
  const { currentUser, switchRole } = useApp();

  const getNavItems = () => {
    if (currentUser.role === 'L1_PLATFORM_ADMIN') {
      return [
        { id: 'platform-tenants', label: 'Tenants', icon: Building2 },
        { id: 'platform-config', label: 'Settings', icon: Settings },
        { id: 'platform-menus', label: 'Menus', icon: MenuIcon },
        { id: 'platform-lang', label: 'Languages', icon: Globe },
      ];
    } else if (currentUser.role === 'L2_TENANT_ADMIN') {
      return [
        { id: 'tenant-org', label: 'Organization', icon: Network },
        { id: 'tenant-roles', label: 'Roles', icon: Shield },
        { id: 'tenant-users', label: 'Users', icon: Users },
      ];
    } else {
      return [
        { id: 'user-profile', label: 'Profile', icon: UserCircle },
      ];
    }
  };

  const commonItems = [
    { id: 'user-profile', label: 'Profile', icon: UserCircle },
  ];

  const navItems = getNavItems();
  const finalNavItems = currentUser.role === 'L3_BUSINESS_ADMIN' || currentUser.role === 'USER' 
    ? navItems 
    : [...navItems, ...commonItems.filter(i => !navItems.find(n => n.id === i.id))];

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight text-black">SaaS Demo</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4 px-2 mt-2">
            {currentUser.role === 'L1_PLATFORM_ADMIN' ? 'Platform' : 'Tenant Workspace'}
          </div>
          {finalNavItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className="flex items-center gap-3 p-2">
            <img 
              src={currentUser.avatar} 
              alt="User" 
              className="w-8 h-8 rounded-full object-cover bg-gray-100"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          <h1 className="text-xl font-medium text-black">
            {finalNavItems.find(i => i.id === activePage)?.label}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">View As</span>
            <select 
              className="text-sm border-gray-200 rounded-md bg-transparent py-1.5 pl-2 pr-8 focus:ring-0 focus:border-black transition-colors cursor-pointer hover:bg-gray-50"
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as RoleType)}
            >
              <option value="L1_PLATFORM_ADMIN">Platform Admin</option>
              <option value="L2_TENANT_ADMIN">Tenant Admin</option>
              <option value="L3_BUSINESS_ADMIN">Business User</option>
            </select>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
