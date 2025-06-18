import React from 'react'
import { Provider } from 'react-redux'
import { EmptyState, LoadingState } from '../../components'
import { Container, Header, Progress, TaskInput, TaskList } from './components'
import { store, useAppSelector, useTaskStoreInit } from './store'

function App(): React.JSX.Element {
  useTaskStoreInit()
  const tasks = useAppSelector((state) => state.tasks.tasks)
  const loading = useAppSelector((state) => state.tasks.loading)

  return (
    <Container>
      <Header />
      <TaskInput />

      {loading ? (
        <LoadingState />
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <TaskList />
          <Progress />
        </>
      )}
    </Container>
  )
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
