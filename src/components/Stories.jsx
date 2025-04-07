import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

// Generate mock stories
const MOCK_STORIES = [
  {
    id: 1,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random'
    },
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    seen: false
  },
  {
    id: 2,
    user: {
      name: 'Alex Chen',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random'
    },
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    seen: true
  },
  {
    id: 3,
    user: {
      name: 'Emily Davis',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random'
    },
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
    seen: false
  },
  {
    id: 4,
    user: {
      name: 'Michael Brown',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random'
    },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    seen: false
  },
  {
    id: 5,
    user: {
      name: 'Sophie Taylor',
      avatar: 'https://ui-avatars.com/api/?name=Sophie+Taylor&background=random'
    },
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    seen: true
  }
];

function CreateStoryModal({ isOpen, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      } else {
        alert('Please select an image or video file');
      }
    }
  };

  const handleSubmit = () => {
    // Handle story creation
    console.log('Creating story with file:', selectedFile);
    onClose();
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Story</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {preview ? (
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
                  {selectedFile.type.startsWith('image/') ? (
                    <img
                      src={preview}
                      alt="Story preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={preview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="block w-full aspect-[9/16] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <PlusIcon className="w-12 h-12 mb-2" />
                    <p className="text-sm">Click to upload image or video</p>
                  </div>
                </label>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                Share Story
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ViewStoryModal({ isOpen, onClose, stories, initialStoryIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const currentStory = stories[currentIndex];

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg aspect-[9/16] mx-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Story Content */}
            <img
              src={currentStory.image}
              alt={`${currentStory.user.name}'s story`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Story Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center space-x-3">
                <img
                  src={currentStory.user.avatar}
                  alt={currentStory.user.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-white font-medium">{currentStory.user.name}</p>
                  <p className="text-white/80 text-sm">Just now</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
            )}
            {currentIndex < stories.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
              >
                <ArrowRightIcon className="w-6 h-6" />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StoryCard({ story, isCreateCard = false, onCreateClick, onViewClick }) {
  const handleClick = () => {
    if (isCreateCard) {
      onCreateClick();
    } else {
      onViewClick(story);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer group"
      onClick={handleClick}
    >
      <div className="w-32 h-48 rounded-xl overflow-hidden">
        {isCreateCard ? (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-2">
                <PlusIcon className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">Create Story</span>
            </div>
          </div>
        ) : (
          <>
            <img
              src={story.image}
              alt={`${story.user.name}'s story`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
          </>
        )}
      </div>

      {!isCreateCard && (
        <>
          <div className="absolute top-2 left-2">
            <div className={`p-0.5 rounded-full ${story.seen ? 'bg-gray-400' : 'bg-gradient-to-br from-purple-500 to-indigo-500'}`}>
              <img
                src={story.user.avatar}
                alt={story.user.name}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
          </div>
          <p className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium truncate">
            {story.user.name}
          </p>
        </>
      )}
    </motion.div>
  );
}

function Stories() {
  const [stories, setStories] = useState(MOCK_STORIES);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const user = useSelector((state) => state.auth.user);

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewClick = (story) => {
    const index = stories.findIndex(s => s.id === story.id);
    setSelectedStoryIndex(index);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <StoryCard isCreateCard={true} onCreateClick={handleCreateClick} />
          {stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onViewClick={handleViewClick}
            />
          ))}
        </div>
      </div>

      <CreateStoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ViewStoryModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        stories={stories}
        initialStoryIndex={selectedStoryIndex}
      />
    </>
  );
}

export default Stories;