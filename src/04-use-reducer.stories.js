import React, { useReducer } from 'react'
import { Card, Icon, Image, Button, Grid, Feed, Divider} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default {
  title: 'hooks/04-use-reducer'
}

export const Description = () => (
  <>
    <h1>useReducer</h1>
    <p>{"An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method. (If you're familiar with Redux, you already know how this works.)"}</p>
    <p>useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.</p>
  </>
)

/**
 * UseReducerComponent
 */
export const UseReducerComponent = () => {

  const articles = [
    {id: 'ven', image: './assets/1.jpg', title: 'Store vénitien alu 50 mm', category: 'Stores intérieurs', description: 'Idéal pour les grandes ouvertures', price: 33.56},
    {id: 'pli', image: './assets/2.jpg', title: 'Store plissé classique Tamisant', category: 'Stores intérieurs', description: 'Moderne Laisse passer la lumière', price: 32.39},
    {id: 'cal', image: './assets/3.jpg', title: 'Store californien Voile 125mm', category: 'Stores intérieurs', description: 'Voile à mailles fines transparent', price: 24.44},
    {id: 'jap', image: './assets/4.jpg', title: 'Panneau japonais Occultant', category: 'Stores intérieurs', description: 'Bloque la lumière extérieure Crée le noir', price: 40.93}
  ]

  /**
   * Reducer
   * @param {array} state 
   * @param {object} action 
   */
  const reducer = (state, action) => {
    switch (action?.type) {
      case 'add':        
        return state.find(({id}) => id === action?.article?.id) ? state : [ ...state, action.article]
      case 'remove':
        return state.filter(({id}) => id !== action?.article?.id)
      default:
        return state
    }
  }

  const [cart, dispatch] = useReducer(reducer, [])

  const isInCart = articleId => typeof cart.find(({id}) => id === articleId) !== 'undefined'

  return (
    <div>
      <Cart
        articles={cart}
        onRemove={ article => dispatch({ type: 'remove', article })}
      />

      <Divider/>

      <Grid columns={4} divided>
        { articles.map((article) => <Grid.Column key={article.id}>

          <Article
            {...article}
            disabled={isInCart(article.id)}
            onAddToCart={e => dispatch({ type: 'add', article })}/>

        </Grid.Column>) }
      </Grid>
    </div>
  )
}

/**
 * Article component
 */
const Article = ({image, title, category, description, price, onAddToCart, id, disabled}) => (
  <Card>
    <Image src={image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta><span className='date'>{category}</span></Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button onClick={ e => onAddToCart(id) } disabled={disabled} >add</Button>
      <span><Icon name='cart' />{price} €</span>
    </Card.Content>
  </Card>
)

/**
 * Cart component
 */
const Cart = ({articles = [], onRemove = () => {}}) => (
  <Card>
    <Card.Content>
      <Card.Header>My cart</Card.Header>
    </Card.Content>
    <Card.Content>
      {
        articles.map(article => (
          <Feed key={article.id}>
            <Feed.Event>
              <Feed.Label image={article.image} />
              <Feed.Content>
                <Feed.Date content={`${article.price} €`} />
                <Feed.Summary>
                  {article.title}
                  <div>
                    <Button onClick={e => onRemove(article)}><Icon name='minus'/> Remove</Button>
                  </div>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        ))
      }
      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content='Grand total cart' />
            <Feed.Summary>
              <strong>{articles.reduce((total, {price}) => total+=price, 0)} €</strong>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>

    </Card.Content>
  </Card>
) 
