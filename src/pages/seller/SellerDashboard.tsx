import { useState } from 'react';
import { Activity, CreditCard, Menu, Package, PlusCircle } from 'lucide-react';
import { MyProducts } from '@/components/seller/MyProducts';
import { AddNewProduct } from '@/components/seller/AddNewProduct';
import { PaymentHistory } from '@/components/seller/PaymentHistory';
import { Analytics } from '@/components/seller/Analytics';

const SellerDashboard = () => {
  const [currentSection, setCurrentSection] = useState('products');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentSection) {
      case 'products':
        return <MyProducts />;
      case 'add':
        return <AddNewProduct />;
      case 'payments':
        return <PaymentHistory />;
      case 'analytics':
        return <Analytics />;
      default:
        return <MyProducts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu */}
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
          <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your products</p>
        </div>

        <nav className="mt-2">
          <button
            onClick={() => {
              setCurrentSection('products');
              setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentSection === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package className="h-5 w-5 mr-3" />
            My Products
          </button>

          <button
            onClick={() => {
              setCurrentSection('add');
              setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentSection === 'add' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <PlusCircle className="h-5 w-5 mr-3" />
            Add New
          </button>

          <button
            onClick={() => {
              setCurrentSection('payments');
              setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${
              currentSection === 'payments' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            Payments
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
            <Activity className="h-5 w-5 mr-3" />
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

      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SellerDashboard;