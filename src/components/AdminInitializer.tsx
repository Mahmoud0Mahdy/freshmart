import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { products, recipes, mockUsers, mockCommunityPosts } from '../data/mockData';

export function AdminInitializer() {
  const { dispatch } = useApp();

  useEffect(() => {
    // Initialize all data on app load
    dispatch({
      type: 'INIT_DATA',
      products,
      recipes,
      users: mockUsers,
      posts: mockCommunityPosts,
    });
  }, [dispatch]);

  return null;
}
