import { Card } from "../../../components/ui/card";
import { FileText, Clock, CheckCircle2, XCircle, Heart } from "lucide-react";
import "../components/posts-admin.css"; // ✅ عدّل المسار حسب مشروعك

enum PostStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Deleted = 3,
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

  const totalVotes    = posts.reduce((acc, p) => acc + (p.votes ?? p.upvotes ?? p.voteCount ?? 0), 0);
  const pendingCount  = posts.filter((p) => parseStatus(p.status ?? p.postStatus ?? p.safeStatus) === PostStatus.Pending).length;
  const acceptedCount = posts.filter((p) => parseStatus(p.status ?? p.postStatus ?? p.safeStatus) === PostStatus.Accepted).length;
  const rejectedCount = posts.filter((p) => parseStatus(p.status ?? p.postStatus ?? p.safeStatus) === PostStatus.Rejected).length;

  return (
    <div className="ps-stats-wrapper">

      {/* ── Top: Total Posts (single wide card) ── */}
      <Card className="ps-total-card">
        <div className="ps-total-icon">
          <FileText size={22} />
        </div>
        <p className="ps-total-label">TOTAL POSTS</p>
        <p className="ps-total-value">{posts.length}</p>
      </Card>

      {/* ── Bottom: 4 status cards ── */}
      <div className="ps-mini-grid">

        <Card className="ps-mini-card">
          <div className="ps-mini-icon ps-mini-icon--orange">
            <Clock size={18} />
          </div>
          <p className="ps-mini-value ps-mini-value--orange">{pendingCount}</p>
          <p className="ps-mini-label">PENDING</p>
        </Card>

        <Card className="ps-mini-card">
          <div className="ps-mini-icon ps-mini-icon--rose">
            <Heart size={18} />
          </div>
          <p className="ps-mini-value ps-mini-value--rose">{totalVotes}</p>
          <p className="ps-mini-label">TOTAL SAVES</p>
        </Card>

        <Card className="ps-mini-card">
          <div className="ps-mini-icon ps-mini-icon--green">
            <CheckCircle2 size={18} />
          </div>
          <p className="ps-mini-value ps-mini-value--green">{acceptedCount}</p>
          <p className="ps-mini-label">ACCEPTED</p>
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
