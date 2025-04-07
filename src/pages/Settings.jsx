import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { toggleTheme } from '../store';
import {
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  EyeIcon,
  SwatchIcon,
  GlobeAltIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  LockClosedIcon,
  GlobeAmericasIcon,
  LanguageIcon,
  BellAlertIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  CameraIcon,
  PencilIcon,
  LinkIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

function Settings() {
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    website: 'https://example.com',
    location: 'Lucknow, India',
    phone: '+91 9876543210',
    notifications: {
      email: true,
      push: true,
      mentions: true,
      follows: true,
      likes: true,
      comments: true,
      messages: true,
      newFollowers: true,
      postLikes: true,
      commentReplies: true
    },
    privacy: {
      profileVisibility: 'public',
      messagePermission: 'followers',
      activityStatus: true,
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowTagging: 'followers',
      allowMentions: 'everyone'
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      deviceHistory: true,
      passwordExpiry: '90days',
      loginHistory: true,
      securityQuestions: true,
      recoveryEmail: user?.email || ''
    },
    language: {
      interface: 'English',
      content: 'English',
      region: 'India',
      timezone: 'Asia/Kolkata'
    },
    theme: {
      mode: darkMode ? 'dark' : 'light'
    },
    password: {
      current: '',
      new: '',
      confirm: ''
    },
    devices: [
      {
        name: 'MacBook Pro',
        type: 'Desktop',
        lastActive: '2 hours ago',
        location: 'Lucknow, India',
        browser: 'Chrome',
        os: 'macOS Sonoma'
      },
      {
        name: 'iPhone 15 Pro',
        type: 'Mobile',
        lastActive: 'Active now',
        location: 'Lucknow, India',
        browser: 'Safari',
        os: 'iOS 17'
      }
    ]
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'privacy', name: 'Privacy', icon: EyeIcon },
    { id: 'appearance', name: 'Appearance', icon: SwatchIcon },
    { id: 'language', name: 'Language & Region', icon: GlobeAltIcon },
    { id: 'password', name: 'Password', icon: KeyIcon },
    { id: 'devices', name: 'Connected Devices', icon: DevicePhoneMobileIcon },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate password change if on password tab
      if (activeTab === 'password') {
        if (formData.password.new !== formData.password.confirm) {
          toast.error('New passwords do not match');
          return;
        }
        if (formData.password.new.length < 8) {
          toast.error('Password must be at least 8 characters long');
          return;
        }
      }

      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                Profile Picture
              </label>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                    <CameraIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full"
                  >
                    Upload New Photo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full"
                  >
                    Remove Photo
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <PencilIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <EnvelopeIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <LinkIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <MapPinIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <PhoneIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                placeholder="Tell us about yourself..."
              />
              <p className="mt-2 text-sm text-gray-500">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Account Security
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <LockClosedIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        formData.security.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          twoFactorAuth: !prev.security.twoFactorAuth
                        }
                      }))}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </motion.button>
                  </div>
                  {formData.security.twoFactorAuth && (
                    <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Two-factor authentication is enabled. You'll receive a code via email when signing in from a new device.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BellAlertIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Login Alerts</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of new sign-ins</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        formData.security.loginAlerts ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          loginAlerts: !prev.security.loginAlerts
                        }
                      }))}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <KeyIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Password Expiry</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Regular password updates</p>
                      </div>
                    </div>
                    <select
                      value={formData.security.passwordExpiry}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          passwordExpiry: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="never">Never</option>
                      <option value="30days">30 days</option>
                      <option value="60days">60 days</option>
                      <option value="90days">90 days</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Recovery Email</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Backup email for account recovery</p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="email"
                    value={formData.security.recoveryEmail}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        recoveryEmail: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter recovery email"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Email Notifications
                  </h4>
                  <div className="space-y-4">
                    {[
                      { key: 'messages', label: 'New Messages', icon: EnvelopeIcon },
                      { key: 'newFollowers', label: 'New Followers', icon: UserGroupIcon },
                      { key: 'postLikes', label: 'Post Likes', icon: HeartIcon },
                      { key: 'commentReplies', label: 'Comment Replies', icon: ChatBubbleLeftIcon }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">{label}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            formData.notifications[key] ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-500'
                          }`}
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [key]: !prev.notifications[key]
                            }
                          }))}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.notifications[key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Push Notifications
                  </h4>
                  <div className="space-y-4">
                    {[
                      { key: 'push', label: 'Enable Push Notifications', icon: BellIcon },
                      { key: 'mentions', label: 'Mentions', icon: UserIcon },
                      { key: 'follows', label: 'New Followers', icon: UserGroupIcon },
                      { key: 'likes', label: 'Likes', icon: HeartIcon },
                      { key: 'comments', label: 'Comments', icon: ChatBubbleLeftIcon }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white dark:bg-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">{label}</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            formData.notifications[key] ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-500'
                          }`}
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [key]: !prev.notifications[key]
                            }
                          }))}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.notifications[key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Privacy Settings
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <UserGroupIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile</p>
                      </div>
                    </div>
                    <select
                      value={formData.privacy.profileVisibility}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        privacy: {
                          ...prev.privacy,
                          profileVisibility: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="public">Everyone</option>
                      <option value="followers">Followers Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <ChatBubbleLeftIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Message Permissions</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Who can send you messages</p>
                      </div>
                    </div>
                    <select
                      value={formData.privacy.messagePermission}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        privacy: {
                          ...prev.privacy,
                          messagePermission: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="followers">Followers Only</option>
                      <option value="none">No One</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <UserIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Tagging</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Who can tag you in posts</p>
                      </div>
                    </div>
                    <select
                      value={formData.privacy.allowTagging}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        privacy: {
                          ...prev.privacy,
                          allowTagging: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="followers">Followers Only</option>
                      <option value="none">No One</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'activityStatus', label: 'Show Activity Status', description: 'Let others see when you\'re active' },
                    { key: 'showEmail', label: 'Show Email', description: 'Display your email on your profile' },
                    { key: 'showPhone', label: 'Show Phone Number', description: 'Display your phone number on your profile' },
                    { key: 'showLocation', label: 'Show Location', description: 'Display your location on your profile' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          formData.privacy[key] ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-500'
                        }`}
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            [key]: !prev.privacy[key]
                          }
                        }))}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.privacy[key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Theme</h3>
              <div className="grid grid-cols-2 gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{scale: 0.98}}
                  onClick={() => dispatch(toggleTheme())}
                  className={`p-6 rounded-xl border-2 ${
                    !darkMode 
                      ? 'border-purple-500 bg-white' 
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                      <SwatchIcon className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">Light</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">For bright environments</p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => dispatch(toggleTheme())}
                  className={`p-6 rounded-xl border-2 ${
                    darkMode 
                      ? 'border-purple-500 bg-gray-800' 
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                      <SwatchIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">Dark</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">For dark environments</p>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Language & Region Settings
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <LanguageIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Interface Language</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Language for buttons and labels</p>
                      </div>
                    </div>
                    <select
                      value={formData.language.interface}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        language: {
                          ...prev.language,
                          interface: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Content Language</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Language for posts and content</p>
                      </div>
                    </div>
                    <select
                      value={formData.language.content}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        language: {
                          ...prev.language,
                          content: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <GlobeAmericasIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Region</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your location for relevant content</p>
                      </div>
                    </div>
                    <select
                      value={formData.language.region}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        language: {
                          ...prev.language,
                          region: e.target.value
                        }
                      }))}
                      className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'password':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Change Password
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={formData.password.current}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          password: {
                            ...prev.password,
                            current: e.target.value
                          }
                        }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={formData.password.new}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          password: {
                            ...prev.password,
                            new: e.target.value
                          }
                        }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={formData.password.confirm}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          password: {
                            ...prev.password,
                            confirm: e.target.value
                          }
                        }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (formData.password.new !== formData.password.confirm) {
                          toast.error('New passwords do not match');
                          return;
                        }
                        if (formData.password.new.length < 8) {
                          toast.error('Password must be at least 8 characters long');
                          return;
                        }
                        toast.success('Password updated successfully');
                      }}
                      className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Update Password
                    </motion.button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Password Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Minimum 8 characters long</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>At least one uppercase letter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>At least one number</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Connected Devices
              </h3>
              <div className="space-y-4">
                {formData.devices.map((device, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {device.type === 'Desktop' ? (
                          <DevicePhoneMobileIcon className="w-8 h-8 text-purple-500" />
                        ) : (
                          <PhoneIcon className="w-8 h-8 text-purple-500" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{device.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{device.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{device.browser}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{device.os}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{device.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            devices: prev.devices.filter((_, i) => i !== index)
                          }));
                          toast.success('Device removed successfully');
                        }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
            Select a section from the sidebar
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="grid grid-cols-4 min-h-[800px]">
        {/* Settings Navigation */}
        <div className="col-span-1 border-r border-gray-200 dark:border-gray-700">
          <nav className="p-6 space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.name}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="col-span-3 p-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            {tabs.find(tab => tab.id === activeTab)?.name}
          </h2>
          
          <form onSubmit={handleSubmit}>
            {renderTabContent()}
            
            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 bg-purple-600 text-white text-lg font-medium rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;