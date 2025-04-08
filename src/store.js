import { configureStore, createSlice } from '@reduxjs/toolkit';

// Load initial theme preference from localStorage
const savedTheme = localStorage.getItem('theme') === 'dark';
const savedAccentColor = localStorage.getItem('accentColor') || 'purple';

// Apply theme class to document root on initial load
if (savedTheme) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Apply accent color
document.documentElement.setAttribute('data-theme', savedAccentColor);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: savedTheme,
    accentColor: savedAccentColor
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
      localStorage.setItem('accentColor', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    }
  }
});

// Load initial user data from localStorage
const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      ...savedUser,
      posts: [],
      followers: [],
      following: []
    },
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...action.payload,
        posts: [],
        followers: [],
        following: []
      };
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    addPost: (state, action) => {
      state.user.posts.unshift(action.payload);
    },
    removePost: (state, action) => {
      state.user.posts = state.user.posts.filter(post => post.id !== action.payload);
    },
    addFollower: (state, action) => {
      if (!state.user.followers.some(f => f.id === action.payload.id)) {
        state.user.followers.push(action.payload);
      }
    },
    removeFollower: (state, action) => {
      state.user.followers = state.user.followers.filter(f => f.id !== action.payload);
    },
    addFollowing: (state, action) => {
      if (!state.user.following.some(f => f.id === action.payload.id)) {
        state.user.following.push(action.payload);
      }
    },
    removeFollowing: (state, action) => {
      state.user.following = state.user.following.filter(f => f.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    unreadCount: 0,
    unreadMessages: 0
  },
  reducers: {
    markAllNotificationsAsRead: (state) => {
      state.unreadCount = 0;
    },
    markAllMessagesAsRead: (state) => {
      state.unreadMessages = 0;
    }
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addPost: (state, action) => {
      state.items.unshift(action.payload);
      // Save to localStorage
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      savedPosts.unshift(action.payload);
      localStorage.setItem('posts', JSON.stringify(savedPosts));
    },
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    setPostsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostsError: (state, action) => {
      state.error = action.payload;
    },
    likePost: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    unlikePost: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.likes -= 1;
      }
    }
  }
});

export const { toggleTheme, setAccentColor } = themeSlice.actions;
export const { 
  setUser, 
  updateUserProfile, 
  addPost: addUserPost, 
  removePost, 
  addFollower, 
  removeFollower, 
  addFollowing, 
  removeFollowing, 
  setLoading, 
  setError, 
  logout 
} = authSlice.actions;
export const { markAllNotificationsAsRead, markAllMessagesAsRead } = notificationsSlice.actions;
export const { 
  addPost, 
  setPosts, 
  setPostsLoading, 
  setPostsError,
  likePost,
  unlikePost
} = postsSlice.actions;

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
    posts: postsSlice.reducer
  }
});

// Load saved posts on startup
const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
if (savedPosts.length > 0) {
  store.dispatch(setPosts(savedPosts));
}

export default store;