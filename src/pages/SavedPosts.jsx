import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

const SAVED_POSTS = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
      title: 'Software Engineer at Tech Corp'
    },
    content: 'Just launched our new AI-powered product! 🚀 Really excited about the potential impact this could have on the industry. #innovation #tech #ai',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    timestamp: new Date(2025, 3, 15, 14, 30),
    likes: 142,
    comments: 23,
    shares: 12,
    saved: true
  },
  {
    id: 2,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random',
      title: 'Product Designer'
    },
    content: 'Here\'s a sneak peek of the design system I\'ve been working on. What do you think? 🎨 #design #ux',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    timestamp: new Date(2025, 3, 14, 10, 15),
    likes: 89,
    comments: 15,
    shares: 5,
    saved: true
  }
];

function SavedPost({ post: initialPost, onUnsave }) {
  const [post, setPost] = useState(initialPost);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setPost(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={post.user.avatar} 
            alt={post.user.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.user.title}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {format(post.timestamp, 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 py-2">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {post.image && (
        <div className="relative">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <span>{post.likes} likes</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{post.comments} comments</span>
          <span>•</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            liked 
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          {liked ? (
            <HeartIconSolid className="w-6 h-6" />
          ) : (
            <HeartIcon className="w-6 h-6" />
          )}
          <span>Like</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <ChatBubbleLeftIcon className="w-6 h-6" />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <ShareIcon className="w-6 h-6" />
          <span>Share</span>
        </button>

        <button 
          onClick={onUnsave}
          className="flex items-center space-x-2 px-4 py-2 text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
        >
          <BookmarkIconSolid className="w-6 h-6" />
          <span>Saved</span>
        </button>
      
      </div>
    </motion.div>
  );
}

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState(SAVED_POSTS);

  const handleUnsave = (postId) => {
    setSavedPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Saved Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your collection of saved posts
        </p>
      </div>

      {savedPosts.length > 0 ? (
        <div className="space-y-6">
          {savedPosts.map(post => (
            <SavedPost
              key={post.id}
              post={post}
              onUnsave={() => handleUnsave(post.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <BookmarkIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No saved posts yet
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Start saving posts by clicking the bookmark icon on any post
          </p>
        </div>
      )}
    </div>
  );
}

export default SavedPosts;