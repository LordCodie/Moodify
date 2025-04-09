import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { UserSelectionsProvider } from './context/userSelectionsContext'

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserSelectionsProvider>
      <RouterProvider router={router} />
    </UserSelectionsProvider>
  </StrictMode>,
)
