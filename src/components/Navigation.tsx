import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Map,
  BookOpen, 
  User, 
  Upload,
  X,
  TrendingUp,
  GraduationCap,
  Wrench,
  Users,
  DollarSign,
  Video,
  ShoppingBag,
  MessageCircle,
  AppWindow
} from 'lucide-react';

interface NavigationProps {
  onClose?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onClose }) => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/dashboard/learning', icon: GraduationCap, label: 'Learning' },
    { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { path: '/dashboard/mentorship', icon: MessageCircle, label: 'Mentorship' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/toolkit', icon: Wrench, label: 'Toolkit' },
    { path: '/dashboard/community', icon: Users, label: 'Community' },
    { path: '/dashboard/roadmap', icon: Map, label: 'Roadmap' },
    { path: '/dashboard/resources', icon: BookOpen, label: 'Resources' },
    { path: '/dashboard/funding', icon: DollarSign, label: 'Funding' },
    { path: '/dashboard/experts', icon: Video, label: 'Expert Q&A' },
    { path: '/dashboard/applications', icon: AppWindow, label: 'Applications' },
    { path: '/dashboard/data-input', icon: Upload, label: 'Data Input' },
    { path: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-surface-light h-full w-56 shadow-lg border-r border-primary-300 fixed left-0 top-0 z-50 md:z-auto flex flex-col">
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary-500" />
            <span className="text-lg font-bold text-text-dark">SeventyTwo X</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-lg hover:bg-background-secondary"
            >
              <X className="w-4 h-4 text-text-dark" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={`nav-${item.path}-${index}`}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-text-light border-r-2 border-background-dark'
                      : 'text-text-dark hover:bg-background-secondary hover:text-primary-500'
                  }`
                }
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;