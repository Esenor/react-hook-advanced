import React, { useState, useEffect, useRef } from 'react'
import { Input, Label, Menu, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default {
  title: 'hooks/03-use-ref-history'
}

export const Description = () => (
  <>
    <h1>useRef</h1>
    <p>useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.</p>
  </>
)

/**
 * UseRefHistory
 */
export const UseRefHistory = () => {

  const [state, updateState] = useState('lorem ipsum')
  
  const stateRef = useRef()
  
  const previousState = stateRef.current
  
  
  useEffect(() => {
    stateRef.current = state
  }, [state])

  return (
    <div>
      <Input value={state} onChange={ e => updateState(e.target.value) }/>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Previous state</Table.HeaderCell>
            <Table.HeaderCell>New state</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{previousState}</Table.Cell>
            <Table.Cell>{state}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

/**
 * UseWatcher
 */

export const UseWatcherCustomHook = () => {
  
  /**
   * Custom useWatcher hook
   * @param {mixed} initialValue 
   */
  const useWatcher = (initialValue) => {
    const [state, updateState] = useState(initialValue)
    const stateRef = useRef()
  
    useEffect(() => {
      stateRef.current = state
    }, [state])
  
    return [state, updateState, stateRef.current]
  }

  // Implement the custom hook
  const [value, updateValue, previousValue] = useWatcher('hello')

  return (
    <div>
      <Input value={value} onChange={ e => updateValue(e.target.value) }/>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Previous state</Table.HeaderCell>
            <Table.HeaderCell>New state</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{previousValue}</Table.Cell>
            <Table.Cell>{value}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
} 