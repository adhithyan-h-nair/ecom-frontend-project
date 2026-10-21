import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Authentication from "./pages/Authentication"

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/authenticate" element={<Authentication/>}/>
      </Routes>
    </div>
  )
}

export default App