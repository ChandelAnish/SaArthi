import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard, { getLoggedUserDetails } from './routes/Dashboard.jsx'
import LoginPage from './routes/LoginPage.jsx'
import SignUpPage from './routes/SignUpPage.jsx'
import Chat from './routes/Chat.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Transcribe from './routes/Transcribe.jsx'
import Profile from './routes/Profile.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/', element: <Dashboard />, loader: getLoggedUserDetails,
        children: [
          { path: '/', element: <Transcribe /> },
          { path: '/chat', element: <Chat /> },
          { path: '/profile', element: <Profile /> },
        ]
      },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ]
  }
])

// Create a query client
const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       // staleTime:Infinity //data is never considered stale
  //       staleTime: 5000
  //     }
  //   }
  // }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
