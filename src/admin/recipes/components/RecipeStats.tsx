import { Card } from '../../../components/ui/card';
import type { Recipe } from '../../../contexts/AppContext';
import { UtensilsCrossed, ChefHat, Activity, Flame } from "lucide-react";
// تأكد من مسار ملف الـ CSS على حسب مكان ما حفظته
import "../components/recipes-admin.css"; 

interface RecipeStatsProps {
  recipes: Recipe[];
}

export function RecipeStats({ recipes }: RecipeStatsProps) {

  // 🔥 دالة عشان تقرا مستوى الصعوبة صح
  const getDiff = (r: any) => (r.difficultyLevel || r.difficulty || '').toLowerCase().trim();

  const total = recipes?.length || 0;
  const easy = recipes?.filter(r => getDiff(r) === 'easy').length || 0;
  const medium = recipes?.filter(r => getDiff(r) === 'medium').length || 0;
  const hard = recipes?.filter(r => getDiff(r) === 'hard').length || 0;

  return (
    <div className="rs-stats-wrapper">
      
      {/* ── Top: Total Recipes ── */}
      <Card className="rs-total-card">
        <div className="rs-total-icon">
          <UtensilsCrossed size={22} />
        </div>
        <p className="rs-total-label">TOTAL RECIPES</p>
        <p className="rs-total-value">{total}</p>
      </Card>

      {/* ── Bottom: 3 Difficulties ── */}
      <div className="rs-mini-grid">
        
        {/* Easy */}
        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--green">
            <ChefHat size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--green">{easy}</p>
          <p className="rs-mini-label">EASY</p>
        </Card>

        {/* Medium */}
        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--orange">
            <Activity size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--orange">{medium}</p>
          <p className="rs-mini-label">MEDIUM</p>
        </Card>

        {/* Hard */}
        <Card className="rs-mini-card">
          <div className="rs-mini-icon rs-mini-icon--red">
            <Flame size={18} />
          </div>
          <p className="rs-mini-value rs-mini-value--red">{hard}</p>
          <p className="rs-mini-label">HARD</p>
        </Card>

      </div>
    </div>
  );
}