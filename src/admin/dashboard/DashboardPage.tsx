import { useApp } from '../../contexts/AppContext';
import { DashboardStats } from './components/DashboardStats';
import { DashboardDetails } from './components/DashboardDetails';

export function DashboardPage() {
  const { state } = useApp();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Here's what's happening in your store today.</p>
      </div>

      {/* Content */}
      <DashboardStats state={state} />
      <DashboardDetails state={state} />
    </div>
  );
}