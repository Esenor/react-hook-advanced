import React, { useState } from 'react'
import { Button, Progress, Icon, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


export default {
  title: 'hooks/01-simple-state',
}

export const Description = () => (
  <>
    <h1>useState</h1>
    <p>Returns a stateful value, and a function to update it.</p>
    <p>During the initial render, the returned state (state) is the same as the value passed as the first argument (initialState).</p>
    <p>The setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component.</p>
  </>
)

/**
 * SimpleStateCounter
 */
export const SimpleStateCounter = () => {
  const [state, updateState] = useState(0)
  const increment = e => updateState(state + 10)
  const decrement = e => updateState(state - 10)
  return (
    <div>
      <Progress percent={state} indicating />
      <div>
        <Button onClick={decrement} icon labelPosition='left'>
          <Icon name='angle down' />
          -10%
        </Button>
        <Label>
          <Icon name='percent' /> {state}
        </Label>
        <Button onClick={increment} icon labelPosition='right'>
          +10%
          <Icon name='angle up' />
        </Button>
      </div>
    </div>
  )
}

/**
 * SecuredStateCounter
 */
export const SecuredStateCounter = () => {
  const [state, updateState] = useState(0)
  const increment = e => updateState(state + 10)
  const decrement = e => updateState(state - 10)

  const decrementDisabled = state <= 0
  const incrementDisabled = state >= 100

  return (
    <div>
      <Progress percent={state} indicating />
      <div>
        <Button onClick={decrement} disabled={decrementDisabled} icon labelPosition='left'>
          <Icon name='angle down' />
          -10%
        </Button>
        <Label>
          <Icon name='percent' /> {state}
        </Label>
        <Button onClick={increment} disabled={incrementDisabled} icon labelPosition='right'>
          +10%
          <Icon name='angle up' />
        </Button>
      </div>
    </div>
  )
}
