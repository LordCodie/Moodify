import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SongsProvider } from './context/SongsContext';

// import.meta.env.DEV

const AppRouter = () => {
  const { currentUser } = useAuth()

  console.log(
    currentUser ?
      { currentuser: currentUser?.displayName }
      : 'Signed-out no info available'
  )

  const router = createRouter({
    routeTree,
    context: { auth: { auth: undefined } }
  })

  return <RouterProvider router={router} context={{ currentUser }} />
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SongsProvider>
          <AppRouter />
        </SongsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
