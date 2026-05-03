import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import { toast } from "sonner";
import { logoutUser } from "../../api/authApi";
import { getUserProfile } from "../../api/userProfileApi";

import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import EditAccountModal from "./EditAccountModal";

export default function ProfilePage() {

  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}

    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out");
    navigate("/login");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 relative top-[20px]">
      <div className="max-w-4xl mx-auto px-4 space-y-6" style={{ position: "relative", top: "20px" }}>

        <ProfileHeader
          user={profile}
          onLogout={handleLogout}
          onEdit={() => setOpenModal(true)}
        />

        <ProfileForm profile={profile} setProfile={setProfile} />

        <EditAccountModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onUpdated={fetchProfile}
        />

      </div>
    </div>
  );
}