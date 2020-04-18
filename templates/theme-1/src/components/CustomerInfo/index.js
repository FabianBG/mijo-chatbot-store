import React, {useState} from 'react'
import {Button, Header, Form, Segment, Input} from 'semantic-ui-react'
import useForm from '../Hooks/useForm'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.phone) {
    errors.phone = 'A phone number is required'
  }
  return errors
}

const CustomerInfo = ({onSubmit}) => {
  const [loading, setLoading] = useState(false)

  const formSubmit = async values => {
    setLoading(true)
    onSubmit(values)
  }

  const {values, handleChange, handleSubmit, errors} = useForm(
    formSubmit,
    validate,
  )

  return (
    <>
      <Header as="h1">Contact information</Header>
      <Form onSubmit={handleSubmit} loading={loading} error={!!errors}>
        <Segment>
          <Form.Field>
            <label htmlFor="phone">Phone</label>
            <Input
              id="phone"
              fluid
              name="phone"
              autoFocus
              onChange={handleChange}
              value={values.phone || ''}
            />
          </Form.Field>
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}

          <Form.Field>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              fluid
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email || ''}
            />
          </Form.Field>
          {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
          <Button type="submit" color="orange">
            Send Order
          </Button>
        </Segment>
      </Form>
    </>
  )
}

export default CustomerInfo
