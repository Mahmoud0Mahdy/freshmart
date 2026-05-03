import { Card } from '../../../components/ui/card';
import { Users, Package, UtensilsCrossed, MessageSquare, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  state: any;
  users: any[]; // 👈 جديد
}

export function DashboardStats({ state, users }: DashboardStatsProps) {

  const isLoading = users.length === 0;

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500', change: '+12%' }, // ✅ هنا
    { title: 'Total Products', value: state?.products?.length || 0, icon: Package, color: 'bg-green-500', change: '+8%' },
    { title: 'Total Recipes', value: state?.recipes?.length || 0, icon: UtensilsCrossed, color: 'bg-orange-500', change: '+15%' },
    { title: 'Community Posts', value: state?.communityPosts?.length || 0, icon: MessageSquare, color: 'bg-purple-500', change: '+23%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6 transition-all hover:shadow-md">

            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-1 font-medium bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>

                <h3 className="text-gray-500 font-medium text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </>
            )}

          </Card>
        );
      })}
    </div>
  );
}