import React from 'react'
import { EmptyState, LoadingState } from '../../components'
import { Container, Header, Progress, TaskInput, TaskList } from './components'
import { useTaskStore, useTaskStoreInit } from './store'

function App(): React.JSX.Element {
  useTaskStoreInit()
  const tasks = useTaskStore((state) => state.tasks)
  const loading = useTaskStore((state) => state.loading)

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

export default App
