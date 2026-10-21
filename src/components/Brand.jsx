import { FaShopify } from "react-icons/fa";

const Brand = () => {
  return (
    <div className="brand flex gap-2 items-center">
      <div className="w-fit p-2 rounded-lg bg-indigo-600">
        <FaShopify size={24} color="white" />
      </div>
      <div className="text-xl font-bold">
        <span>
          Shop<span className="text-indigo-600">Ease</span>
        </span>
      </div>
    </div>
  );
};

export default Brand;
