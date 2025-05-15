import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/auth/action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import HomePage from './pages/home';
import CreateThreadPage from './pages/create-thread';
import DetailPage from './pages/detail-thread';
import LeaderboardPage from './pages/leaderbord';
import NotFoundPage from './pages/not-found';

import Footer from './components/footer/footer';
import Header from './components/header/header';
import Loading from './components/loading/loading';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <Loading />
      <div className="container-fluid mt-2 d-flex flex-column min-vh-100">
        <Header authUser={authUser} logout={onLogout} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={authUser ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={authUser ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/add"
              element={
                authUser ? <CreateThreadPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/thread/:threadId" element={<DetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
