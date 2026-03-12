import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export function AdminLayout() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen text-gray-900 flex">
      
      {/* 1. القائمة الجانبية ثابتة في الشمال */}
      <Sidebar />
      
      {/* 2. المحتوى اليمين - زقيناه إجباري 256 بيكسل عشان مايدخلش تحت الـ Sidebar */}
      <div 
        className="flex-1 flex flex-col min-h-screen w-full"
        style={{ marginLeft: '256px' }} 
      >
        <Header />
        
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

    </div>
  );
}