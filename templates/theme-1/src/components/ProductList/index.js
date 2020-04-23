/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapProductsToItems = (products, images) => {
  return products.map(({node: {name, id, image, price, currency}}) => {
    const priceFormated = `${currency} ${price}`
    const [imageSrc] = images.filter(i => i.node.base === image)

    return {
      as: Link,
      to: `/product/${id}/`,
      childKey: id,
      image: (
        <Image>
          <Img sizes={imageSrc.node.childImageSharp.sizes} alt={name} />
        </Image>
      ),
      header: name,
      meta: <Card.Meta style={{color: 'dimgray'}}>{priceFormated}</Card.Meta>,
    }
  })
}

export default ({products, images}) => (
  <Card.Group
    items={mapProductsToItems(products, images)}
    itemsPerRow={2}
    stackable
  />
)
