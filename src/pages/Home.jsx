import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Tweets',
    description: 'Generate engaging tweets using advanced AI technology',
    icon: SparklesIcon,
  },
  {
    name: 'Smart Analytics',
    description: 'Track and analyze your campaign performance in real-time',
    icon: ChartBarIcon,
  },
  {
    name: 'Automated Scheduling',
    description: 'Schedule tweets at optimal times for maximum engagement',
    icon: ClockIcon,
  },
  {
    name: 'Hashtag Insights',
    description: 'Discover trending hashtags and optimize your reach',
    icon: HashtagIcon,
  },
];

const Home = () => {
  const { login, isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span className="block">Supercharge Your</span>
              <span className="block text-primary-600">Twitter Campaigns</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Create, manage, and analyze Twitter hashtag campaigns with AI-powered insights.
              Schedule tweets, track performance, and grow your social media presence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            >
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-primary w-full sm:w-auto flex items-center justify-center"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => login('twitter')}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Get Started with Twitter
                  </button>
                  <button
                    onClick={() => login('google')}
                    className="btn-secondary w-full sm:w-auto"
                  >
                    Sign in with Google
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Features Section */}
      <div className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold uppercase tracking-wider text-primary-600"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl"
          >
            Powerful Features for Your Twitter Success
          </motion.p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="pt-6"
                >
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;