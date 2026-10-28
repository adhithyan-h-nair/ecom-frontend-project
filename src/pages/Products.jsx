import { useContext, useEffect } from "react"
import Card from "../components/Card"
import Search from "../components/Search"
import ProductContext from "../contexts/ProductContext"

const Products = () => {
  const {products, fetchData} = useContext(ProductContext)
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className="w-full">
        <div className=" max-w-md mx-auto p-3"><Search/></div>
        <div className="grid gap-3 p-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {
            products.map((product)=>{
              return <Card key={product.id} product={product}/>
            })
          }
        </div>
    </div>
  )
}

export default Products