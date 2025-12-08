import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Package, 
  Droplets, 
  Wifi, 
  Battery,
  ChevronRight,
  CreditCard,
  Trash2,
  Cpu,
  Activity
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface DashboardProps {
  onLogout: () => void;
  initialTab?: 'overview' | 'orders' | 'cart' | 'support';
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'cart' | 'support'>(initialTab);
  const { cartCount } = useCart();

  useEffect(() => {
    if(initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const menuItems = [
    { id: 'overview', label: 'System Status', icon: <LayoutDashboard size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
    { id: 'cart', label: 'My Cart', icon: <ShoppingCart size={20} />, badge: cartCount },
    { id: 'support', label: 'Help & Feedback', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 flex">
      {/* Sidebar */}
      <aside className="w-64 fixed h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col z-10">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-forest-100 dark:bg-forest-900 flex items-center justify-center text-forest-600 font-bold">
              JD
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">John Doe</h3>
              <p className="text-xs text-slate-500">System V3.1</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-forest-500 text-white shadow-lg shadow-forest-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                 {item.icon}
                 <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-white text-forest-600' : 'bg-forest-500 text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'cart' && <CartTab />}
            {activeTab === 'support' && <SupportTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- Sub-Components for Tabs ---

const OverviewTab = () => (
  <div className="space-y-6">
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Status</h1>
        <p className="text-slate-500 dark:text-slate-400">Arduino Controller Online. 3 Active Zones.</p>
      </div>
      <div className="text-right hidden sm:block">
        <div className="text-sm text-slate-400">Main Tank Level</div>
        <div className="text-2xl font-bold text-blue-500">8.5 Liters <span className="text-sm text-slate-500 font-normal">/ 10L</span></div>
      </div>
    </header>

    {/* Main Tank Card */}
    <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-500/10 transform skew-x-12"></div>
        <div className="relative z-10 flex justify-between items-center">
             <div>
                <h3 className="text-blue-200 font-medium mb-1 flex items-center gap-2"><Droplets size={18}/> Water Reserve</h3>
                <p className="text-3xl font-bold">85% Full</p>
                <p className="text-xs text-blue-300 mt-2">Est. 12 days autonomy remaining</p>
             </div>
             <div className="h-16 w-16 rounded-full border-4 border-blue-400/30 flex items-center justify-center">
                 <div className="h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
             </div>
        </div>
    </div>

    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Zone Control (Valves)</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { name: 'Zone 1: Monstera', moisture: 42, status: 'Closed', valveColor: 'text-slate-500' },
        { name: 'Zone 2: Herbs', moisture: 18, status: 'OPEN', valveColor: 'text-green-500 animate-pulse' },
        { name: 'Zone 3: Balcony', moisture: 65, status: 'Closed', valveColor: 'text-slate-500' },
      ].map((zone, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{zone.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1"><Cpu size={12}/> Auto-Mode</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold border ${zone.status === 'OPEN' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                Valve: {zone.status}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
               <div className="flex justify-between text-sm mb-1">
                 <span className="flex items-center gap-1 text-slate-500"><Activity size={14}/> Soil Moisture</span>
                 <span className={`font-mono font-bold ${zone.moisture > 30 ? 'text-slate-700 dark:text-slate-200' : 'text-red-500'}`}>{zone.moisture}%</span>
               </div>
               <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                 <div 
                    className={`h-full rounded-full transition-all duration-500 ${zone.moisture > 30 ? 'bg-forest-500' : 'bg-red-500'}`} 
                    style={{ width: `${zone.moisture}%` }}
                 />
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OrdersTab = () => (
  <div className="space-y-6">
     <header className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Order History</h1>
      <p className="text-slate-500 dark:text-slate-400">Track and manage your BloomSense purchases.</p>
    </header>

    <div className="space-y-4">
      {[
        { id: '#BLM-9001', date: 'Jan 24, 2024', total: '$149.99', status: 'Processing', items: '1x 20L System Kit (4 Zones)' },
        { id: '#BLM-8822', date: 'Dec 12, 2023', total: '$24.99', status: 'Delivered', items: '2x Extension Tubing' },
      ].map((order) => (
        <div key={order.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                 <Package className="text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                 <h4 className="font-bold text-slate-900 dark:text-white">{order.id}</h4>
                 <p className="text-sm text-slate-500">{order.items}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <p className="text-sm text-slate-500">{order.date}</p>
                <p className="font-bold text-slate-900 dark:text-white">{order.total}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'Delivered' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {order.status}
              </div>
              <ChevronRight className="text-slate-300" size={20} />
           </div>
        </div>
      ))}
    </div>
  </div>
);

const CartTab = () => {
   const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
   const shipping = 15.00; // Heavier items (Tanks)

   return (
    <div className="max-w-4xl">
       <header className="mb-8">
       <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Cart</h1>
       <p className="text-slate-500 dark:text-slate-400">{cartItems.length} items pending checkout.</p>
     </header>
     
     {cartItems.length === 0 ? (
       <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
         <ShoppingCart size={48} className="mx-auto text-slate-300 mb-4" />
         <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">Your cart is empty</h3>
         <p className="text-slate-500 mt-2">Build a new system to get started.</p>
       </div>
     ) : (
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
             {cartItems.map((item) => (
               <motion.div 
                 key={item.id}
                 layout
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-4"
               >
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg mix-blend-multiply dark:mix-blend-normal opacity-80" />
                  </div>
                  <div className="flex-1 py-1">
                     <div className="flex justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{item.name}</h3>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                     </div>
                     <p className="text-xs md:text-sm text-slate-500 mt-1">{item.description}</p>
                     <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                           <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >-</button>
                           <span className="px-3 text-sm font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                           <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >+</button>
                        </div>
                        <button 
                           onClick={() => removeFromCart(item.id)}
                           className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-24">
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Order Summary</h3>
                <div className="space-y-2 text-sm mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                   <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                   </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping (Large Item)</span>
                      <span>${shipping.toFixed(2)}</span>
                   </div>
                </div>
                <div className="flex justify-between font-bold text-lg mb-6 text-slate-900 dark:text-white">
                   <span>Total</span>
                   <span>${(cartTotal + shipping).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => alert("Proceeding to checkout...")}
                  className="w-full bg-forest-600 hover:bg-forest-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-forest-500/20"
                >
                   <CreditCard size={18} /> Checkout
                </button>
             </div>
          </div>
       </div>
     )}
    </div>
   );
};

const SupportTab = () => (
  <div className="max-w-2xl">
     <header className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Help & Feedback</h1>
      <p className="text-slate-500 dark:text-slate-400">Technical support for your Arduino System.</p>
    </header>

    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Support request sent! Our engineers will contact you."); }}>
         <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Topic</label>
            <select className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-forest-500 outline-none dark:text-white">
               <option>Valve Malfunction</option>
               <option>Sensor Calibration</option>
               <option>Tank Leaks</option>
               <option>Spare Parts</option>
            </select>
         </div>
         <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
            <textarea 
               rows={5}
               className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-forest-500 outline-none dark:text-white"
               placeholder="Describe your technical issue..."
            ></textarea>
         </div>
         <button type="submit" className="bg-slate-900 dark:bg-forest-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-forest-500 transition-colors">
            Submit Ticket
         </button>
      </form>
    </div>
  </div>
);

export default Dashboard;
