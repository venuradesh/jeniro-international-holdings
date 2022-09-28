import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//images
import Logo from "../assets/logo.png";
import Login from "../assets/login.png";
import User from "../assets/user.png";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function Header({ scrolled = false, loginClick, aboutUsClick, contactClick, registerPage = false }) {
  const navigate = useNavigate();
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("user"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userProfileClicked, setUserProfileClicked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios
        .get(`${API_URL}/getUser`, {
          headers: {
            userId: localStorage.getItem("user"),
          },
        })
        .then((result) => {
          setFirstName(result.data.userData.firstName);
          setLastName(result.data.userData.lastName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const Logout = () => {
    setFirstName("");
    setLastName("");
    localStorage.removeItem("user");
    setUserId("");
    window.location.reload();
  };

  return (
    <Container className={scrolled ? "active" : ""}>
      <div className="logo-container">
        <img src={Logo} alt="jeniro-logo" />
      </div>
      <div className="navigation-container">
        <div className="navigation">
          <div className="item" onClick={() => navigate("/")}>
            Home
          </div>
          <div className="item" onClick={() => navigate("/news")}>
            News
          </div>
          <div className="item" onClick={() => aboutUsClick(true)}>
            About us
          </div>
          <div className="item" onClick={() => contactClick(true)}>
            Contact
          </div>
        </div>
        <div className="separator"></div>
        <div className="auth">
          {!userId ? (
            <>
              <div
                className="btn login"
                onClick={() => {
                  loginClick(true);
                }}
              >
                <img src={Login} alt="login-btn" />
                Login
              </div>
              {!registerPage ? (
                <div className="btn register" onClick={() => navigate("/register")}>
                  Register
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <div className="profile-name" onClick={() => (userProfileClicked ? setUserProfileClicked(false) : setUserProfileClicked(true))}>
                <img src={User} alt="user-logo" />
                {firstName + " " + lastName}
              </div>
              <div className={`logout-container ${userProfileClicked ? "active" : ""}`}>
                <div className="profile-view logout-item" onClick={() => navigate("/profile")}>
                  View Profile
                </div>
                <div className="logout logout-item" onClick={() => Logout()}>
                  Logout
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="hamburger-menu">
        <div className={`hamburger-icon ${hamburgerClicked ? "active" : ""}`} onClick={() => (!hamburgerClicked ? setHamburgerClicked(true) : setHamburgerClicked(false))}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`navigation ${hamburgerClicked ? "active" : ""}`}>
          {firstName ? (
            <div className="profile-name item" onClick={() => navigate("/profile")}>
              <img src={User} alt="user-logo" />
              {firstName + " " + lastName}
            </div>
          ) : (
            <></>
          )}
          <div className="item" onClick={() => navigate("/")}>
            Home
          </div>
          <div className="item" onClick={() => navigate("/news")}>
            News
          </div>
          <div
            className="item"
            onClick={() => {
              setHamburgerClicked(false);
              aboutUsClick(true);
            }}
          >
            About us
          </div>
          <div
            className="item"
            onClick={() => {
              setHamburgerClicked(false);
              contactClick(true);
            }}
          >
            Contact
          </div>
          {!userId ? (
            <>
              <div
                className="item"
                onClick={() => {
                  loginClick(true);
                  setHamburgerClicked(false);
                }}
              >
                Login
              </div>
              {!registerPage ? (
                <div className="item" onClick={() => navigate("/register")}>
                  Register
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <div className="Logout item" onClick={() => Logout()}>
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  transition: all 0.5s ease;

  &.active {
    background-color: var(--theme1);
    box-shadow: 0 2px 2px 0 var(--theme1);
  }

  .logo-container {
    img {
      width: 60px;
    }
  }

  .hamburger-menu {
    display: none;
  }

  .navigation-container {
    display: flex;
    align-items: center;

    .navigation {
      display: flex;
      align-items: center;
      column-gap: 30px;
      color: var(--white);
      font-size: var(--normal);

      .item {
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.03);
        }
      }
    }

    .separator {
      width: 2px;
      height: 20px;
      background-color: var(--white);
      margin: 0 30px;
    }

    .auth {
      display: flex;
      align-items: center;
      column-gap: 30px;
      color: var(--white);
      position: relative;

      .btn {
        width: 150px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.03);
        }
      }

      .login {
        width: 100px;
        display: flex;
        align-items: center;
        column-gap: 10px;

        img {
          width: 20px;
        }
      }

      .profile-name {
        display: flex;
        align-items: center;
        column-gap: 10px;
        padding: 10px 15px;
        border-radius: 12px;
        transition: all 0.3s ease;
        cursor: pointer;
        font-size: var(--normal);
        text-transform: capitalize;

        img {
          width: 20px;
        }

        &:hover {
          transform: scale(1.03);
        }
      }

      .logout-container {
        position: absolute;
        right: 0;
        top: 110%;
        background-color: var(--white);
        width: 100%;
        height: max-content;
        transform-origin: top;
        transform: scaleY(0);
        transition: all 0.3s ease;

        .logout-item {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--theme1);
          font-size: var(--small);
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background-color: var(--btn-color-alt);
            color: var(--white);
          }
        }

        &.active {
          transform: scaleY(1);
        }
      }

      .register {
        background-color: var(--btn-color);
        border-radius: 12px;
        color: var(--white);
        font-weight: var(--font-w-600);
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .navigation-container {
      display: none;
    }

    .hamburger-menu {
      display: flex;
      position: relative;

      .hamburger-icon {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        transition: all 0.3s ease;

        span {
          width: 24px;
          height: 3px;
          background-color: var(--white);
          margin-bottom: 5px;
          transition: all 0.3s ease;
        }

        &:hover {
          transform: scale(1.04);
        }

        &.active {
          span {
            margin: 0;
            transform-origin: center;

            &:first-of-type {
              transform: translate(0px, 3px) rotate(45deg);
            }

            &:nth-of-type(2) {
              display: none;
            }

            &:last-of-type {
              transform: translate(0px, 0px) rotate(-45deg);
            }
          }
        }
      }

      .navigation {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--white);
        width: 200px;
        height: max-content;
        position: absolute;
        top: 60px;
        right: 0;
        transform-origin: top;
        transform: scaleY(0);
        transition: all 0.3s ease-in-out;
        box-shadow: 0 0 10px 0 var(--theme1);

        &.active {
          transform: scaleY(1);
        }

        .item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 0px;
          font-weight: var(--font-w-600);
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background-color: var(--btn-color);
          }

          img {
            width: 20px;
          }

          &.profile-name {
            column-gap: 10px;
            background-color: var(--theme1);
            color: var(--white);
            text-transform: capitalize;
          }
        }
      }
    }
  }
`;
