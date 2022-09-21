import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//screens
import LandingPage from "./Screens/LandingPage";
import Register from "./Screens/Register";
import AdminDashboard from "./Screens/AdminDashboard";
import AdminHome from "./Components/Admin/AdminHome";
import Users from "./Components/Admin/Users";

const App = () => {
  return (
    <Router>
      <Container id="container">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

const Container = styled.div`
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--theme1);
  }
`;
