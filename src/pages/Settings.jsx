import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  KeyIcon,
  UserIcon,
  ClockIcon,
  CloudIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      weeklyReport: true,
    },
    apiKeys: {
      twitter: '',
      gemini: '',
    },
    scheduling: {
      timezone: 'UTC',
      defaultInterval: '1h',
      maxTweetsPerDay: 10,
    },
    privacy: {
      shareAnalytics: false,
      allowAILearning: true,
    },
  });

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handleApiKeyChange = (key, value) => {
    setSettings({
      ...settings,
      apiKeys: {
        ...settings.apiKeys,
        [key]: value,
      },
    });
  };

  const handleSchedulingChange = (key, value) => {
    setSettings({
      ...settings,
      scheduling: {
        ...settings.scheduling,
        [key]: value,
      },
    });
  };

  const handlePrivacyChange = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
  };

  const saveSettings = () => {
    // TODO: Implement settings save logic
    console.log('Saving settings:', settings);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="mt-6 space-y-6">
        {/* Notifications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center">
            <BellIcon className="h-6 w-6 text-primary-500" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Notifications</h2>
          </div>

          <div className="mt-6 space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => handleNotificationChange(key)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.section>

        {/* API Keys Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center">
            <KeyIcon className="h-6 w-6 text-primary-500" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">API Keys</h2>
          </div>

          <div className="mt-6 space-y-4">
            {Object.entries(settings.apiKeys).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key} API Key
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={value}
                  onChange={(e) => handleApiKeyChange(key, e.target.value)}
                  placeholder={`Enter your ${key} API key`}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Scheduling Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center">
            <ClockIcon className="h-6 w-6 text-primary-500" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Scheduling</h2>
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <select
                className="input-field"
                value={settings.scheduling.timezone}
                onChange={(e) => handleSchedulingChange('timezone', e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Default Tweet Interval
              </label>
              <select
                className="input-field"
                value={settings.scheduling.defaultInterval}
                onChange={(e) => handleSchedulingChange('defaultInterval', e.target.value)}
              >
                <option value="1h">Every Hour</option>
                <option value="2h">Every 2 Hours</option>
                <option value="4h">Every 4 Hours</option>
                <option value="6h">Every 6 Hours</option>
                <option value="12h">Every 12 Hours</option>
                <option value="24h">Once a Day</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Tweets per Day
              </label>
              <input
                type="number"
                className="input-field"
                value={settings.scheduling.maxTweetsPerDay}
                onChange={(e) =>
                  handleSchedulingChange('maxTweetsPerDay', parseInt(e.target.value))
                }
                min="1"
                max="48"
              />
            </div>
          </div>
        </motion.section>

        {/* Privacy Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-primary-500" />
            <h2 className="ml-3 text-lg font-medium text-gray-900">Privacy & Data</h2>
          </div>

          <div className="mt-6 space-y-4">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => handlePrivacyChange(key)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Save Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveSettings}
            className="btn-primary"
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Settings;