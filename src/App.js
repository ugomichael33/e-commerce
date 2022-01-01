import React, {useState, useEffect} from 'react'
import Products from './Components/Products'
import Navbar from './Components/Navbar/Navbar'
import { commerce } from './Lib/Commerce'
import Cart from '../Components/Cart/Cart'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
      const { data } = await commerce.products.list()

      setProducts(data)
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve()

    setCart(cart)
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)

    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  },[])
  
  console.log(cart)
  
  return (
    <div className="App">
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart}/>
    </div>
  );
}

export default App;
