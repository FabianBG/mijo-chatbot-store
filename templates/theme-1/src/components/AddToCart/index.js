import React, {useState, useContext} from 'react'
import {Input, Icon, Transition} from 'semantic-ui-react'
import CartContext from '../Context/CartContext'

const AddToCart = ({product, style}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)
  const {addToCart} = useContext(CartContext)

  const toggleMessage = () => {
    setVisible(true)
    setLoading(false)
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  const validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter a number for the quantity'
    if (quantity === '0') error = "Quantity can't be 0"

    return error
  }

  const handleSubmit = async () => {
    const error = validate(quantity)
    setError(error)
    if (!error) {
      setLoading(true)
      setQuantity(quantity)
      addToCart(product, quantity)
      toggleMessage()
    }
  }

  const handleChange = ({target: {value}}) => setQuantity(value)

  return (
    <div>
      <Input
        style={style}
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleChange}
        action={{
          color: 'orange',
          content: 'Add to Cart',
          icon: 'plus cart',
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      />
      {error && <div style={{color: 'red', position: 'absolute'}}>{error}</div>}
      <Transition duration={{hide: 500, show: 500}} visible={visible}>
        <div style={{color: 'green', position: 'absolute'}}>
          <Icon name="check" />
          Added to cart
        </div>
      </Transition>
    </div>
  )
}

export default AddToCart
