
import { useState, useContext } from "react";
import { FaRegHeart, FaHeart, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

const Card = ({ product, onAddToCart }) => {
  const [like, setLike] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { addToCart, getUserCart } = useContext(CartContext);
  const navigate = useNavigate();

  const userCart = currentUser ? getUserCart(currentUser.id) : [];
  const isInCart = userCart.some((item) => item.id === product.id);

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      navigate("/cart");
      return;
    }
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      if (!currentUser) {
        navigate("/authenticate");
        return;
      }
      addToCart(product, currentUser.id);
    }
  };

  return (
    <div className="w-full h-full shadow-lg p-3 rounded-md flex flex-col gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="h-64 w-full flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="min-h-12">
        <h2 className="font-medium line-clamp-2">{product.title}</h2>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-bold">${product.price}</p>
        <div className="flex items-center gap-1">
          <p className="font-bold">{product.rating.rate}</p>
          <FaStarHalfAlt color="#FFDF00" />
          <span>({product.rating.count})</span>
        </div>
      </div>

      <div className="w-full flex items-center gap-2 mt-auto">
        <button
          type="button"
          onClick={handleCartClick}
          className={`flex-1 text-white py-2 rounded-lg cursor-pointer active:scale-95 transition-all font-medium ${
            isInCart
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isInCart ? "Go to cart" : "Add to cart"}
        </button>

        <button
          type="button"
          aria-label={like ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={like}
          className="cursor-pointer bg-gray-200 rounded-full flex items-center justify-center p-2"
          onClick={() => setLike((prev) => !prev)}
        >
          {like ? (
            <FaHeart color="red" size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
