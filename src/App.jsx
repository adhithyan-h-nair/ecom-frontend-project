import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Authentication from "./pages/Authentication"
import Products from "./pages/Products"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authenticate" element={<Authentication />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App