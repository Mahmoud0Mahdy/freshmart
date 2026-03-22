import { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Clock, Users, ChefHat, Sparkles, ZoomIn, X } from 'lucide-react';
import type { Recipe } from '../types';

export function RecipeDetailHeader({ recipe }: { recipe: Recipe }) {
  // 1. State للتحكم في تكبير وتصغير الصورة
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const difficultyColor = 
    recipe.difficulty === 'Easy' ? 'bg-green-500' :
    recipe.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-6">
      
      {/* كارت الصورة الأساسي */}
      <Card className="border-0 overflow-hidden p-0 shadow-lg rounded-2xl">
        <div 
          style={{ height: "420px" }} 
          // 2. ضفنا cursor-pointer وحدث الضغط onClick
          className="relative w-full overflow-hidden border border-gray-100 rounded-2xl bg-white cursor-pointer group"
          onClick={() => setIsImageExpanded(true)}
        >
          
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            // ضفنا تأثير zoom خفيف لما يقف بالماوس
            className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-4 left-4">
            <Badge className={`${difficultyColor} text-white px-3 py-1 shadow-md border-0`}>
              <ChefHat size={14} className="mr-1.5" />
              {recipe.difficulty}
            </Badge>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-xl text-green-600 shadow-inner border border-white/50">
            <Sparkles size={18} />
          </div>

          {/* 3. تأثير يظهر عند الوقوف بالماوس ليوضح إمكانية التكبير */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-white/95 text-gray-800 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-xl backdrop-blur-sm">
              <ZoomIn size={28} className="text-gray-700" />
            </div>
          </div>

        </div>
      </Card>

      {/* كارت بيانات الوصفة (كما هو لم يتغير) */}
      <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white">
        <CardContent className="p-6 md:p-8">
          <Badge variant="outline" className="mb-3 capitalize text-green-700 border-green-200 bg-green-50 font-medium">
            {recipe.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium border-t border-gray-100 pt-6">
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-gray-400" />
              <span>Cooking:</span>
              <span className="font-bold text-gray-900 ml-1.5">{recipe.time}</span>
            </div>
            <div className="flex items-center">
              <Users size={20} className="mr-2 text-gray-400" />
              <span>Serves:</span>
              <span className="font-bold text-gray-900 ml-1.5">{recipe.servings} people</span>
            </div>
            <div className="flex items-center">
              <ChefHat size={20} className="mr-2 text-gray-400" />
              <span>Level:</span>
              <span className={`font-bold ml-1.5 ${
                recipe.difficulty === 'Easy' ? 'text-green-600' :
                recipe.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>{recipe.difficulty}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. الـ Modal (الشاشة السوداء لتكبير الصورة) */}
      {isImageExpanded && (
        <div 
          // z-[100] عشان تغطي على الـ Header اللي واخد z-50
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setIsImageExpanded(false)} // لو داس في أي حتة تقفل
        >
          {/* زرار إغلاق (X) توضيحي */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors"
          >
            <X size={32} />
          </button>

          {/* الصورة المكبرة */}
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            // object-contain عشان الصورة تبان كاملة بدون قص
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
          />
        </div>
      )}

    </div>
  );
}