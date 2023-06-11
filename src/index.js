import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import configureStore from './store/store'
import { taskCompleted, taskDeleted, titleChanged } from './store/task'

const store = configureStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => setState(store.getState))
  }, [])

  const completeTask = (id) => {
    store.dispatch(taskCompleted(id))
  }

  const changeTitle = (id) => {
    store.dispatch(titleChanged(id))
  }

  const deleteTask = (id) => {
    store.dispatch(taskDeleted(id))
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
            <button onClick={() => deleteTask(el.id)}>delete</button>
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
