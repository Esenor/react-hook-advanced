import React, { useState, useEffect } from 'react'
import { Button, Progress, Icon, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default {
  title: 'hooks/02-use-effect-observer'
}

export const Description = () => (
  <>
    <h1>useEffect</h1>
    <p>Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase). Doing so will lead to confusing bugs and inconsistencies in the UI.</p>
    <p>Instead, use useEffect. The function passed to useEffect will run after the render is committed to the screen. Think of effects as an escape hatch from React’s purely functional world into the imperative world.</p>
    <p>By default, effects run after every completed render, but you can choose to fire them only when certain values have changed.</p>
  </>
)

/**
 * CounterStateObserver
 */
export const CounterStateObserver = () => {
  const [state, updateState] = useState(0)
  const increment = e => updateState(state + 10)
  const decrement = e => updateState(state - 10)

  const [[decrementDisabled, incrementDisabled], updateButtonsDisabled] = useState([false, false])
  
  useEffect(() => updateButtonsDisabled([state <= 0, state >= 100]), [state])

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

/**
 * CounterStatePrefetch
 */
export const CounterStatePrefetch = () => {
  const [state, updateState] = useState(0)
  const increment = e => updateState(state + 10)
  const decrement = e => updateState(state - 10)

  const [[decrementDisabled, incrementDisabled], updateButtonsDisabled] = useState([false, false])

  const [loading, updateLoading] = useState(false)

  useEffect(() => {
    updateLoading(true)
    setTimeout(() => {
      updateState(50)
      updateLoading(false)
     }, 1500)
  }, [])

  useEffect(() => updateButtonsDisabled([state <= 0 || loading , state >= 100 || loading ]), [state, loading])

  return (
    <div>
      { loading && <div>Loading</div> }
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