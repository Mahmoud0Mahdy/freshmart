import { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { DashboardStats } from './components/DashboardStats';
import { DashboardDetails } from './components/DashboardDetails';
import { getAllUsers, getAllCategories } from '../../api/adminApi'; // 🔥 ضفنا categories

export function DashboardPage() {
  const { state, dispatch } = useApp();

  // ✅ users من API
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 parallel requests
        const [usersData, categoriesData] = await Promise.all([
          getAllUsers(),
          getAllCategories(),
        ]);

        // ✅ users local (زي ما انت عامل)
        setUsers(usersData);

        // ✅ categories في context
        dispatch({
          type: "SET_CATEGORIES",
          categories: categoriesData,
        });

      } catch (err) {
        console.log("failed to load dashboard data", err);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Here's what's happening in your store today.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats state={state} users={users} />

      {/* Details */}
      <DashboardDetails state={state} users={users} />

    </div>
  );
}