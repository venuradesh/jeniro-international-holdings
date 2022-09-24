import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//screens
import LandingPage from "./Screens/LandingPage";
import Register from "./Screens/Register";
import AdminDashboard from "./Screens/AdminDashboard";

//components
import AdminHome from "./Components/Admin/AdminHome";
import Users from "./Components/Admin/Users";
import AddJobs from "./Components/Admin/AddJobs";
import ShowJobs from "./Components/Admin/ShowJobs";
import AddNews from "./Components/Admin/AddNews";
import ShowNews from "./Components/Admin/ShowNews";
import AddAdministrator from "./Components/Admin/AddAdministrator";
import NewsSection from "./Screens/NewsSection";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    setIsLoaded(true);
    setAdminLogged(localStorage.getItem("adminLogged"));
    setUser(localStorage.getItem("user"));
  }, []);

  return (
    <Router>
      {isLoaded ? (
        <Container id="container">
          <Routes>
            {adminLogged && user ? (
              <>
                <Route exact path="/admin" element={<AdminDashboard />}>
                  <Route index element={<AdminHome />} />
                  <Route path="users" element={<Users />} />
                  <Route path="addjob" element={<AddJobs />} />
                  <Route path="showjobs" element={<ShowJobs />} />
                  <Route path="addnews" element={<AddNews />} />
                  <Route path="shownews" element={<ShowNews />} />
                  <Route path="addadministrator" element={<AddAdministrator />} />
                </Route>
                <Route exact path="*" element={<Navigate to="/admin" />} />
              </>
            ) : (
              <></>
            )}
            {!adminLogged ? (
              <>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/news" element={<NewsSection />} />
                <Route exact path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <></>
            )}
          </Routes>
        </Container>
      ) : (
        <div>Loading</div>
      )}
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
