import React, {useContext} from 'react'
import {Link} from 'gatsby'
import {Button} from 'semantic-ui-react'
import ShoppingCartIcon from '../Header/ShoppingCartIcon'
import CartContext from '../Context/CartContext'

const FloatCartInfo = () => {
  const {cartCount} = useContext(CartContext)
  return (
    <div
      style={{position: 'fixed', bottom: '50px', right: '5%', zIndex: '999'}}
    >
      <Button as={Link} to="/cart" circular color="orange">
        <ShoppingCartIcon cartCount={cartCount} name={''}></ShoppingCartIcon>
      </Button>
    </div>
  )
}

export default FloatCartInfo
