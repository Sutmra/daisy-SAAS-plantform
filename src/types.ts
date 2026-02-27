import { LucideIcon } from 'lucide-react';

// Types
export type RoleType = 'L1_PLATFORM_ADMIN' | 'L2_TENANT_ADMIN' | 'L3_BUSINESS_ADMIN' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  tenantId?: string; // Null for platform admins
  departmentId?: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  expireDate: string;
  contactPerson: string;
  contactEmail: string;
}

export interface Menu {
  id: string;
  title: string;
  path: string;
  icon?: string;
  system: 'AMI' | 'CIS' | 'VENDING' | 'PLATFORM';
  visibleToTenants: boolean;
}

export interface Department {
  id: string;
  name: string;
  parentId: string | null;
  tenantId: string;
}

export interface Role {
  id: string;
  name: string;
  type: 'GLOBAL' | 'CUSTOM';
  tenantId?: string; // Null for global roles
  permissions: string[];
}

export interface SystemConfig {
  passwordMinLength: number;
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  sessionTimeoutMinutes: number;
}

// Mock Data
export const MOCK_TENANTS: Tenant[] = [
  { id: 't1', name: 'Acme Corp', status: 'active', expireDate: '2025-12-31', contactPerson: 'John Doe', contactEmail: 'john@acme.com' },
  { id: 't2', name: 'Global Tech', status: 'active', expireDate: '2024-06-30', contactPerson: 'Jane Smith', contactEmail: 'jane@global.com' },
  { id: 't3', name: 'Local Services', status: 'inactive', expireDate: '2023-12-31', contactPerson: 'Bob Brown', contactEmail: 'bob@local.com' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Platform Admin', email: 'admin@platform.com', role: 'L1_PLATFORM_ADMIN', avatar: 'https://picsum.photos/seed/u1/200' },
  { id: 'u2', name: 'Tenant Admin (Acme)', email: 'admin@acme.com', role: 'L2_TENANT_ADMIN', tenantId: 't1', avatar: 'https://picsum.photos/seed/u2/200' },
  { id: 'u3', name: 'Business User (Acme)', email: 'user@acme.com', role: 'L3_BUSINESS_ADMIN', tenantId: 't1', departmentId: 'd1', avatar: 'https://picsum.photos/seed/u3/200' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Headquarters', parentId: null, tenantId: 't1' },
  { id: 'd2', name: 'IT Department', parentId: 'd1', tenantId: 't1' },
  { id: 'd3', name: 'Sales', parentId: 'd1', tenantId: 't1' },
];

export const MOCK_ROLES: Role[] = [
  { id: 'r1', name: 'System Administrator', type: 'GLOBAL', permissions: ['all'] },
  { id: 'r2', name: 'Viewer', type: 'GLOBAL', permissions: ['read'] },
  { id: 'r3', name: 'IT Manager', type: 'CUSTOM', tenantId: 't1', permissions: ['user_manage', 'dept_manage'] },
];

export const MOCK_MENUS: Menu[] = [
  { id: 'm1', title: 'Dashboard', path: '/dashboard', system: 'PLATFORM', visibleToTenants: true },
  { id: 'm2', title: 'Meter Reading', path: '/ami/reading', system: 'AMI', visibleToTenants: true },
  { id: 'm3', title: 'Customer Info', path: '/cis/customers', system: 'CIS', visibleToTenants: true },
  { id: 'm4', title: 'Vending Machines', path: '/vending/list', system: 'VENDING', visibleToTenants: true },
];

export const DEFAULT_CONFIG: SystemConfig = {
  passwordMinLength: 8,
  passwordExpiryDays: 90,
  maxLoginAttempts: 5,
  sessionTimeoutMinutes: 30,
};
