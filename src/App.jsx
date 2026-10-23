import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Authentication from "./pages/Authentication"
import Products from "./pages/Products"
import Home from "./pages/Home"

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/authenticate" element={<Authentication/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App