import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import AlchemyLandingPage from './components/AlchemyLandingPage'
import LoginSignup from './components/Login-Signup'
import NavBar from './components/NavBar'
import { Toaster } from 'react-hot-toast';
import CourseDetails from './components/CourseDetails'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <>
                  <NavBar />
                  <AlchemyLandingPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/course/:courseId"
            element={
              isAuthenticated ? (
                <>
                  <NavBar />
                  <CourseDetails />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/courses"
            element={
              isAuthenticated ? (
                <>
                  <NavBar />
                  <AlchemyLandingPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/lab"
            element={
              isAuthenticated ? (
                <>
                  <NavBar />
                  <AlchemyLandingPage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </>
  )
}

export default App
