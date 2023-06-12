import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import createStore from './store/store'
import { completeTask, getTasks, taskDeleted, titleChanged } from './store/task'
import { Provider, useDispatch, useSelector } from 'react-redux'

const store = createStore()

const App = () => {
  const dispatch = useDispatch()
  const { entities: tasks, isLoading, } = useSelector(state => state.task)
  const { entities: error } = useSelector(state => state.error)

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])


  const changeTitle = (id) => {
    dispatch(titleChanged(id))
  }

  const deleteTask = (id) => {
    dispatch(taskDeleted(id))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error[0]) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>

      <ul>
        {tasks.map(el =>
          <li key={el.id}>
            <p>{el.title}</p>
            <p>Completed: {`${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>complete</button>
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
  <Provider store={store}>
    <App/>
  </Provider>
)
