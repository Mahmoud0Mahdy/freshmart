import { Card } from '../../../components/ui/card';
import { UserCheck, Layers, Package } from 'lucide-react';

export function DashboardDetails({ users, categories, counts, loading }: any) {
  // ─── Users Logic ──────────────────────────────────────────────────────────
  const activeUsers = users.filter((u: any) => u.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const totalUsers = users.length;
  const activePercent = totalUsers ? (activeUsers / totalUsers) * 100 : 0;
  const inactivePercent = totalUsers ? (inactiveUsers / totalUsers) * 100 : 0;

  // ─── Categories Logic ─────────────────────────────────────────────────────
  const productCats = categories.filter((c: any) => c.type === 2).length;
  const recipeCats = categories.filter((c: any) => c.type === 1).length;
  const totalCats = categories.length;
  const productPercent = totalCats ? (productCats / totalCats) * 100 : 0;
  const recipePercent = totalCats ? (recipeCats / totalCats) * 100 : 0;

  if (loading) {
    return (
      <div className="da-details-grid">
        <Card className="p-6 h-72 animate-pulse bg-gray-50 border-0"></Card>
        <Card className="p-6 h-72 animate-pulse bg-gray-50 border-0"></Card>
        <Card className="p-6 h-72 animate-pulse bg-gray-50 border-0"></Card>
      </div>
    );
  }

  return (
    <div className="da-details-grid">
      
      {/* ================= USER ENGAGEMENT ================= */}
      <Card className="p-6 flex flex-col justify-between border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div>
          <div className="da-card-header">
            <div className="p-2 bg-green-50 rounded-lg text-green-600"><UserCheck size={20} /></div>
            User Engagement
          </div>
          
          <div className="da-progress-wrap">
            <div className="da-progress-header">
              <span className="text-gray-600">Active Accounts</span>
              <span className="text-green-600">{activePercent.toFixed(0)}%</span>
            </div>
            <div className="da-progress-bar"><div className="da-progress-fill bg-green-500" style={{width: `${activePercent}%`}}></div></div>
          </div>
          
          <div className="da-progress-wrap">
            <div className="da-progress-header">
              <span className="text-gray-600">Inactive Accounts</span>
              <span className="text-red-600">{inactivePercent.toFixed(0)}%</span>
            </div>
            <div className="da-progress-bar"><div className="da-progress-fill bg-red-500" style={{width: `${inactivePercent}%`}}></div></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-green-50/50 p-3 rounded-xl text-center border border-green-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-1">Active</p>
              <p className="text-xl font-bold text-gray-900">{activeUsers}</p>
            </div>
            <div className="bg-red-50/50 p-3 rounded-xl text-center border border-red-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-600 mb-1">Inactive</p>
              <p className="text-xl font-bold text-gray-900">{inactiveUsers}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* ================= CATEGORIES OVERVIEW ================= */}
      <Card className="p-6 flex flex-col justify-between border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div>
          <div className="da-card-header">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Layers size={20} /></div>
            Categories
          </div>
          
          <div className="da-progress-wrap">
            <div className="da-progress-header">
              <span className="text-gray-600">Products</span>
              <span className="text-blue-600">{productPercent.toFixed(0)}%</span>
            </div>
            <div className="da-progress-bar"><div className="da-progress-fill bg-blue-500" style={{width: `${productPercent}%`}}></div></div>
          </div>
          
          <div className="da-progress-wrap">
            <div className="da-progress-header">
              <span className="text-gray-600">Recipes</span>
              <span className="text-orange-600">{recipePercent.toFixed(0)}%</span>
            </div>
            <div className="da-progress-bar"><div className="da-progress-fill bg-orange-500" style={{width: `${recipePercent}%`}}></div></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-blue-50/50 p-3 rounded-xl text-center border border-blue-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">Products</p>
              <p className="text-xl font-bold text-gray-900">{productCats}</p>
            </div>
            <div className="bg-orange-50/50 p-3 rounded-xl text-center border border-orange-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-1">Recipes</p>
              <p className="text-xl font-bold text-gray-900">{recipeCats}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* ================= QUICK INVENTORY ================= */}
      <Card className="p-6 flex flex-col border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="da-card-header">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Package size={20} /></div>
          Inventory Overview
        </div>
        
        <div className="space-y-3 mt-4 flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Total Products</span>
            <span className="text-xl font-black text-gray-900">{counts.products}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Total Recipes</span>
            <span className="text-xl font-black text-gray-900">{counts.recipes}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Total Posts</span>
            <span className="text-xl font-black text-gray-900">{counts.posts}</span>
          </div>
        </div>
      </Card>

    </div>
  );
}