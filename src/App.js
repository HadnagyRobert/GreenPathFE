import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/Login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path="/">
            <Route index element={<MainPage />} />
          </Route>
          <Route path="/profile">
            <Route index element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
