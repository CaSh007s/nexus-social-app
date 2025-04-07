import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { markAllNotificationsAsRead } from '../store';

const NOTIFICATIONS = {
  all: [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
      },
      content: 'liked your post about AI innovations',
      time: new Date(2025, 3, 15, 14, 30),
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Sarah Wilson',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random'
      },
      content: 'commented on your post about design systems',
      time: new Date(2025, 3, 15, 12, 45),
      read: false
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Mike Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random'
      },
      content: 'started following you',
      time: new Date(2025, 3, 15, 10, 15),
      read: false
    }
  ],
  mentions: [
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'Alex Chen',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random'
      },
      content: 'mentioned you in a comment: "Great insights @you!"',
      time: new Date(2025, 3, 15, 9, 30),
      read: false
    },
    {
      id: 5,
      type: 'mention',
      user: {
        name: 'Emily Rodriguez',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=random'
      },
      content: 'mentioned you in a post about web development trends',
      time: new Date(2025, 3, 14, 16, 45),
      read: false
    }
  ],
  follows: [
    {
      id: 6,
      type: 'follow',
      user: {
        name: 'David Kim',
        avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=random'
      },
      content: 'started following you',
      time: new Date(2025, 3, 14, 14, 20),
      read: false
    },
    {
      id: 7,
      type: 'follow',
      user: {
        name: 'Lisa Wang',
        avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=random'
      },
      content: 'started following you',
      time: new Date(2025, 3, 14, 11, 10),
      read: false
    }
  ]
};

function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const dispatch = useDispatch();

  const handleMarkAllAsRead = () => {
    const updatedNotifications = {
      all: notifications.all.map(n => ({ ...n, read: true })),
      mentions: notifications.mentions.map(n => ({ ...n, read: true })),
      follows: notifications.follows.map(n => ({ ...n, read: true }))
    };
    setNotifications(updatedNotifications);
    dispatch(markAllNotificationsAsRead());
    toast.success('All notifications marked as read');
  };

  const getUnreadCount = () => {
    return notifications.all.filter(n => !n.read).length +
           notifications.mentions.filter(n => !n.read).length +
           notifications.follows.filter(n => !n.read).length;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Notifications
          {getUnreadCount() > 0 && (
            <span className="ml-2 px-2 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full">
              {getUnreadCount()} new
            </span>
          )}
        </h2>
        <button
          onClick={handleMarkAllAsRead}
          className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-4 px-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'all'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('mentions')}
            className={`px-3 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'mentions'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
            }`}
          >
            Mentions
          </button>
          <button
            onClick={() => setActiveTab('follows')}
            className={`px-3 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'follows'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
            }`}
          >
            Follows
          </button>
        </nav>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {notifications[activeTab].map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out ${
              !notification.read ? 'bg-purple-50 dark:bg-purple-900/10' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.user.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.content}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {format(notification.time, 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;