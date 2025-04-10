import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen'
import { UserSelectionsProvider } from './context/userSelectionsContext'
import DevStateLogger from './dev/DevStateLogger'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserSelectionsProvider>
        <RouterProvider router={router} />
        {import.meta.env.DEV && <DevStateLogger />}
      </UserSelectionsProvider>
    </QueryClientProvider>
  </StrictMode>,
)
