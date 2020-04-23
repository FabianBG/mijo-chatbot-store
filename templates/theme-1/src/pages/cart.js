/* eslint-disable camelcase */
import React, {useState, useContext} from 'react'
import {Modal, Message} from 'semantic-ui-react'
import {useStaticQuery, graphql} from 'gatsby'
import SEO from '../components/SEO'
import CartItemList from '../components/CartItemList'
import CartSummary from '../components/CartSummary'
import CartContext from '../components/Context/CartContext'
import Layout from '../components/Layout'
import CustomerInfo from '../components/CustomerInfo'
import sendOrderToAPI from '../lib/api'

const Cart = ({location}) => {
  const {site} = useStaticQuery(graphql`
    query CartQuery {
      site {
        siteMetadata {
          siteName
        }
      }
    }
  `)
  const [loading, setLoading] = useState(false)
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [failed, setFailed] = useState(false)
  const {products, updateCart} = useContext(CartContext)

  const handleCheckout = () => {
    setCheckoutModal(true)
  }

  const handleRemoveFromCart = index => {
    const newArray = [...products]
    newArray.splice(index, 1)
    updateCart(newArray)
  }

  const handlePlaceOrder = async formData => {
    setLoading(true)
    const order = {
      ...formData,
      site: site.siteMetadata.siteName,
      products: products.map(
        ({id, name, quantity, price, currency, subTotal}) => ({
          id,
          name,
          quantity,
          price,
          currency,
          subTotal,
        }),
      ),
    }
    try {
      await sendOrderToAPI({...order})
        .then(res => res.json())
        .then(() => {
          setCompleted(true)
          setFailed(false)
          updateCart([], 0)
        })
    } catch (e) {
      console.log(e)
      setFailed(true)
    } finally {
      setCheckoutModal(false)
      setLoading(false)
    }
  }

  const handleOrderStatus = () => {
    if (failed) {
      return <Message error header="Sorry" content="Something went wrong." />
    }
    return <></>
  }

  const subTotal = products.reduce((acc, p) => (acc += Number(p.subTotal)), 0)
  const currency = products.length > 0 ? products[0].currency : ''

  const rest = {completed, products, loading}

  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <CartItemList
        {...rest}
        removeFromCart={index => handleRemoveFromCart(index)}
      />
      {!loading && !completed && (
        <CartSummary
          subtotal={`${currency} ${subTotal}`}
          handleCheckout={handleCheckout}
        />
      )}

      {handleOrderStatus()}

      <Modal open={checkoutModal} dimmer="blurring">
        <Modal.Content>
          <CustomerInfo onSubmit={handlePlaceOrder} />
        </Modal.Content>
      </Modal>
    </Layout>
  )
}

export default Cart
