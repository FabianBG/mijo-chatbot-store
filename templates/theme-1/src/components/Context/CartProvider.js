import React, {useState, useEffect} from 'react'
import CartContext from './CartContext'

const CartProvider = ({children}) => {
  const [{products, cartCount}, setCart] = useState({
    products: [],
    cartCount: 0,
  })

  const cartID = 'cart'

  const addToCart = (product, quantity) => {
    const subTotal = (Number(quantity) * Number(product.price)).toFixed(2)
    const cartCountResult = Number(cartCount) + Number(quantity)
    const productsResult = [...products, {...product, quantity, subTotal}]
    const newCart = {
      products: productsResult,
      cartCount: cartCountResult,
    }
    localStorage.setItem(cartID, JSON.stringify(newCart))
    setCart(newCart)
  }

  const updateCart = products => {
    const newCart = {products, cartCount: products.length}
    localStorage.setItem(cartID, JSON.stringify(newCart))
    setCart(newCart)
  }

  useEffect(() => {
    const cart = localStorage.getItem(cartID)
    if (!cart) {
      const empty = {
        products: [],
        cartCount: 0,
      }
      localStorage.setItem(cartID, JSON.stringify(empty))
      setCart(empty)
    } else {
      const data = localStorage.getItem(cartID)
      const parsedData = JSON.parse(data)
      setCart(parsedData)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        products,
        cartCount,
        addToCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
