import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  User, Tenant, Menu, Department, Role, SystemConfig,
  MOCK_USERS, MOCK_TENANTS, MOCK_MENUS, MOCK_DEPARTMENTS, MOCK_ROLES, DEFAULT_CONFIG, RoleType 
} from './types';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  tenants: Tenant[];
  setTenants: (tenants: Tenant[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  departments: Department[];
  setDepartments: (depts: Department[]) => void;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  menus: Menu[];
  setMenus: (menus: Menu[]) => void;
  systemConfig: SystemConfig;
  setSystemConfig: (config: SystemConfig) => void;
  switchRole: (role: RoleType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [menus, setMenus] = useState<Menu[]>(MOCK_MENUS);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(DEFAULT_CONFIG);

  const switchRole = (role: RoleType) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      tenants, setTenants,
      users, setUsers,
      departments, setDepartments,
      roles, setRoles,
      menus, setMenus,
      systemConfig, setSystemConfig,
      switchRole
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
