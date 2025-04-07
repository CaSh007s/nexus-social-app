import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  MapPinIcon,
  LinkIcon,
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Generate mock data
const generateMockPosts = (count = 15) => {
  const posts = [];
  const topics = ['AI', 'Web Development', 'Technology', 'Innovation', 'Programming'];
  const images = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200'
  ];

  for (let i = 0; i < count; i++) {
    posts.push({
      id: i + 1,
      content: `Exciting update about ${topics[Math.floor(Math.random() * topics.length)]}! 🚀 
        Working on something amazing that will revolutionize how we think about technology. 
        #innovation #tech #future`,
      image: i % 3 === 0 ? images[Math.floor(Math.random() * images.length)] : null,
      likes: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 30) + 5,
      timestamp: new Date(2025, 3, 15 - i, 14, 30),
    });
  }
  return posts;
};

const generateMockUsers = (count = 248) => {
  const users = [];
  const roles = ['Software Engineer', 'UX Designer', 'Product Manager', 'Data Scientist', 'DevOps Engineer'];
  const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Twitter'];

  for (let i = 0; i < count; i++) {
    const firstName = `User${i + 1}`;
    const lastName = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];

    users.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      bio: `${role} at ${company} | Passionate about technology and innovation`,
      isFollowing: Math.random() > 0.5
    });
  }
  return users;
};

function Profile() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop() || 'posts');
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // Initialize mock data
    setPosts(generateMockPosts(15));
    setFollowers(generateMockUsers(248));
    setFollowing(generateMockUsers(186));
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/profile/${id}/${tab === 'posts' ? '' : tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
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
        );

      case 'followers':
      case 'following':
        const userList = activeTab === 'followers' ? followers : following;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userList.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{user.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      user.isFollowing
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-500" />
          <div className="px-6 py-4">
            <div className="flex items-start -mt-12">
              <div className="relative">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&size=128`}
                  alt={user?.fullName}
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      {user?.fullName || 'User'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      @{user?.username?.toLowerCase() || 'username'}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {user?.bio || 'No bio yet'}
                </p>
                <div className="mt-4 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  {user?.location && (
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-1" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user?.website && (
                    <div className="flex items-center">
                      <LinkIcon className="w-5 h-5 mr-1" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        {user.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-1" />
                    <span>Joined {format(new Date(user?.createdAt || Date.now()), 'MMMM yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => handleTabChange('posts')}
                className={`flex-1 px-4 py-4 text-sm font-medium text-center ${
                  activeTab === 'posts'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => handleTabChange('followers')}
                className={`flex-1 px-4 py-4 text-sm font-medium text-center ${
                  activeTab === 'followers'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => handleTabChange('following')}
                className={`flex-1 px-4 py-4 text-sm font-medium text-center ${
                  activeTab === 'following'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Following
              </button>
            </nav>
          </div>
        </div>

        {/* Profile Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default Profile;