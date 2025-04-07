import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import TextareaAutosize from 'react-textarea-autosize';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const DUMMY_MESSAGES = [
  {
    id: 1,
    user: {
      id: 'user1',
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random',
      online: true
    },
    unread: 2,
    lastMessage: {
      content: 'Hey, what do you think about the new design system?',
      timestamp: new Date(2025, 3, 15, 14, 30)
    }
  },
  {
    id: 2,
    user: {
      id: 'user2',
      name: 'Alex Chen',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random',
      online: false
    },
    unread: 0,
    lastMessage: {
      content: 'The AI research paper looks promising!',
      timestamp: new Date(2025, 3, 15, 12, 45)
    }
  }
];

const CONVERSATION_MESSAGES = [
  {
    id: 1,
    sender: 'user1',
    content: 'Hey, what do you think about the new design system?',
    timestamp: new Date(2025, 3, 15, 14, 30)
  },
  {
    id: 2,
    sender: 'me',
    content: "I'm reviewing it right now. The color palette is really well thought out!",
    timestamp: new Date(2025, 3, 15, 14, 32)
  },
  {
    id: 3,
    sender: 'user1',
    content: 'Great! I was particularly focused on accessibility.',
    timestamp: new Date(2025, 3, 15, 14, 33)
  }
];

function Messages() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(CONVERSATION_MESSAGES);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'me',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
        {/* Users List */}
        <div className="col-span-4 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Messages
            </h2>
          </div>

          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {DUMMY_MESSAGES.map(message => (
              <motion.div
                key={message.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 ${
                  selectedUser?.id === message.user.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                }`}
                onClick={() => setSelectedUser(message.user)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {message.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {message.user.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {format(message.lastMessage.timestamp, 'h:mm a')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {message.lastMessage.content}
                    </p>
                  </div>
                  {message.unread > 0 && (
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{message.unread}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-8 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {selectedUser.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedUser.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'me'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me'
                          ? 'text-purple-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {format(message.timestamp, 'h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <TextareaAutosize
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      minRows={1}
                      maxRows={4}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;