# React Router Pages Setup

This document explains the new routing setup for the `learning` project.

## Added pages

- `learning/src/pages/Login.jsx`
- `learning/src/pages/Home.jsx`
- `learning/src/pages/About.jsx`
- `learning/src/pages/Products.jsx`
- `learning/src/pages/Blog.jsx`
- `learning/src/pages/AddBlog.jsx`
- `learning/src/pages/ResetPassword.jsx`
- `learning/src/pages/Navigation.jsx`

## Routing

The app now uses `react-router-dom` to define the following routes:

- `/` → `Home`
- `/about` → `About`
- `/products` → `Products`
- `/blog` → `Blog`
- `/blog/add` → `Add Blog`
- `/login` → `Login`
- `/reset-password` → `Reset Password`

Routing is enabled in `learning/src/main.jsx` by wrapping `<App />` with `<BrowserRouter>`.

## Authentication and user info

The app now stores a simple authenticated user profile using `AuthContext`. When login succeeds, the app:

- saves the user email and name
- stores the returned token
- redirects to `/`
- displays user information on the `Home` page

## Blog behavior

Blog management now supports:

- fetching posts from a placeholder API
- mapping blog posts into a table
- viewing one record in a popup modal
- editing an existing post in the modal
- deleting a post from the list
- adding a post using `AddBlog.jsx`

The blog state is provided by `BlogContext` in `learning/src/BlogContext.jsx`.

## Comments

Each page has inline comments explaining the component purpose and navigation structure.
