import React from 'react'
import {Button, Segment, Divider} from 'semantic-ui-react'

export default ({
  handleCheckout,
  display_price: {
    with_tax: {amount, currency, formatted},
  },
}) => (
  <div>
    <Divider />
    <Segment clearing size="large">
      <span>
        <strong>Sub total:</strong>
        {` ${formatted}`}
      </span>

      <Button color="black" floated="right">
        Check out
      </Button>
    </Segment>
  </div>
)
