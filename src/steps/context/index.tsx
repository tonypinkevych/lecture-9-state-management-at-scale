import React from 'react'
import { EmptyState, LoadingState } from '../../components'
import { Container, Header, Progress, TaskInput, TaskList } from './components'
import { TaskProvider, useTaskContext } from './context'

function App(): React.JSX.Element {
  const { tasks, loading } = useTaskContext()

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

function AppWithProvider(): React.JSX.Element {
  return (
    <TaskProvider>
      <App />
    </TaskProvider>
  )
}

export default AppWithProvider
