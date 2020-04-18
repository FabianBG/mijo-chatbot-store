import React from 'react'
import Img from 'gatsby-image'

import {Item, Label, Grid} from 'semantic-ui-react'

import AddToCart from '../AddToCart'

export default ({id, name, price, mainImage, currency}) => (
  <Item.Group>
    <Item style={{alignItems: 'center', display: 'block'}}>
      <Item.Content style={{marginBottom: '20px'}}>
        <Img
          style={{heigth: '100%'}}
          sizes={mainImage.childImageSharp.sizes}
          alt={name}
        />
      </Item.Content>
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Item.Description>
              <h3 style={{fontWeight: '400'}}>{`${currency} ${price}`}</h3>
              <Label>{`ID: ${id}`}</Label>
            </Item.Description>
          </Grid.Column>
          <Grid.Column>
            <AddToCart
              product={{id, name, price, mainImage, currency}}
              style={{width: '50%'}}
            />
          </Grid.Column>
        </Grid>
      </Item.Content>
    </Item>
  </Item.Group>
)
