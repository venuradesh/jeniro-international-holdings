import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//images
import User from "../../assets/user.png";

// const API_URL = 'http://localhost:5000'
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function AdminHeader() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [userName, setUserName] = useState("");
  const [profileClicked, setProfileClicked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAdminId(localStorage.getItem("user"));
      axios
        .get(`${API_URL}/getUser`, {
          headers: {
            userid: localStorage.getItem("user"),
          },
        })
        .then((result) => {
          setUserName(result.data.userData.firstName + " " + result.data.userData.lastName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onLogoutClick = () => {
    setAdminId("");
    setUserName("");
    localStorage.removeItem("user");
    localStorage.removeItem("adminLogged");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {adminId ? (
        <Container>
          <div className="name-container">
            <div className="profile-container" onClick={() => (profileClicked ? setProfileClicked(false) : setProfileClicked(true))}>
              <img src={User} alt="user" />
              <div className="user-name">{userName}</div>
            </div>
            <div className={`logout-container ${profileClicked ? "active" : ""}`}>
              <div className="item profile">View profile</div>
              <div className="item logout" onClick={() => onLogoutClick()}>
                Logout
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export default AdminHeader;

const Container = styled.div`
  position: fixed;
  width: calc(100vw - 20vw);
  height: 50px;
  background-color: var(--theme1);
  left: 20vw;
  z-index: 100;
  /* box-shadow: 0px 0px 5px 0 var(--theme1-alt); */
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .name-container {
    width: 200px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    .profile-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      column-gap: 10px;

      .user-name {
        color: var(--white);
        font-size: var(--small);
      }

      img {
        width: 15px;
      }
      &:hover {
        transform: scale(1.02);
      }
    }

    .logout-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 120%;
      left: 0;
      transform-origin: top;
      transform: scaleY(0);
      transition: all 0.3s ease;

      .item {
        height: 45px;
        background-color: var(--theme1);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--small);
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }

      &.active {
        transform: scaleY(1);
      }
    }
  }

  @media only screen and (max-width: 680px) {
    left: 0%;
    width: 100vw;
  }
`;
