import { Card } from "../../../components/ui/card";
import type { Recipe } from "../../../contexts/AppContext";
import { 
  UtensilsCrossed, 
  ChefHat, 
  Activity, 
  Flame,
  TrendingUp,
  Zap,
  Award
} from "lucide-react";
import "../components/recipes-admin.css";

interface RecipeStatsProps {
  recipes: Recipe[];
}

export function RecipeStats({ recipes }: RecipeStatsProps) {
  const getDiff = (r: any) =>
    (r.difficultyLevel || r.difficulty || "").toLowerCase().trim();

  const total = recipes?.length || 0;

  const easy = recipes?.filter((r) => getDiff(r) === "easy").length || 0;
  const intermediate = recipes?.filter((r) => getDiff(r) === "intermediate").length || 0;
  const medium = recipes?.filter((r) => getDiff(r) === "medium").length || 0;
  const advanced = recipes?.filter((r) => getDiff(r) === "advanced").length || 0;
  const hard = recipes?.filter((r) => getDiff(r) === "hard").length || 0;
  const expert = recipes?.filter((r) => getDiff(r) === "expert").length || 0;

  return (
    <div className="rs-stats-wrapper">
      {/* Top Card */}
      <Card className="rs-total-card">
        <div className="rs-total-icon">
          <UtensilsCrossed size={22} />
        </div>
        <p className="rs-total-label">TOTAL RECIPES</p>
        <p className="rs-total-value">{total}</p>
      </Card>

      {/* All Difficulty Cards Unified Grid */}
      <div className="rs-mini-grid">
        {/* Row 1 */}
        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--green">
            <ChefHat size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--green">{easy}</p>
          <p className="rs-mini-label">EASY</p>
        </Card>

        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--blue">
            <TrendingUp size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--blue">{intermediate}</p>
          <p className="rs-mini-label">INTERMEDIATE</p>
        </Card>

        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--orange">
            <Activity size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--orange">{medium}</p>
          <p className="rs-mini-label">MEDIUM</p>
        </Card>

        {/* Row 2 */}
        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--indigo">
            <Zap size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--indigo">{advanced}</p>
          <p className="rs-mini-label">ADVANCED</p>
        </Card>

        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--red">
            <Flame size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--red">{hard}</p>
          <p className="rs-mini-label">HARD</p>
        </Card>

        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--purple">
            <Award size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--purple">{expert}</p>
          <p className="rs-mini-label">EXPERT</p>
        </Card>
      </div>
    </div>
  );
}