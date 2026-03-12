import { Card } from '../../../components/ui/card';
import { ShoppingCart, UtensilsCrossed, MessageSquare, Clock, UserCheck } from 'lucide-react';

interface DashboardDetailsProps {
  state: any;
}

export function DashboardDetails({ state }: DashboardDetailsProps) {
  const activeUsers = state.users.filter(u => u.isActive).length;
  const totalUsers = state.users.length;
  const activePercentage = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

  // جلب آخر 3 منشورات للنشاط الأخير
  const recentPosts = [...state.communityPosts].reverse().slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. User Engagement Analytics */}
      <Card className="p-6 lg:col-span-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-green-600" />
            User Engagement
          </h3>
          <p className="text-sm text-gray-500 mb-6">Active vs Inactive account ratio</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span className="text-gray-600">Active Accounts</span>
                <span className="text-green-600">{activePercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500 shadow-sm" 
                  style={{ width: `${activePercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-green-50 p-3 rounded-xl border border-green-100 text-center">
                <p className="text-xs text-green-600 font-bold uppercase">Active</p>
                <p className="text-xl font-bold text-green-700">{activeUsers}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                <p className="text-xs text-red-600 font-bold uppercase">Inactive</p>
                <p className="text-xl font-bold text-red-700">{totalUsers - activeUsers}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm font-bold text-gray-800">
            <span>Total Registered</span>
            <span className="text-lg">{totalUsers}</span>
          </div>
        </div>
      </Card>

      {/* 2. Recent Community Activity */}
      <Card className="p-6 lg:col-span-1">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <img src={post.userAvatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900 truncate">{post.title}</p>
                <p className="text-xs text-gray-500">By {post.userName} • {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          {recentPosts.length === 0 && <p className="text-sm text-gray-400 text-center py-10">No recent posts</p>}
        </div>
      </Card>

      {/* 3. Detailed Inventory Overview */}
      <Card className="p-6 lg:col-span-1">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
          Quick Inventory
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ShoppingCart className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm font-bold text-blue-900">In Stock Products</span>
            </div>
            <span className="font-bold text-blue-700 text-lg">{state.products.filter(p => p.inStock).length}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <UtensilsCrossed className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm font-bold text-orange-900">Total Recipes</span>
            </div>
            <span className="font-bold text-orange-700 text-lg">{state.recipes.length}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <MessageSquare className="w-4 h-4 text-purple-500" />
              </div>
              {/* تم تغيير العنوان هنا من Community Engagement إلى Total Posts */}
              <span className="text-sm font-bold text-purple-900">Total Posts</span>
            </div>
            <span className="font-bold text-purple-700 text-lg">
              {/* تم تغيير المنطق ليعرض طول مصفوفة المنشورات */}
              {state.communityPosts.length}
            </span>
          </div>
        </div>
      </Card>

    </div>
  );
}