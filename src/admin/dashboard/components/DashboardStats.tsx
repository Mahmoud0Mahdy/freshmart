import { Card } from '../../../components/ui/card';
import { Users, Package, UtensilsCrossed, MessageSquare, TrendingUp } from 'lucide-react';

// شيلنا الإمبورت بتاع AppState واستخدمنا any
interface DashboardStatsProps {
  state: any;
}

export function DashboardStats({ state }: DashboardStatsProps) {
  const stats = [
    { title: 'Total Users', value: state.users.length, icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Products', value: state.products.length, icon: Package, color: 'bg-green-500', change: '+8%' },
    { title: 'Total Recipes', value: state.recipes.length, icon: UtensilsCrossed, color: 'bg-orange-500', change: '+15%' },
    { title: 'Community Posts', value: state.communityPosts.length, icon: MessageSquare, color: 'bg-purple-500', change: '+23%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6 transition-all hover:shadow-md">
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
          </Card>
        );
      })}
    </div>
  );
}