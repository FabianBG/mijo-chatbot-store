/* eslint-disable camelcase */
import React from 'react'
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import {
  Item,
  Button,
  Loader,
  Message,
  Responsive,
  Image,
} from 'semantic-ui-react'

export default ({products, removeFromCart, loading, completed}) => {
  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message
        success
        header="Hurray !!"
        content="The order was placed the owner will contact you soon."
      />
    )

  if (products.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You will need to add some items to the cart before you can checkout.
        </p>
      </Message>
    )
  const mapCartItemsToItems = items =>
    items.map(({id, name, quantity, price, mainImage, image}, index) => {
      const DesktopItemImage = () => (
        <Image style={{width: '30%'}}>
          <Img sizes={mainImage.childImageSharp.sizes} alt={name} />
        </Image>
      )
      const MobileItemImage = () => (
        <Image style={{width: '30%'}}>
          <Img sizes={mainImage.childImageSharp.sizes} alt={name} />
        </Image>
      )

      return {
        childKey: index,
        header: (
          <Item.Header>
            <Link to={`/product/${id}/`}>{name}</Link>
          </Item.Header>
        ),
        image: (
          <React.Fragment>
            <Responsive as={MobileItemImage} {...Responsive.onlyMobile} />
            <Responsive
              as={DesktopItemImage}
              minWidth={Responsive.onlyTablet.minWidth}
            />
          </React.Fragment>
        ),
        meta: `${quantity} x ${price}`,
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(index)}
          />
        ),
      }
    })
  return <Item.Group divided items={mapCartItemsToItems(products)} />
}
