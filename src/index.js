import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import * as actions from './store/actions'
import { initiateStore } from './store/store'

const store = initiateStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => setState(store.getState))
  }, [])

  const completeTask = (id) => {
    store.dispatch(actions.taskCompleted(id))
  }

  const changeTitle = (id) => {
    store.dispatch(actions.titleChanged(id))
  }

  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map(el =>
          <li key={el.id}>
            <p>{el.title}</p>
            <p>Completed: {`${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>complete</button>
            <button onClick={() => changeTitle(el.id)}>change title</button>
            <hr/>
          </li>
        )}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <App/>
)
