import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const TRENDING_POSTS = [
  {
    id: 1,
    tag: '#TechNews',
    posts: '12.5K',
    topPost: {
      user: {
        name: 'TechDaily',
        avatar: 'https://ui-avatars.com/api/?name=TechDaily&background=random'
      },
      content: 'Breaking: Revolutionary quantum computing breakthrough announced! Scientists achieve 1000-qubit stability. #QuantumComputing #Innovation',
      engagement: '45.2K'
    }
  },
  {
    id: 2,
    tag: '#Innovation',
    posts: '8.2K',
    topPost: {
      user: {
        name: 'FutureInsights',
        avatar: 'https://ui-avatars.com/api/?name=FutureInsights&background=random'
      },
      content: 'New sustainable energy breakthrough: Solar cells achieve 50% efficiency in lab tests! 🌞 #GreenTech #Sustainability',
      engagement: '32.1K'
    }
  },
  {
    id: 3,
    tag: '#Programming',
    posts: '6.7K',
    topPost: {
      user: {
        name: 'CodeMaster',
        avatar: 'https://ui-avatars.com/api/?name=CodeMaster&background=random'
      },
      content: 'TypeScript 6.0 just dropped with game-changing features! Check out the new pattern matching syntax 🔥 #TypeScript #WebDev',
      engagement: '28.9K'
    }
  },
  {
    id: 4,
    tag: '#AI',
    posts: '5.9K',
    topPost: {
      user: {
        name: 'AIResearch',
        avatar: 'https://ui-avatars.com/api/?name=AIResearch&background=random'
      },
      content: 'GPT-5 sets new benchmarks in reasoning and multimodal understanding. The future is here! 🤖 #ArtificialIntelligence',
      engagement: '25.4K'
    }
  },
  {
    id: 5,
    tag: '#WebDev',
    posts: '4.3K',
    topPost: {
      user: {
        name: 'WebWizard',
        avatar: 'https://ui-avatars.com/api/?name=WebWizard&background=random'
      },
      content: 'React 19 introduces revolutionary new concurrent features! Time to upgrade your apps 🚀 #ReactJS #JavaScript',
      engagement: '21.7K'
    }
  }
];

function TrendingTopic({ topic }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {topic.tag}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {topic.posts} posts
              </p>
            </div>
          </div>
          <span className="text-purple-500">#{topic.id}</span>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4"
          >
            <div className="flex items-start space-x-3">
              <img
                src={topic.topPost.user.avatar}
                alt={topic.topPost.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {topic.topPost.user.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {topic.topPost.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {topic.topPost.engagement} engagements
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Trending() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Trending Now
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          See what's capturing the world's attention right now
        </p>
      </div>

      <div className="space-y-4">
        {TRENDING_POSTS.map(topic => (
          <TrendingTopic key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

export default Trending;