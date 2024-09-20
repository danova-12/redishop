




import NavBar from "@/components/NavBar"
import { Route, Routes } from "react-router-dom"
import AddProduct from "@/components/AddProduct"
import Login from "@/pages/auth"
import Home from "@/pages/Home"
import ProductDetail from "@/pages/ProductDetail"

export default function App(){


  return(
    <main className="max-w-3xl  m-auto">
        <NavBar />
       
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />}/>
        </Routes>
        

    </main>
   
  )
}