import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../store';
import { 
  HomeIcon, 
  UserIcon, 
  BellIcon, 
  ChatBubbleLeftIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

function Layout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount, unreadMessages } = useSelector((state) => state.notifications);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [following, setFollowing] = useState({});

  // Mock data for profile stats
  const mockStats = {
    posts: 15,
    followers: 248,
    following: 186
  };

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Trending', href: '/trending', icon: ChartBarIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftIcon, count: unreadMessages },
    { name: 'Notifications', href: '/notifications', icon: BellIcon, count: unreadCount },
    { name: 'Saved Posts', href: '/saved', icon: BookmarkIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate('/login');
  };
  
  const handleFollow = (userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const navigateToProfile = (tab = '') => {
    navigate(`/profile/${user?.id}${tab}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 fixed left-0 h-screen p-6 space-y-8">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xl font-bold text-white">N</span>
              </motion.div>
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Nexus
              </motion.h1>
            </Link>

            {/* Profile Card */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg cursor-pointer"
              whileHover={{ y: -2 }}
              onClick={() => navigateToProfile()}
            >
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                  {user?.fullName?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'N'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user?.fullName || 'User'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{user?.username?.toLowerCase() || 'username'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <motion.div 
                  className="space-y-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToProfile('/posts');
                  }}
                >
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mockStats.posts}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                </motion.div>
                <motion.div 
                  className="space-y-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToProfile('/followers');
                  }}
                >
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mockStats.followers}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                </motion.div>
                <motion.div 
                  className="space-y-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToProfile('/following');
                  }}
                >
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {mockStats.following}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.href
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                  {item.count > 0 && (
                    <span className="ml-auto bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full text-xs">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-1">
              <Link
                to="/settings"
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Cog6ToothIcon className="w-5 h-5 mr-3" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="ml-64 flex-1 mr-80">
            <main className="py-6">{children}</main>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 fixed right-0 h-screen p-6 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Trending Topics
              </h2>
              <div className="space-y-4">
                {[
                  { tag: '#TechNews', posts: '12.5K posts' },
                  { tag: '#Innovation', posts: '8.2K posts' },
                  { tag: '#Programming', posts: '6.7K posts' },
                  { tag: '#AI', posts: '5.9K posts' },
                  { tag: '#WebDev', posts: '4.3K posts' }
                ].map((topic, i) => (
                  <motion.div
                    key={topic.tag}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 flex items-center justify-center">
                      <ChartBarIcon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {topic.tag}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {topic.posts}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Suggested Connections
              </h2>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    name: 'Emma Thompson',
                    title: 'UX Designer',
                    avatar: 'https://ui-avatars.com/api/?name=Emma+Thompson&background=random',
                    mutualConnections: 12
                  },
                  {
                    id: 2,
                    name: 'James Wilson',
                    title: 'Frontend Developer',
                    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=random',
                    mutualConnections: 8
                  },
                  {
                    id: 3,
                    name: 'Sophie Chen',
                    title: 'Product Manager',
                    avatar: 'https://ui-avatars.com/api/?name=Sophie+Chen&background=random',
                    mutualConnections: 15
                  }
                ].map((connection) => (
                  <motion.div
                    key={connection.id}
                    className="flex items-center space-x-3 p-2 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={connection.avatar}
                      alt={connection.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {connection.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {connection.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {connection.mutualConnections} mutual connections
                      </p>
                    </div>
                    <button
                      onClick={() => handleFollow(connection.id)}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        following[connection.id]
                          ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      } transition-colors duration-200`}
                    >
                      {following[connection.id] ? 'Following' : 'Follow'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;