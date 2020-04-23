import React from 'react'
import Img from 'gatsby-image'
import {Responsive} from 'semantic-ui-react'

const WellcomeLogo = ({img}) => {
  return (
    <div>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <div
          style={{
            width: '25%',
            margin: 'auto',
            marginTop: '-6%',
            marginBottom: '6%',
          }}
        >
          <Img sizes={img.childImageSharp.sizes} alt="header" />
        </div>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <div style={{width: '25%', margin: 'auto', marginTop: '-6%'}}>
          <Img sizes={img.childImageSharp.sizes} alt="header" />
        </div>
        <h2 style={{textAlign: 'center', fontWeight: '300', marginTop: '0'}}>
          - WELCOME -
        </h2>
      </Responsive>
    </div>
  )
}

export default WellcomeLogo
