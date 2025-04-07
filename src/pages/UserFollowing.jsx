import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function UserFollowing() {
  const [following, setFollowing] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Generate mock following
    const mockFollowing = Array.from({ length: 186 }, (_, i) => {
      const firstName = `User${i + 1}`;
      const lastName = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      const role = ['Engineer', 'Artist', 'Entrepreneur', 'Researcher'][i % 4];
      const company = ['Tesla', 'Amazon', 'Netflix', 'Twitter'][i % 4];
      
      return {
        id: i + 1,
        name: `${firstName} ${lastName}`,
        username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
        bio: `${role} at ${company}`,
        isFollowing: true
      };
    });
    setFollowing(mockFollowing);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            People {user?.fullName} Follows
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Following {following.length} people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {following.map((followedUser) => (
            <motion.div
              key={followedUser.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={followedUser.avatar}
                    alt={followedUser.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {followedUser.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{followedUser.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {followedUser.bio}
                    </p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                >
                  Following
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserFollowing;