# Pages and Routing Guide

This guide explains how all the pages work together in the learner project.

## Overview

The learner project uses **React Router** for client-side routing and **Context API** for state management. All pages are located in the `pages/` folder.

## Pages Summary

### 1. **Login.jsx**
- **Route:** `/login`
- **Purpose:** Authenticates the user by sending credentials to an API endpoint
- **Key Features:**
  - Form with email and password fields
  - Sends credentials to `https://reqres.in/api/login` (or custom endpoint via `VITE_LOGIN_ENDPOINT`)
  - On success: Saves user info to `AuthContext` and redirects to `/`
  - On error: Displays error message
  - Loading state prevents multiple submissions
- **State:**
  - `email` and `password`: Form inputs
  - `error`: Failure message
  - `loading`: API request in progress
- **Context Used:** `useAuth()` to access the `login()` function

### 2. **Home.jsx**
- **Route:** `/`
- **Purpose:** Main dashboard shown after login
- **Key Features:**
  - Displays user information (email, name, role, token) if logged in
  - Shows message if no user is logged in
  - Styled box to highlight logged-in user details
- **State:** None (reads from context)
- **Context Used:** `useAuth()` to access the current `user` object

### 3. **Navigation.jsx**
- **Route:** Not a page, but a component rendered on every page
- **Purpose:** Menu bar with links to all pages
- **Key Features:**
  - NavLinks to all pages (Home, About, Products, Blog, Add Blog, Reset Password)
  - Active link highlighting (underlined in blue)
  - Shows "Logout" button if user is logged in
  - Shows "Login" link if user is not logged in
  - Logout button clears user session and redirects to `/login`
- **State:** None (reads from context)
- **Context Used:** `useAuth()` to access `user` and `logout()` function

### 4. **Blog.jsx**
- **Route:** `/blog`
- **Purpose:** Display all blog posts and manage them (CRUD operations)
- **Key Features:**
  - Fetches blog posts from API on page load
  - Displays posts in a table with Title, Author, Preview, and Actions columns
  - **Actions:**
    - **View:** Opens a modal showing the full blog post (read-only)
    - **Edit:** Opens the same modal with editable form fields (title and body)
    - **Delete:** Removes the post immediately from the list
  - **Modal Popup:**
    - Fixed position overlay with semi-transparent backdrop
    - Shows post content or edit form based on `editMode` state
    - Close button or outside click dismisses the modal
  - "Add New Blog" button navigates to `/blog/add`
  - Shows loading, error, and success messages
- **State:**
  - `selectedPost`: The post open in the modal (null if closed)
  - `editMode`: true if modal is in edit mode, false for view mode
  - `editTitle`, `editBody`: Edited post content
  - `message`: Success/error feedback messages
- **Context Used:** `useBlog()` for posts, loading, error, and CRUD functions

### 5. **AddBlog.jsx**
- **Route:** `/blog/add`
- **Purpose:** Form to create a new blog post
- **Key Features:**
  - Two fields: Blog Title (text input) and Blog Body (textarea, 6 rows)
  - Validates that both fields are filled and not just whitespace
  - Calls `addPost()` from BlogContext to add the post to the list
  - Shows success message and clears form
  - After 400ms delay, redirects to `/blog` to show the new post
  - Shows validation error messages
- **State:**
  - `title`, `body`: Form inputs
  - `message`: Success message
  - `error`: Validation error message
- **Context Used:** `useBlog()` to access `addPost()` function

### 6. **ResetPassword.jsx**
- **Route:** `/reset-password`
- **Purpose:** Form to reset a user's password
- **Key Features:**
  - Three fields: Email, New Password, Confirm Password
  - Validates that all fields are filled
  - Validates that both passwords match
  - Currently simulates a password reset (500ms delay)
  - In a real app, this would call an API endpoint to reset the password
  - Shows success message with instructions to check email
  - Clears form after success
- **State:**
  - `email`, `newPassword`, `confirmPassword`: Form inputs
  - `message`: Success message
  - `error`: Validation/error message
- **Context Used:** None (standalone form)

### 7. **About.jsx**
- **Route:** `/about`
- **Purpose:** Information about the project
- **Key Features:**
  - Simple informational page
  - Can be extended with project description, team info, etc.
- **State:** None
- **Context Used:** None

### 8. **Products.jsx**
- **Route:** `/products`
- **Purpose:** Display products or learning modules
- **Key Features:**
  - Currently a simple informational page
  - Can be extended to display a list of products with add/edit/delete functionality
- **State:** None
- **Context Used:** None

## Context Providers

### AuthContext (`../AuthContext.jsx`)
Stores and manages user authentication state.

**Functions:**
- `login(userData, authToken)`: Saves user info and token
- `logout()`: Clears user and token

**Exposed State:**
- `user`: Current logged-in user object (email, name, role, token)
- `token`: Authentication token from the server

**How to Use:**
```javascript
import { useAuth } from '../AuthContext'

function MyComponent() {
    const { user, token, login, logout } = useAuth()
}
```

### BlogContext (`../BlogContext.jsx`)
Manages blog posts and CRUD operations.

**Functions:**
- `addPost(newPost)`: Adds a new blog post to the top of the list
- `updatePost(postId, updates)`: Updates a blog post with new data
- `deletePost(postId)`: Removes a blog post by ID
- Auto-fetches posts from API on load

**Exposed State:**
- `posts`: Array of blog post objects
- `loading`: Boolean indicating if posts are being fetched
- `error`: Error message if fetching fails

**How to Use:**
```javascript
import { useBlog } from '../BlogContext'

function MyComponent() {
    const { posts, loading, error, addPost, updatePost, deletePost } = useBlog()
}
```

## User Flow

### Login Flow
1. User visits `/login`
2. Enters email and password
3. Form sends POST request to the login API
4. API returns token and success message
5. App saves user info to `AuthContext`
6. App redirects to `/` (Home page)
7. Home page displays user information

### Blog Management Flow
1. User visits `/blog`
2. Page fetches posts from the API
3. Posts are displayed in a table
4. User can:
   - **View** a post: Opens read-only modal
   - **Edit** a post: Opens modal with editable form, saves on submit
   - **Delete** a post: Removes immediately
   - **Add** a post: Clicks "Add New Blog", fills form, redirects back to blog page

### Password Reset Flow
1. User visits `/reset-password`
2. Fills in email and new password (twice)
3. Clicks "Reset Password"
4. Form validates inputs
5. Shows success message

## Key Concepts

### State Management
- **AuthContext:** Holds user login state (email, name, token)
- **BlogContext:** Holds blog posts and auto-fetches from API
- **Local Component State:** Form inputs, UI feedback, modal state

### Routing
- All routes are defined in `App.jsx` using React Router's `<Routes>` and `<Route>`
- `<BrowserRouter>` is enabled in `main.jsx`
- `Navigation` component is rendered on every page and provides links

### Modal Implementation
- The Blog page uses a modal popup for viewing and editing posts
- Modal is conditionally rendered when `selectedPost` is not null
- Same modal serves both view and edit modes based on `editMode` flag
- Fixed positioning with overlay backdrop

### Form Handling
- All forms use `onSubmit` handlers with `preventDefault()`
- Validation happens before state updates
- Success messages are shown after operations
- Forms are cleared after success

## Styling

All pages use inline styles with the `style={}` attribute. Key styles include:
- Flexbox for layouts
- Grid layout for forms
- Table borders and padding for the blog table
- Fixed positioning for the modal overlay
- Semi-transparent backdrop (rgba) for modal overlay

## API Integration

### Login Endpoint
- Default: `https://reqres.in/api/login` (free test API)
- Override: Set `VITE_LOGIN_ENDPOINT` environment variable
- Method: POST
- Body: `{ email: string, password: string }`
- Response: `{ token: string }`

### Blog API
- Endpoint: `https://jsonplaceholder.typicode.com/posts?_limit=6`
- Method: GET
- Response: Array of post objects (fetched on page load)
- Posts are managed locally in `BlogContext` (not persisted to backend)

## Next Steps

To extend the learner project:
1. **Protected Routes:** Wrap pages with authentication check
2. **Persistent Storage:** Save blog posts to a database
3. **User Profiles:** Add page to view and edit user details
4. **Comments:** Add comments to blog posts
5. **Tags/Categories:** Organize blog posts by topic
6. **Search:** Filter posts by title or content
7. **Pagination:** Show multiple pages of blog posts
