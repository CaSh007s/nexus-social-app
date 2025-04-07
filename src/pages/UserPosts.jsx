import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Generate mock posts
    const mockPosts = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      content: `This is post #${i + 1} about ${['technology', 'innovation', 'design', 'development'][i % 4]}! 🚀`,
      image: i % 3 === 0 ? `https://picsum.photos/seed/${i}/800/400` : null,
      likes: Math.floor(Math.random() * 100) + 1,
      comments: Math.floor(Math.random() * 50) + 1,
      shares: Math.floor(Math.random() * 20) + 1,
      timestamp: new Date(2025, 3, 15 - i, 14, 30)
    }));
    setPosts(mockPosts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.fullName}'s Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Showing all {posts.length} posts
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {post.content}
                </p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="mt-4 rounded-lg w-full"
                  />
                )}
                <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2">
                      <HeartIcon className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <ShareIcon className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <span className="text-sm">
                    {format(post.timestamp, 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;