import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Routes/ProtectedRoute';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Auth/Dashboard';
import Index from './Pages/Activity/Index';
import Profile from './Pages/Auth/Profile';
import MembersManagement from './Pages/Members/MembersManagement';
import OrganizationWrapper from './Components/OrganizationWrapper';

function App() {  
  return (  
    <AuthProvider>  
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Routes without orgName */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/activities"
              element={<ProtectedRoute element={<Index />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/members"
              element={<ProtectedRoute element={<MembersManagement />} />}
            />

            {/* Routes with optional orgName */}
            <Route element={<OrganizationWrapper />}>
              <Route path=":orgName/signin" element={<SignIn />} />
              <Route path=":orgName/signup" element={<SignUp />} />

              <Route
                path=":orgName/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path=":orgName/activities"
                element={<ProtectedRoute element={<Index />} />}
              />
              <Route
                path=":orgName/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path=":orgName/members"
                element={<ProtectedRoute element={<MembersManagement />} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
