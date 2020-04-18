/* eslint-disable */
import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
import Layout from '../components/Layout'
import {stringToSlug} from '../components/utils'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.product')
    const productImage = get(this, 'props.data.image')
    const data = productInfo.edges[0].node
    const slug = stringToSlug(data.name)
    const image = get(data, 'mainImageHref')
    const sizes = productImage.childImageSharp.sizes
    const product = {
      ...data,
      id: data.id,
      image: productImage.base,
      mainImage: productImage,
      header: data.name,
      price: data.price,
      currency: data.currency,
    }

    if (!sizes) return null

    return (
      <Layout location={this.props.location}>
        <SEO title={slug} />
        <ProductSummary {...product} />
        {false && <ProductAttributes {...product} />}
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($id: String!, $image: String!) {
    product: allProductsJson(filter: {id: {eq: $id}}) {
      edges {
        node {
          id
          name
          description
          price
          currency
          image
        }
      }
    }
    image: file(base: {eq: $image}) {
      base
      childImageSharp {
        sizes(maxWidth: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`
