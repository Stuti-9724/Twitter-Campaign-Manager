import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  ChartBarIcon,
  HashtagIcon,
  CogIcon,
  RocketLaunchIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartPieIcon },
    { name: 'Campaigns', href: '/campaigns', icon: RocketLaunchIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'AI Generator', href: '/ai-generator', icon: RocketLaunchIcon },
    { name: 'Hashtags', href: '/hashtags', icon: HashtagIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-16 border-r border-gray-200 bg-white">
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${isActive
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex items-center"
                initial={false}
                animate={{
                  color: isActive ? '#0284c7' : '#4b5563',
                }}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive
                    ? 'text-primary-600'
                    : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Tweepify</p>
            <p className="text-xs font-medium text-gray-500">v0.0.1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;