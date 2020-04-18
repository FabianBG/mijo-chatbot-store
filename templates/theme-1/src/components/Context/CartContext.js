import React from 'react'

const CartContext = React.createContext({
  products: [],
  cartCount: 0,
  addToCart: () => {},
  updateCart: () => {},
})

export default CartContext
