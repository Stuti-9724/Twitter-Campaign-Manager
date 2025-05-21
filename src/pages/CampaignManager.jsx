import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  CalendarIcon,
  SparklesIcon,
  HashtagIcon,
  ClockIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Product Launch',
      hashtag: '#NewProduct',
      status: 'active',
      scheduledTweets: 12,
      completedTweets: 5,
      nextTweet: '2024-01-20 14:30',
    },
    {
      id: 2,
      name: 'Brand Awareness',
      hashtag: '#BrandGrowth',
      status: 'scheduled',
      scheduledTweets: 8,
      completedTweets: 0,
      nextTweet: '2024-01-21 10:00',
    },
  ]);

  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    hashtag: '',
    description: '',
    frequency: 'daily',
    tweetCount: 10,
  });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    // TODO: Implement campaign creation logic
    setShowNewCampaign(false);
  };

  const generateTweets = async (campaignId) => {
    // TODO: Implement AI tweet generation
    console.log('Generating tweets for campaign:', campaignId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Campaign Manager</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewCampaign(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Campaign
        </motion.button>
      </div>

      {/* Campaign List */}
      <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-primary-600 flex items-center mt-1">
                  <HashtagIcon className="h-4 w-4 mr-1" />
                  {campaign.hashtag}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {campaign.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>
                  {campaign.completedTweets} of {campaign.scheduledTweets} tweets sent
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>Next tweet: {campaign.nextTweet}</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => generateTweets(campaign.id)}
                className="btn-secondary flex-1 flex items-center justify-center"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                Generate Tweets
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <PencilIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Campaign</h2>
            <form onSubmit={handleCreateCampaign}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
                  <input
                    type="text"
                    className="input-field mt-1"
                    value={newCampaign.name}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Hashtag</label>
                  <input
                    type="text"
                    className="input-field mt-1"
                    value={newCampaign.hashtag}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, hashtag: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="input-field mt-1"
                    rows="3"
                    value={newCampaign.description}
                    onChange={(e) =>
                      setNewCampaign({ ...newCampaign, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Frequency</label>
                    <select
                      className="input-field mt-1"
                      value={newCampaign.frequency}
                      onChange={(e) =>
                        setNewCampaign({ ...newCampaign, frequency: e.target.value })
                      }
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tweet Count</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="input-field mt-1"
                      value={newCampaign.tweetCount}
                      onChange={(e) =>
                        setNewCampaign({
                          ...newCampaign,
                          tweetCount: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewCampaign(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Campaign
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CampaignManager;