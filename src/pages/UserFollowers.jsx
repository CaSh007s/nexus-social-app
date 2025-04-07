import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function UserFollowers() {
  const [followers, setFollowers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Generate mock followers
    const mockFollowers = Array.from({ length: 248 }, (_, i) => {
      const firstName = `User${i + 1}`;
      const lastName = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      const role = ['Developer', 'Designer', 'Product Manager', 'Student'][i % 4];
      const company = ['Google', 'Microsoft', 'Apple', 'Meta'][i % 4];
      
      return {
        id: i + 1,
        name: `${firstName} ${lastName}`,
        username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
        bio: `${role} at ${company}`,
        isFollowing: Math.random() > 0.5
      };
    });
    setFollowers(mockFollowers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.fullName}'s Followers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {followers.length} people following
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {followers.map((follower) => (
            <motion.div
              key={follower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {follower.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{follower.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {follower.bio}
                    </p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    follower.isFollowing
                      ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {follower.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserFollowers;