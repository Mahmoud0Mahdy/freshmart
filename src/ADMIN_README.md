# Admin Dashboard Documentation

## Admin Credentials

To access the Admin Dashboard, use the following credentials:

**Email:** admin@smartsupermarket.com  
**Password:** admin123

## Features

### 1. Dashboard Overview
- Total users, products, recipes, and community posts statistics
- Quick action buttons to navigate to different management sections
- User status breakdown (active/inactive)
- System overview with engagement metrics

### 2. User Management
- View all registered users
- Search users by name or email
- See user roles (admin/user) and account status
- Delete user accounts
- Toggle user status (activate/deactivate)
- Protection against self-deletion/modification

### 3. Product Management
- Add new products with full details
- Edit existing products
- Delete products from inventory
- Search and filter products
- View product statistics (in stock/out of stock)
- Manage product categories and nutrition information

### 4. Recipe Management
- Create new recipes with ingredients and instructions
- Edit existing recipes
- Delete recipes
- Organize by category and difficulty level
- View recipe statistics by difficulty
- Search and filter recipes

### 5. Community Moderation
- View all community posts
- Search posts by title, content, or author
- Delete inappropriate posts
- View engagement metrics (likes, comments)
- Monitor post activity

## Access Control

- Only users with the "admin" role can access admin routes
- Admin shield icon appears in the header for admin users
- Non-admin users cannot see or access admin features
- Self-protection prevents admins from deleting/deactivating their own accounts

## Data Management

All data is managed through the global context state, including:
- Products
- Recipes
- Users
- Community Posts

Changes are reflected immediately across the application.

## Navigation

Admin pages include:
- `/admin-dashboard` - Main admin dashboard
- `/admin-users` - User management
- `/admin-products` - Product management
- `/admin-recipes` - Recipe management
- `/admin-posts` - Community moderation

All admin pages include a back button to navigate to the dashboard.
