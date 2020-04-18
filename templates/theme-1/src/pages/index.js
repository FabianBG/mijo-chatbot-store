import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import WellcomeLogo from '../components/WellcomeLogo'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      allProductsJson {
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
      allProductImgs: allFile(
        filter: {absolutePath: {regex: "/product-images/"}}
      ) {
        edges {
          node {
            base
            childImageSharp {
              sizes(maxWidth: 600) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
      image: file(base: {eq: "showroom.png"}) {
        base
        childImageSharp {
          sizes(maxWidth: 600) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allProductsJson.edges')
  const images = get(data, 'allProductImgs.edges')
  const showroom = data.image
  console.log(showroom)

  const filterProductsWithoutImages = products.filter(v => v.node.image)

  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <WellcomeLogo img={showroom} />
      <ProductList products={filterProductsWithoutImages} images={images} />
    </Layout>
  )
}

export default StoreIndex
