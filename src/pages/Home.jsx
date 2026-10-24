import { TbTruckDelivery } from "react-icons/tb";

const Home = () => {
  return (
    <div>
      <section>
          <div>
            <h1> Curated Essentials for Everyday Living </h1>
            <p>
              Discover thoughtfully designed essentials curated for modern
              lifestyles. Timeless fashion, premium accessories, and precision
              electronics crafted for everyday durability.
            </p>
            <div>
              <button>Shop Collection - </button>
              <button>Explore Categories</button>
            </div>
          </div>
      </section>
      <section className="flex">
        <div className="flex bg-indigo-50 justify-center items-center rounded-lg p-2 gap-2">
            <div className="bg-green-200 p-2 rounded-lg">
                <TbTruckDelivery size={28} color="green"/>
            </div>
            <div className="flex flex-col">
                <p className="font-bold">Complimentary Delivery</p>
                <span className="font-light text-sm text-gray-500">On all orders over $75</span>
            </div>
        </div>
        <div>

        </div>
      </section>
    </div>
  );
};

export default Home;
