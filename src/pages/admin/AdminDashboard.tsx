import { useState } from 'react';
import { AlertCircle, BarChart3, CircleDollarSign, Link2, Menu } from 'lucide-react';
import { ProductApprovals } from '@/components/admin/ProductApprovals';
import { LinkManagement } from '@/components/admin/LinkManagement';
import { Analytics } from '@/components/admin/Analytics';

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState('approvals');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentSection) {
      case 'approvals':
        return <ProductApprovals />;
      case 'links':
        return <LinkManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <ProductApprovals />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b p-4 z-50">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed top-0 left-0 h-full w-64 bg-white border-r transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        
        <nav className="mt-2">
          <button
            onClick={() => {
              setCurrentSection('approvals');
              setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentSection === 'approvals' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CircleDollarSign className="h-5 w-5 mr-3" />
            Product Approvals
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('links');
              setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentSection === 'links' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Link2 className="h-5 w-5 mr-3" />
            Link Management
          </button>
          
          <button
            onClick={() => {
              setCurrentSection('analytics');
              setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentSection === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="h-5 w-5 mr-3" />
            Analytics
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen ${isMobileSidebarOpen ? 'blur-sm' : ''}`}>
        <div className="p-6 mt-16 lg:mt-0">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;