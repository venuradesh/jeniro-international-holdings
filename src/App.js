import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import Header from "./Components/Header";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

const Container = styled.div``;
