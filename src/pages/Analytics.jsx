import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import TwitterDataService from '../services/TwitterDataService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  HashtagIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('my-campaigns');
  const [searchQuery, setSearchQuery] = useState('');
  const [hashtagData, setHashtagData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    setError(null);
    try {
      const analytics = await TwitterDataService.getHashtagAnalytics(searchQuery);
      if (!analytics) {
        throw new Error('No data found for this hashtag');
      }
      setHashtagData(analytics);
    } catch (err) {
      setError(err.message || 'Failed to fetch hashtag analytics');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sample data - replace with actual API data
  const hashtagPerformance = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Impressions',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const engagementDistribution = {
    labels: ['Likes', 'Retweets', 'Replies', 'Quotes'],
    datasets: [
      {
        data: [300, 150, 100, 50],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(56, 189, 248, 0.8)',
          'rgba(186, 230, 253, 0.8)',
          'rgba(224, 242, 254, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const trendingHashtags = [
    { tag: '#TechTrends', volume: '125K', growth: '+15%' },
    { tag: '#DigitalMarketing', volume: '98K', growth: '+8%' },
    { tag: '#SocialMedia', volume: '87K', growth: '+12%' },
    { tag: '#Innovation', volume: '76K', growth: '+5%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        
        {/* Search Bar */}
        <div className="mt-4 md:mt-0 relative">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                className="input-field pl-10 pr-12"
                placeholder="Search hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-sky-500 text-white rounded-r-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('my-campaigns')}
            className={`${activeTab === 'my-campaigns'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Campaigns
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`${activeTab === 'explore'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Explore Hashtags
          </button>
        </nav>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Fetching hashtag analytics...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Hashtag Analytics Results */}
      {hashtagData && !loading && (
        <div className="mt-6 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics for {searchQuery}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-sky-50 p-4 rounded-lg">
                <p className="text-sky-600 font-medium">Total Tweets</p>
                <p className="text-2xl font-bold">{hashtagData.totalTweets}</p>
              </div>
              <div className="bg-sky-50 p-4 rounded-lg">
                <p className="text-sky-600 font-medium">Total Engagement</p>
                <p className="text-2xl font-bold">
                  {hashtagData.engagementMetrics.totalLikes + hashtagData.engagementMetrics.totalRetweets}
                </p>
              </div>
              <div className="bg-sky-50 p-4 rounded-lg">
                <p className="text-sky-600 font-medium">Avg. Engagement</p>
                <p className="text-2xl font-bold">
                  {Math.round(hashtagData.engagementMetrics.averageEngagement)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Activity</h3>
              <div className="h-64">
                <Line
                  data={{
                    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                    datasets: [{
                      label: 'Tweet Activity',
                      data: hashtagData.hourlyActivity,
                      borderColor: 'rgb(14, 165, 233)',
                      backgroundColor: 'rgba(14, 165, 233, 0.1)',
                      fill: true,
                      tension: 0.4,
                    }],
                  }}
                  options={chartOptions}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Distribution</h3>
              <div className="h-64">
                <Doughnut
                  data={{
                    labels: ['Likes', 'Retweets'],
                    datasets: [{
                      data: [
                        hashtagData.engagementMetrics.totalLikes,
                        hashtagData.engagementMetrics.totalRetweets
                      ],
                      backgroundColor: [
                        'rgba(14, 165, 233, 0.8)',
                        'rgba(56, 189, 248, 0.8)'
                      ],
                      borderWidth: 0,
                    }],
                  }}
                  options={chartOptions}
                />
              </div>
            </motion.div>
          </div>

          {/* Top Influencers */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Influencers</h3>
            <div className="divide-y divide-gray-200">
              {hashtagData.topInfluencers.map((influencer, index) => (
                <motion.div
                  key={influencer.username}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="py-3 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="text-gray-900 font-medium">{influencer.username}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">{influencer.tweets} tweets</span>
                    <span className="text-green-600">{influencer.totalEngagement} engagement</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Content */}
      <div className="mt-6">
        {activeTab === 'my-campaigns' ? (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: 'Total Impressions',
                  value: '234.7K',
                  icon: UserGroupIcon,
                },
                {
                  name: 'Engagement Rate',
                  value: '5.2%',
                  icon: ChartBarIcon,
                },
                {
                  name: 'Active Hashtags',
                  value: '8',
                  icon: HashtagIcon,
                },
                {
                  name: 'Growth Rate',
                  value: '+12%',
                  icon: ArrowTrendingUpIcon,
                },
              ].map((metric) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <dt className="flex items-center text-sm font-medium text-gray-500">
                    <metric.icon className="h-5 w-5 mr-2 text-gray-400" />
                    {metric.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</dd>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hashtag Performance</h3>
                <div className="h-64">
                  <Line data={hashtagPerformance} options={chartOptions} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Distribution</h3>
                <div className="h-64">
                  <Doughnut data={engagementDistribution} options={chartOptions} />
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trending Hashtags */}
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Trending Hashtags</h3>
              <div className="divide-y divide-gray-200">
                {trendingHashtags.map((hashtag, index) => (
                  <motion.div
                    key={hashtag.tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <HashtagIcon className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-gray-900 font-medium">{hashtag.tag}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500">{hashtag.volume}</span>
                      <span className="text-green-600">{hashtag.growth}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;