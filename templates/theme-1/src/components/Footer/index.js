import React from 'react'
import {Link} from 'gatsby'
import {Segment, Container, Grid, List, Header} from 'semantic-ui-react'

const Footer = () => (
  <Segment
    vertical
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '1px solid #f2f2f2',
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h4" content="About" />
            <List>
              <List.Item as={Link} to="https://dev.to/search?q=twillohackaton">
                #twillohackaton
              </List.Item>
              <p>Powered by MIJO chatbot store.</p>
              <List.Item
                as={Link}
                to="https://www.freepik.es/fotos-vectores-gratis/comida"
              >
                Icons provided for macrovector - www.freepik.es
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" content="Services" />
            <List>
              <List.Item as={Link} to="/">
                Products
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4">MIJO chatbot store</Header>
            <p>
              A personal store generate and managed by a chatbot. Developed for
              twilio & dev hackaton.
            </p>
            <Header as="h4">Links</Header>
            <List horizontal style={{display: 'flex'}}>
              <List.Item
                icon="github"
                style={{display: 'flex'}}
                content={
                  <a href="https://github.com/fabianBG" alt="github link">
                    source code
                  </a>
                }
              />
              <List.Item
                icon="linkedin"
                style={{display: 'flex'}}
                content={
                  <a
                    href="https://www.linkedin.com/in/fabianbg"
                    alt="linkedin profile"
                  >
                    linkedin
                  </a>
                }
              />
              <List.Item
                icon="mail"
                style={{display: 'flex'}}
                content={
                  <a href="mailto:f4b4g3@gmail.com" alt="email link">
                    Email
                  </a>
                }
              />
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Footer
