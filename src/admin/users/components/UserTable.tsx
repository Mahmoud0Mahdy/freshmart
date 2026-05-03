import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../../../contexts/AppContext";

import { updateUserStatus } from "../../../api/adminApi";

export function UserTable({ users, onRefresh }) {
  const { state } = useApp();

  const handleToggleStatus = async (userId, currentStatus) => {
    if (userId === state.user?.id) {
      toast.error("Cannot modify your own account status");
      return;
    }

    try {
      await updateUserStatus(userId, !currentStatus);

      toast.success(`User is now ${!currentStatus ? "Active" : "Inactive"}`);

      onRefresh(); // 🔥 نعمل reload للداتا
    } catch {
      toast.error("Failed to update user status");
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4 font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </td>

                <td className="px-6 py-4">
                  <Badge variant={user.isActive ? "default" : "destructive"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(user.id, user.isActive)}
                    disabled={user.id === state.user?.id}
                  >
                    {user.isActive ? (
                      <ShieldOff className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
