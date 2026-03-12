import { Card } from '../../../components/ui/card';
import type { User } from '../../../contexts/AppContext';

interface UserStatsProps {
  users: User[];
}

export function UserStats({ users }: UserStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Total Users</p>
        <p className="text-2xl">{users.length}</p>
      </Card>
      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Active Users</p>
        <p className="text-2xl text-green-600">{users.filter(u => u.isActive).length}</p>
      </Card>
      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Inactive Users</p>
        <p className="text-2xl text-red-600">{users.filter(u => !u.isActive).length}</p>
      </Card>
    </div>
  );
}