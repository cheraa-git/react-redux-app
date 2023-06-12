import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import createStore from './store/store'
import { changeTitle, completeTask, getTasks, getTasksLoadingStatus, loadTasks, removeTask } from './store/task'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getError } from './store/errors'

const store = createStore()

const App = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const errors = useSelector(getError())

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])


  if (isLoading) return <h1>Loading...</h1>
  if (errors[0]) return <p>{errors[0]}</p>
  return (
    <>
      <h1>App</h1>

      <ul>
        {tasks.map(el =>
          <li key={el.id}>
            <p>{el.title}</p>
            <p>Completed: {`${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>complete</button>
            <button onClick={() => dispatch(changeTitle(el.id))}>change title</button>
            <button onClick={() => dispatch(removeTask(el.id))}>remove</button>
            <hr/>
          </li>
        )}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)
