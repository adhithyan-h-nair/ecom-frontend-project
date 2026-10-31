import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForward, IoShieldOutline, IoReloadOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { LuBadgeCheck } from "react-icons/lu";
import ProductContext from "../contexts/ProductContext";
import Card from "../components/Card";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

const Home = () => {
  const navigate = useNavigate();
  const { products, fetchData } = useContext(ProductContext);
  const { currentUser } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchData();
    }
  }, [products, fetchData]);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      navigate("/authenticate");
      return;
    }
    addToCart(product, currentUser.id);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50/60 via-indigo-50/30 to-white">

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Curated Essentials for Everyday Living
          </h1>
          <p className="mt-4 sm:mt-5 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Discover thoughtfully designed essentials curated for modern lifestyles. Timeless
            fashion, premium accessories, and precision electronics crafted for everyday
            durability.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-8">
            <button
              onClick={() => navigate("/products")}
              className="bg-[#2D22C6] hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
            >
              <span>Shop Collection</span>
              <IoArrowForward size={18} />
            </button>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#EBF0FE] hover:bg-indigo-100 text-slate-800 font-medium px-6 py-3 rounded-xl cursor-pointer transition-all active:scale-95"
            >
              Explore Categories
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 sm:mt-20">

          <div className="flex items-center gap-3.5 bg-[#EEF4FE]/80 border border-indigo-100/60 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-12 h-12 shrink-0 bg-[#D1F0E6] rounded-xl flex items-center justify-center text-[#0D9488]">
              <TbTruckDelivery size={24} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                Complimentary Delivery
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                On all orders over $75
              </p>
            </div>
          </div>


          <div className="flex items-center gap-3.5 bg-[#EEF4FE]/80 border border-indigo-100/60 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-12 h-12 shrink-0 bg-[#E0E7FE] rounded-xl flex items-center justify-center text-[#4F46E5]">
              <LuBadgeCheck size={22} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                Ethically Sourced
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                Certified sustainable goods
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#EEF4FE]/80 border border-indigo-100/60 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-12 h-12 shrink-0 bg-[#EFE8DD] rounded-xl flex items-center justify-center text-[#785434]">
              <IoReloadOutline size={22} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                Easy 30-Day Returns
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                Hassle-free guarantee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#EEF4FE]/80 border border-indigo-100/60 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-12 h-12 shrink-0 bg-[#D1F0E6] rounded-xl flex items-center justify-center text-[#0D9488]">
              <IoShieldOutline size={22} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                Secure Checkout
              </h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5 truncate">
                256-bit encrypted payments
              </p>
            </div>
          </div>
        </div>
      </section>

      {products && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-16">
          <div className="flex items-center justify-between mb-8 border-t border-slate-200/60 pt-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Collection</h2>
              <p className="text-slate-500 text-sm mt-1">Trending picks selected for you this week</p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <IoArrowForward size={16} />
            </button>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.slice(0, 5).map((product) => (
              <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
