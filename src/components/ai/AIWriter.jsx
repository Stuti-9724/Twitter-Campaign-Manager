import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AIWriter = () => {
  const { user } = useAuth();
  const [tweetContent, setTweetContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('small_business');
  const [toneOfVoice, setToneOfVoice] = useState('professional');
  const [hashtags, setHashtags] = useState('');
  const [credits, setCredits] = useState(5); // Mock credits
  const [loading, setLoading] = useState(false);

  const audiences = [
    { value: 'small_business', label: 'Small business owners' },
    { value: 'marketers', label: 'Marketing professionals' },
    { value: 'tech_enthusiasts', label: 'Tech enthusiasts' },
    { value: 'general', label: 'General audience' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' }
  ];

  const handleGenerate = async () => {
    if (credits <= 0) {
      alert('No credits left! Please upgrade your plan.');
      return;
    }

    setLoading(true);
    try {
      // Mock AI generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock generated content
      const mockContent = `🚀 Exciting news! Just launched our latest feature to help ${targetAudience === 'small_business' ? 'small businesses grow' : 'boost your productivity'}! \n\nCheck out how it can transform your workflow: [Link] ${hashtags ? '\n\n' + hashtags : ''}`;
      
      setTweetContent(mockContent);
      setCredits(prev => prev - 1);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = () => {
    // Mock save template functionality
    alert('Template saved successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">AI Writer</h2>
        <span className="text-blue-600">{credits} credits left</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What would you like to tweet about?
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Product launch, Industry news, Tips and tricks"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target audience
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          >
            {audiences.map(audience => (
              <option key={audience.value} value={audience.value}>
                {audience.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone of voice
          </label>
          <div className="grid grid-cols-3 gap-3">
            {tones.map(tone => (
              <button
                key={tone.value}
                className={`p-2 text-center rounded-md transition-colors ${toneOfVoice === tone.value ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setToneOfVoice(tone.value)}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Include hashtags (optional)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., #Marketing #SocialMedia"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={handleSaveTemplate}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            disabled={loading}
          >
            Save as Template
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || credits <= 0}
            className={`px-4 py-2 rounded-md transition-colors ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIWriter;