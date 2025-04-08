import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPost, likePost, unlikePost } from '../store';
import Stories from '../components/Stories';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  PhotoIcon,
  VideoCameraIcon,
  FaceSmileIcon,
  MapPinIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

const DUMMY_POSTS = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
      title: 'Software Engineer at Tech Corp'
    },
    content: 'Just launched our new AI-powered product! 🚀 Really excited about the potential impact this could have on the industry. #innovation #tech #ai',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    timestamp: new Date(2025, 3, 15, 14, 30).toISOString(),
    likes: 142,
    comments: 23,
    shares: 12,
    saved: false
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
    timestamp: new Date(2025, 3, 14, 10, 15).toISOString(),
    likes: 89,
    comments: 15,
    shares: 5,
    saved: false
  },
  {
    id: 3,
    user: {
      name: 'Alex Chen',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=random',
      title: 'AI Researcher'
    },
    content: 'Breaking: Just published our latest research on quantum computing applications in AI. This could revolutionize how we approach machine learning! 🧠 #quantumcomputing #ai #research',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
    timestamp: new Date(2025, 3, 13, 16, 45).toISOString(),
    likes: 234,
    comments: 45,
    shares: 78,
    saved: false
  },
  {
    id: 4,
    user: {
      name: 'Emily Rodriguez',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=random',
      title: 'Senior Frontend Developer'
    },
    content: 'Just wrapped up a major redesign project using the latest React features. The performance improvements are incredible! 📈 #webdev #react #performance',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    timestamp: new Date(2025, 3, 12, 9, 20).toISOString(),
    likes: 167,
    comments: 29,
    shares: 15,
    saved: false
  }
];

function CreatePostCard() {
  const [postText, setPostText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preview, setPreview] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handlePost = () => {
    if (!postText.trim() && !selectedFile) {
      toast.error('Please add some content to your post');
      return;
    }

    const newPost = {
      id: Date.now(),
      user: {
        name: user?.fullName || user?.username || 'Anonymous',
        avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'Anonymous'}&background=random`,
        title: user?.title || 'Member'
      },
      content: postText,
      image: preview,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      saved: false
    };

    dispatch(addPost(newPost));
    toast.success('Post created successfully!');
    setPostText('');
    setSelectedFile(null);
    setPreview(null);
    setIsExpanded(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
      } else {
        toast.error('Please select an image or video file');
      }
    }
  };

  return (
    <motion.div 
      layout
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`}
            alt="Your avatar"
            className="w-12 h-12 rounded-full border-2 border-purple-500"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
        </div>
        <div className="flex-1">
          <TextareaAutosize
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            onClick={() => setIsExpanded(true)}
            placeholder={`What's on your mind, ${user?.username || 'there'}?`}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            minRows={isExpanded ? 3 : 1}
          />
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-4"
            >
              {preview && (
                <div className="relative">
                  {selectedFile?.type.startsWith('image/') ? (
                    <img 
                      src={preview}
                      alt="Selected" 
                      className="max-h-60 rounded-lg object-cover"
                    />
                  ) : (
                    <video 
                      src={preview}
                      className="max-h-60 rounded-lg"
                      controls
                    />
                  )}
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-gray-900/50 text-white p-1 rounded-full hover:bg-gray-900/75"
                  >
                    ×
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <motion.label
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
                  >
                    <PhotoIcon className="w-6 h-6 text-green-500 group-hover:text-green-600" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </motion.label>
                  <motion.label
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
                  >
                    <VideoCameraIcon className="w-6 h-6 text-blue-500 group-hover:text-blue-600" />
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </motion.label>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
                  >
                    <FaceSmileIcon className="w-6 h-6 text-yellow-500 group-hover:text-yellow-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
                  >
                    <MapPinIcon className="w-6 h-6 text-red-500 group-hover:text-red-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
                  >
                    <TagIcon className="w-6 h-6 text-purple-500 group-hover:text-purple-600" />
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePost}
                  disabled={!postText.trim() && !selectedFile}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Post({ post: initialPost }) {
  const [post, setPost] = useState(initialPost);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(post.saved);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      dispatch(likePost(post.id));
    } else {
      dispatch(unlikePost(post.id));
    }
    setPost(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Post removed from saved' : 'Post saved successfully');
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: 'https://ui-avatars.com/api/?name=You&background=random'
      },
      content: newComment,
      timestamp: new Date().toISOString()
    };

    setComments(prev => [...prev, newCommentObj]);
    setPost(prev => ({
      ...prev,
      comments: prev.comments + 1
    }));
    setNewComment('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      {/* Post Header */}
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
              {format(new Date(post.timestamp), 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Post Stats */}
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

      {/* Post Actions */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
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

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <ChatBubbleLeftIcon className="w-6 h-6" />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <ShareIcon className="w-6 h-6" />
          <span>Share</span>
        </button>

        <button 
          onClick={handleSave}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            saved 
              ? 'text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
        >
          {saved ? (
            <BookmarkIconSolid className="w-6 h-6" />
          ) : (
            <BookmarkIcon className="w-6 h-6" />
          )}
          <span>Save</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 space-y-4">
          {/* Comment Form */}
          <form onSubmit={handleComment} className="flex items-start space-x-2">
            <img 
              src="https://ui-avatars.com/api/?name=You&background=random" 
              alt="Your avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
            </div>
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {comment.user.name}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {format(new Date(comment.timestamp), 'h:mm a')}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function Home() {
  const posts = useSelector((state) => state.posts.items);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Stories />
      <CreatePostCard />
      
      {/* Posts Feed */}
      <div className="space-y-6">
        {[...posts, ...DUMMY_POSTS].map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;