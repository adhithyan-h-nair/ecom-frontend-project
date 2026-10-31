import { useContext, useEffect } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import ProductContext from "../contexts/ProductContext";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products, fetchData } = useContext(ProductContext);
  const { currentUser } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      navigate("/authenticate");
      return;
    }
    addToCart(product, currentUser.id);
  };

  return (
    <div className="w-full">
      <div className="max-w-md mx-auto p-3">
        <Search />
      </div>
      <div className="grid gap-3 p-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products