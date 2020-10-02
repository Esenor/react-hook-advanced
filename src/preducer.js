const initialState = {count: 0, pending: false}

const preducer = (dispatch, action) => {
  switch (action.type) {
    case 'increment':
			dispatch({ type: 'pending' })
      setTimeout(() => dispatch(action), 500)
      break
    default:
      dispatch(action)
      break
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return { ...state, pending: true}
    case 'increment':
      return { ...state, count: state.count + (action.delta || 1), pending: false}
    case 'decrement':
      return { ...state, count: state.count - (action.delta || 1), pending: false}
  }
}

const useCustomAsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return [state, action  => preducer(dispatch, action)]
}

const Counter = () => {
  const [state, dispatch] = useCustomAsyncReducer(reducer, initialState)
  return (
    <div>
      <div>Total : {state.pending ? 'pending ...' : state.count}</div>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment', delta: 3})}>+</button>
    </div>
  )
}

ReactDOM.render(<Counter />, document.querySelector("#app"))
