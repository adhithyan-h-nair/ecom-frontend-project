import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import ProductContext from "../contexts/ProductContext";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Products = () => {
  const { products, fetchData } = useContext(ProductContext);
  const { currentUser } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      navigate("/authenticate");
      return;
    }

    addToCart(product, currentUser.id);
  };

  const productFiltering = () => {
    if (!selectedCategory) {
      return products.filter((product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    } else {
      return products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          product.category === selectedCategory
        );
      });
    }
  };

  const filteredProducts = productFiltering();
  if (sort == "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort == "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const category = [...new Set(products.map((p) => p.category))];

  return (
    <div className="">
      <div className="flex justify-center p-3 sticky top-0 z-40 bg-white">
        <Search onSearch={setSearchQuery} query={searchQuery} />
      </div>
      <div className="flex gap-2">
        <select
          defaultValue=""
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Category</option>
          {category.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select defaultValue="" onChange={(e) => setSort(e.target.value)}>
          <option value="">Select Sort</option>
          <option value="low-high">low to high</option>
          <option value="high-low">high to low</option>
        </select>
      </div>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid gap-3 p-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No products found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
