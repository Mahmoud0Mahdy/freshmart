import { Card } from '../../../components/ui/card';
import { Users, Package, UtensilsCrossed, MessageSquare } from 'lucide-react';

export function DashboardStats({ usersCount, counts, loading }: any) {

  const stats = [
    { title: 'Total Users', value: usersCount, icon: Users, colorClass: 'da-icon--blue' },
    { title: 'Total Products', value: counts.products, icon: Package, colorClass: 'da-icon--green' },
    { title: 'Total Recipes', value: counts.recipes, icon: UtensilsCrossed, colorClass: 'da-icon--orange' },
    { title: 'Community Posts', value: counts.posts, icon: MessageSquare, colorClass: 'da-icon--purple' },
  ];

  return (
    <div className="da-stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="da-stat-card">
            {loading ? (
              <div className="animate-pulse flex flex-col items-center gap-3 w-full">
                <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
                <div className="h-8 w-16 bg-gray-100 rounded"></div>
                <div className="h-3 w-24 bg-gray-100 rounded"></div>
              </div>
            ) : (
              <>
                <div className={`da-stat-icon ${stat.colorClass}`}>
                  <Icon size={22} />
                </div>
                <p className="da-stat-value">{stat.value}</p>
                <p className="da-stat-title">{stat.title}</p>
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}