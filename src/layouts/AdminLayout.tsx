import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Settings,
  Users,
  FileText,
  BarChart3,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserCog } from 'lucide-react';
import AdminMobileNav from '../components/admin/AdminMobileNav';
import logo from "../assets/SBSA Pic.png";

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [notificationCount] = React.useState(5); // Mock notification count

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/login');
    }
  };

  const adminNavItems = [
    { id: 'overview', path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', path: '/admin/dashboard/users', icon: Users, label: 'Users' },
    { id: 'admin-users', path: '/admin/dashboard/admin-users', icon: UserCog, label: 'Admin Users' },
    { id: 'programs', path: '/admin/programs', icon: FileText, label: 'Programs' },
    { id: 'registrations', path: '/admin/dashboard/registrations', icon: Shield, label: 'Registrations' },
    { id: 'analytics', path: '/admin/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', path: '/admin/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const handleNavigation = (item: any) => {
    if (item.path === '/admin/programs') {
      navigate('/admin/programs');
      setActiveTab('programs');
    } else {
      // Always navigate to dashboard first, then set the tab
      navigate('/admin/dashboard');
      setActiveTab(item.id);
      
      // Immediately set the tab without delay for smooth navigation
      if ((window as any).setAdminTab) {
        (window as any).setAdminTab(item.id);
      }
      // Dispatch a custom event to ensure tab change is handled
      window.dispatchEvent(new CustomEvent('adminTabChange', { 
        detail: { tab: item.id } 
      }));
    }
  };

  // Update active tab based on current location
  React.useEffect(() => {
    if (location.pathname === '/admin/programs') {
      setActiveTab('programs');
    } else if (location.pathname === '/admin/dashboard') {
      // Keep current tab or default to overview
      if (!activeTab || activeTab === 'programs') {
        setActiveTab('overview');
      }
    }
  }, [location.pathname]);

  return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        {/* Admin Header */}
        <header className="bg-gray-100 shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4"> {/* Changed from space-x-2 to space-x-4 */}
                  <img
                  src={logo}
                  alt="Standard Bank Logo"
                  className="h-10 w-auto"
                  />
                  <span className="text-xl font-bold text-gray-900">Standard Bank Program Admin</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          Welcome, {user?.email?.split('@')[0] || 'Admin'}
        </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>


        <div className="flex">
          {/* Admin Sidebar */}
          <nav className="hidden md:block w-64 bg-surface-light shadow-sm h-screen sticky top-16 border-r border-primary-300">
            <div className="p-6">
              <ul className="space-y-2">
                {adminNavItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = (location.pathname === '/admin/programs' && item.id === 'programs') ||
                      (location.pathname === '/admin/dashboard' && activeTab === item.id);
                  return (
                      <li key={`admin-nav-${item.id}-${index}`}>
                        <button
                            onClick={() => handleNavigation(item)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                                isActive
                                    ? 'bg-primary-500 text-text-light border-r-2 border-background-dark'
                                    : 'text-text-dark hover:bg-background-secondary hover:text-primary-500'
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-semibold text-sm">{item.label}</span>
                        </button>
                      </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            {children ? children : <Outlet />}
          </main>
        </div>

        {/* Mobile Navigation */}
        <AdminMobileNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            notificationCount={notificationCount}
        />
      </div>
  );
};

export default AdminLayout;