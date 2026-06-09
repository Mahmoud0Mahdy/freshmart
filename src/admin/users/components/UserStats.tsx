import { Card } from '../../../components/ui/card';
import type { User } from '../../../contexts/AppContext';
import { Users, UserCheck, UserX } from "lucide-react";
import "../components/users-admin.css"; // ✅ تأكد من المسار حسب مشروعك

interface UserStatsProps {
  users: User[];
}

export function UserStats({ users }: UserStatsProps) {
  const activeCount = users.filter(u => u.isActive).length;
  const inactiveCount = users.filter(u => !u.isActive).length;

  return (
    <div className="us-stats-wrapper">
      
      {/* ── Top: Total Users ── */}
      <Card className="us-total-card">
        <div className="us-total-icon">
          <Users size={22} />
        </div>
        <p className="us-total-label">TOTAL USERS</p>
        <p className="us-total-value">{users.length}</p>
      </Card>

      {/* ── Bottom: 2 Statuses ── */}
      <div className="us-mini-grid">
        
        {/* Active */}
        <Card className="us-mini-card">
          <div className="us-mini-icon us-mini-icon--green">
            <UserCheck size={18} />
          </div>
          <p className="us-mini-value us-mini-value--green">{activeCount}</p>
          <p className="us-mini-label">ACTIVE</p>
        </Card>

        {/* Inactive */}
        <Card className="us-mini-card">
          <div className="us-mini-icon us-mini-icon--red">
            <UserX size={18} />
          </div>
          <p className="us-mini-value us-mini-value--red">{inactiveCount}</p>
          <p className="us-mini-label">INACTIVE</p>
        </Card>

      </div>
    </div>
  );
}