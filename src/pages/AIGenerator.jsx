import AIWriter from '../components/ai/AIWriter';

const AIGenerator = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Tweet Generator</h1>
        <p className="mt-2 text-gray-600">
          Generate engaging tweet content with AI assistance. Use your credits wisely!
        </p>
      </div>
      <AIWriter />
    </div>
  );
};

export default AIGenerator;