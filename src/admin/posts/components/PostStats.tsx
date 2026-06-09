import { Card } from "../../../components/ui/card";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import "../components/posts-admin.css";

enum PostStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

interface PostStatsProps {
  posts: any[];
}

export function PostStats({ posts }: PostStatsProps) {
  const parseStatus = (raw: any): PostStatus => {
    if (typeof raw === "number") return raw as PostStatus;
    if (typeof raw === "string") {
      const n = parseInt(raw, 10);
      if (!isNaN(n)) return n as PostStatus;
    }
    return PostStatus.Pending;
  };

  const pendingCount  = posts.filter((p) => parseStatus(p.status ?? p.postStatus ?? p.safeStatus) === PostStatus.Pending).length;
  const approvedCount = posts.filter((p) => parseStatus(p.status ?? p.postStatus ?? p.safeStatus) === PostStatus.Approved).length;
  const rejectedCount = posts.filter((p) => parseStatus(p.status ?? p.postStatus ?? p.safeStatus) === PostStatus.Rejected).length;

  return (
    <div className="ps-stats-wrapper">
      {/* ── Top: Total Posts ── */}
      <Card className="ps-total-card">
        <div className="ps-total-icon">
          <FileText size={22} />
        </div>
        <p className="ps-total-label">TOTAL POSTS</p>
        <p className="ps-total-value">{posts.length}</p>
      </Card>

      {/* ── Bottom: 3 status cards ── */}
      <div className="ps-mini-grid">
        <Card className="ps-mini-card">
          <div className="ps-mini-icon ps-mini-icon--orange">
            <Clock size={18} />
          </div>
          <p className="ps-mini-value ps-mini-value--orange">{pendingCount}</p>
          <p className="ps-mini-label">PENDING</p>
        </Card>

        <Card className="ps-mini-card">
          <div className="ps-mini-icon ps-mini-icon--green">
            <CheckCircle2 size={18} />
          </div>
          <p className="ps-mini-value ps-mini-value--green">{approvedCount}</p>
          <p className="ps-mini-label">APPROVED</p>
        </Card>

        <Card className="ps-mini-card">
          <div className="ps-mini-icon ps-mini-icon--red">
            <XCircle size={18} />
          </div>
          <p className="ps-mini-value ps-mini-value--red">{rejectedCount}</p>
          <p className="ps-mini-label">REJECTED</p>
        </Card>
      </div>
    </div>
  );
}