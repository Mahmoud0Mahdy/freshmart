import { Card } from '../../../components/ui/card';
import { UserCheck, Layers } from 'lucide-react';

interface DashboardDetailsProps {
  state: any;
  users: any[];
}

export function DashboardDetails({ state, users }: DashboardDetailsProps) {

  const products = state?.products || [];
  const recipes = state?.recipes || [];
  const posts = state?.communityPosts || [];
  const categories = state.categories || [];

  const isLoading = users.length === 0 && categories.length === 0;

  // ================= USERS =================
  const activeUsers = users.filter((u: any) => u.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const totalUsers = users.length;

  const activePercentage =
    totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

  const inactivePercentage =
    totalUsers > 0 ? (inactiveUsers / totalUsers) * 100 : 0;

  // ================= CATEGORIES =================
  const productCategories = categories.filter((c: any) => c.type === 2).length;
  const recipeCategories = categories.filter((c: any) => c.type === 1).length;
  const totalCategories = categories.length;

  const productPercentage =
    totalCategories > 0 ? (productCategories / totalCategories) * 100 : 0;

  const recipePercentage =
    totalCategories > 0 ? (recipeCategories / totalCategories) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ================= USER ENGAGEMENT ================= */}
      <Card className="p-6 lg:col-span-1 flex flex-col justify-between">

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                User Engagement
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Active vs Inactive account ratio
              </p>

              <div className="space-y-6">

                {/* Active */}
                <div>
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span className="text-gray-600">Active Accounts</span>
                    <span className="text-green-600">
                      {activePercentage.toFixed(0)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${activePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Inactive 🔥 */}
                <div>
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span className="text-gray-600">Inactive Accounts</span>
                    <span className="text-red-600">
                      {inactivePercentage.toFixed(0)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: `${inactivePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Numbers */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-green-50 p-3 rounded-xl text-center">
                    <p className="text-xs text-green-600 font-bold">Active</p>
                    <p className="text-xl font-bold">{activeUsers}</p>
                  </div>

                  <div className="bg-red-50 p-3 rounded-xl text-center">
                    <p className="text-xs text-red-600 font-bold">Inactive</p>
                    <p className="text-xl font-bold">{inactiveUsers}</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between text-sm font-bold">
                <span>Total Registered</span>
                <span>{totalUsers}</span>
              </div>
            </div>
          </>
        )}

      </Card>

      {/* ================= CATEGORIES OVERVIEW ================= */}
      <Card className="p-6 lg:col-span-1">

        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Categories Overview
        </h3>

        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Product Progress */}
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span className="text-gray-600">Product Categories</span>
                <span className="text-blue-600">
                  {productPercentage.toFixed(0)}%
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${productPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Recipe Progress 🔥 */}
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span className="text-gray-600">Recipe Categories</span>
                <span className="text-orange-600">
                  {recipePercentage.toFixed(0)}%
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full"
                  style={{ width: `${recipePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Boxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-center">
                <p className="text-xs text-blue-600 font-bold">Product</p>
                <p className="text-xl font-bold">{productCategories}</p>
              </div>

              <div className="bg-orange-50 p-3 rounded-xl text-center">
                <p className="text-xs text-orange-600 font-bold">Recipe</p>
                <p className="text-xl font-bold">{recipeCategories}</p>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t flex justify-between text-sm font-bold">
              <span>Total Categories</span>
              <span>{totalCategories}</span>
            </div>

          </div>
        )}

      </Card>

      {/* ================= INVENTORY ================= */}
      <Card className="p-6 lg:col-span-1">

        <h3 className="text-lg font-bold mb-6">Quick Inventory</h3>

        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="space-y-4">

            <div className="flex justify-between p-4 bg-blue-50 rounded">
              <span>In Stock</span>
              <span>{products.filter((p: any) => p.inStock).length}</span>
            </div>

            <div className="flex justify-between p-4 bg-orange-50 rounded">
              <span>Recipes</span>
              <span>{recipes.length}</span>
            </div>

            <div className="flex justify-between p-4 bg-purple-50 rounded">
              <span>Posts</span>
              <span>{posts.length}</span>
            </div>

          </div>
        )}

      </Card>

    </div>
  );
}