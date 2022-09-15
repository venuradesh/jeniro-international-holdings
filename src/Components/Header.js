import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Login from "../assets/login.png";

function Header() {
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  return (
    <Container>
      <div className="logo-container">
        <img src={Logo} alt="jeniro-logo" />
      </div>
      <div className="navigation-container">
        <div className="navigation">
          <div className="item">Home</div>
          <div className="item">News</div>
          <div className="item">About us</div>
          <div className="item">Contact</div>
        </div>
        <div className="separator"></div>
        <div className="auth">
          <div className="btn login">
            <img src={Login} alt="login-btn" />
            Login
          </div>
          <div className="btn register">Register</div>
        </div>
      </div>

      <div className="hamburger-menu">
        <div className={`hamburger-icon ${hamburgerClicked ? "active" : ""}`} onClick={() => (!hamburgerClicked ? setHamburgerClicked(true) : setHamburgerClicked(false))}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`navigation ${hamburgerClicked ? "active" : ""}`}>
          <div className="item">Home</div>
          <div className="item">News</div>
          <div className="item">About us</div>
          <div className="item">Contact</div>
          <div className="item">Login</div>
          <div className="item">Register</div>
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
        }
      }
    }
  }
`;
