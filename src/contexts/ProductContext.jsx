import axios from "axios";
import { createContext, useState } from "react"

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, serProducts] = useState([]);
    const fetchData = async () => {
        const data = await axios.get("https://fakestoreapi.com/products")
        serProducts(data.data)
        console.log(data.data)
    }
    
    return <ProductContext.Provider value={{products, fetchData}}>
        {children}
    </ProductContext.Provider>
}

export default ProductContext