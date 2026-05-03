import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

import { getUserAccount, updateUserAccount } from "../../api/userProfileApi";

export default function EditAccountModal({ isOpen, onClose, onUpdated }) {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const data = await getUserAccount();
      setForm(data);
    } catch {
      toast.error("Failed to load account data");
    }
  };

  const handleSave = async () => {
    try {
      await updateUserAccount({
        firstName: form.firstName,
        lastName: form.lastName
      });

      toast.success("Account updated");
      onUpdated();
      onClose();

    } catch {
      toast.error("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Edit Account
        </h2>

        <div className="space-y-4">

          <div>
            <Label className="mb-1 block">First Name</Label>
            <Input
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <Label className="mb-1 block">Last Name</Label>
            <Input
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <Label className="mb-1 block">Email</Label>
            <Input value={form.email} disabled />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save
          </Button>

        </div>

      </div>

    </div>
  );
}