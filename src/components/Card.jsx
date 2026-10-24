import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const Card = () => {
  const [like, setLike] = useState(false)

  return (
    <div className="max-w-70 shadow-lg p-3 m-2 rounded-md flex flex-col gap-2">
      {/* <div>
        <div>
          <span>Most Popular</span>
        </div>
      </div> */}
      <div className="">
        <img
          src="https://designerbox.ai/img/ai-product-photography/electronics-gadgets/3.jpg"
          alt=""
          className="w-full object-center"
        />
      </div>
      <div>
        <h1 className="font-medium">Boat TWS Pro Max 12U1200</h1>
      </div>
      <div className="flex justify-between">
        <p className="font-bold">$21.99</p>
        <div className="flex items-center gap-1">
          <p className="font-bold">4.7</p>
          <FaStarHalfAlt color="#FFDF00"/>
        </div>
      </div>
      <div className=" w-full flex items-center justify-between gap-2">
        <button className="flex-4 bg-indigo-600 text-white py-2 rounded-lg cursor-pointer">Add to cart</button>
        <button className="cursor-pointer bg-gray-200 rounded-full flex items-center justify-center p-2"
          onClick={()=> setLike(!like)}
        >
          {
            like ? <FaHeart color="red" size={20}/> : <FaRegHeart size={20}/>   
          }
        </button>
      </div>
    </div>
  );
};

export default Card;
