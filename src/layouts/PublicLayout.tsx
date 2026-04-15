import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingChatbot } from '../pages/chatbot/components/FloatingChatbot'; 

export function PublicLayout() {
  const location = useLocation();
  const showFooter = !['/checkout', '/login'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {showFooter && <Footer />}
      
      <FloatingChatbot /> 
    </div>
  );
}