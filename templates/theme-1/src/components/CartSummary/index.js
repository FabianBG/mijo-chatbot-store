import React from 'react'
import {Button, Segment, Divider} from 'semantic-ui-react'

export default ({handleCheckout, subtotal}) => (
  <div>
    <Divider />
    <Segment clearing size="large">
      <h3 style={{float: 'left', fontWeight: '300', marginTop: '10px'}}>
        <strong>Total*:</strong>
        {` ${subtotal}`}
      </h3>
      <Button color="green" floated="right" onClick={handleCheckout}>
        Check out
      </Button>
    </Segment>
  </div>
)
