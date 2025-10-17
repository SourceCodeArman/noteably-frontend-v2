import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import PublicRoute from '@/components/PublicRoute'
import { Home, Login, GetStarted, Subscribe, Upload, NotFound } from '@/routes'

const Dashboard = lazy(() => import('@/routes/Dashboard'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-slate-400">Loading...</div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="get-started"
            element={
              <PublicRoute>
                <GetStarted />
              </PublicRoute>
            }
          />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="upload" element={<Upload />} />
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
