import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  HashtagIcon,
  UserGroupIcon,
  ChartBarIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  // Sample data - replace with actual API data
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      name: 'Active Campaigns',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: HashtagIcon,
    },
    {
      name: 'Total Reach',
      value: '24.5K',
      change: '+12.5%',
      changeType: 'increase',
      icon: UserGroupIcon,
    },
    {
      name: 'Engagement Rate',
      value: '4.3%',
      change: '-0.5%',
      changeType: 'decrease',
      icon: ChartBarIcon,
    },
    {
      name: 'Total Likes',
      value: '8.2K',
      change: '+23%',
      changeType: 'increase',
      icon: HeartIcon,
    },
  ];

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Engagement',
        data: [65, 59, 80, 81, 56, 55, 70],
        fill: true,
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderColor: 'rgb(14, 165, 233)',
        tension: 0.4,
      },
    ],
  };

  const campaignPerformance = {
    labels: ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D', 'Campaign E'],
    datasets: [
      {
        label: 'Performance',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <item.icon className="h-6 w-6 text-gray-400" />
              </div>
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.value}</dd>
              <dd
                className={`mt-2 flex items-center text-sm ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="ml-1">{item.change}</span>
              </dd>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="card"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Engagement Over Time</h2>
            <div className="h-64">
              <Line data={engagementData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="card"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h2>
            <div className="h-64">
              <Bar data={campaignPerformance} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Time Range Selector */}
        <div className="mt-8 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium ${timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  } ${range === '24h' ? 'rounded-l-md' : ''} ${range === '90d' ? 'rounded-r-md' : ''}
                  border border-gray-300`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;