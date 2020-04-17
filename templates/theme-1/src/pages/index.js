import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import logo from '../images/ill-short-dark.svg'
import Layout from '../components/Layout'

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
    }
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allProductsJson.edges')
  const images = get(data, 'allProductImgs.edges')
  const filterProductsWithoutImages = products.filter(v => v.node.image)

  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        >
          <Image src={logo} alt="logo" />
        </Header.Content>
      </Header>
      <ProductList products={filterProductsWithoutImages} images={images} />
    </Layout>
  )
}

export default StoreIndex
