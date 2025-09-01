// Admin utility functions and helpers
// src/utils/adminHelpers.ts

// --- ADMIN-SPECIFIC FORMATTING ---
export const formatUserRole = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    'participant': 'Participant',
    'admin': 'Admin',
    'super_admin': 'Super Admin',
    'program_manager': 'Program Manager',
    'client_admin': 'Client Admin'
  };
  
  return roleMap[role] || role;
};

export const formatBusinessType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    'formal': 'Formal Business',
    'informal': 'Informal Business',
    'startup': 'Startup',
    'cooperative': 'Cooperative',
    'franchise': 'Franchise'
  };
  
  return typeMap[type] || type;
};

export const formatApplicationStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'draft': 'Draft',
    'submitted': 'Submitted',
    'under_review': 'Under Review',
    'approved': 'Approved',
    'rejected': 'Rejected'
  };
  
  return statusMap[status] || status;
};

export const formatRegistrationStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'pending': 'Pending Review',
    'under_review': 'Under Review',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'requires_documents': 'Requires Documents'
  };
  
  return statusMap[status] || status;
};

export const getStatusColor = (status: string, type: 'user' | 'program' | 'application' | 'registration'): string => {
  const colorMaps = {
    user: {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    },
    program: {
      draft: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    },
    application: {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    },
    registration: {
      pending: 'bg-gray-100 text-gray-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      requires_documents: 'bg-yellow-100 text-yellow-800'
    }
  } as const;

  const map = colorMaps[type] as Record<string, string>;
  return map[status] || 'bg-gray-100 text-gray-800';
};

// --- ADMIN-SPECIFIC CALCULATIONS ---
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous * 100) * 10) / 10;
};

// --- ADMIN-SPECIFIC PERMISSION CHECKS ---
export const hasAdminPermission = (userRoles: string[], requiredRoles: string[]): boolean => {
  return requiredRoles.some(role => userRoles.includes(role));
};

export const canManageUsers = (userRoles: string[]): boolean => {
  return hasAdminPermission(userRoles, ['admin', 'super_admin']);
};

export const canManagePrograms = (userRoles: string[]): boolean => {
  return hasAdminPermission(userRoles, ['admin', 'super_admin', 'program_manager']);
};

export const canReviewRegistrations = (userRoles: string[]): boolean => {
  return hasAdminPermission(userRoles, ['admin', 'super_admin', 'client_admin']);
};

export const canAccessAnalytics = (userRoles: string[]): boolean => {
  return hasAdminPermission(userRoles, ['admin', 'super_admin', 'program_manager']);
};

export const canModifySettings = (userRoles: string[]): boolean => {
  return hasAdminPermission(userRoles, ['admin', 'super_admin']);
};