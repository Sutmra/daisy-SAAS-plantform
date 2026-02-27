import React, { useState } from 'react';
import { AppProvider } from './context';
import Layout from './components/Layout';
import TenantManagement from './components/platform/TenantManagement';
import SystemConfig from './components/platform/SystemConfig';
import MenuManagement from './components/platform/MenuManagement';
import Multilingual from './components/platform/Multilingual';
import OrgStructure from './components/tenant/OrgStructure';
import RoleManagement from './components/tenant/RoleManagement';
import UserManagement from './components/tenant/UserManagement';
import PersonalCenter from './components/PersonalCenter';

function AppContent() {
  const [activePage, setActivePage] = useState('user-profile');

  const renderContent = () => {
    switch (activePage) {
      case 'platform-tenants': return <TenantManagement />;
      case 'platform-config': return <SystemConfig />;
      case 'platform-menus': return <MenuManagement />;
      case 'platform-lang': return <Multilingual />;
      case 'tenant-org': return <OrgStructure />;
      case 'tenant-roles': return <RoleManagement />;
      case 'tenant-users': return <UserManagement />;
      case 'user-profile': return <PersonalCenter />;
      default: return <PersonalCenter />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderContent()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
