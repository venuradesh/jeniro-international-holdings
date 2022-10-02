import React from "react";
import styled from "styled-components";

//images
import Cover from "../assets/about-us.png";
import Logo from "../assets/logo-black.png";
import Close from "../assets/close.png";

function AboutUs({ aboutUsClick }) {
  return (
    <Container>
      <div className="cover-container">
        <div className="cover"></div>
        <div className="brand-container">
          <img src={Logo} alt="logo" className="logo-image" />
          <div className="brand-name"> Janiro International Moving Service (Pvt) Ltd</div>
        </div>
      </div>
      <div className="separator"></div>
      <div className="content-container">
        <div className="close-btn" onClick={() => aboutUsClick(false)}>
          <img src={Close} alt="close-btn" className="close-btn-icon" />
        </div>
        <div className="title">About Us</div>
        <div className="content">
          <p>Our company is a registered company in the Democratic Socialist Republic of Sri Lanka.</p>
          <p>We help Sri Lankan employees to find job opportunities in New Zealand and Australia. In addition, we also help in obtaining student visas and tourist visas. We consider it our responsibility to fulfill your dream of working abroad</p>
        </div>
      </div>
    </Container>
  );
}

export default AboutUs;

const Container = styled.div`
  width: 800px;
  height: 500px;
  background-color: var(--white);
  display: flex;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 var(--theme1);
  overflow: hidden;
  position: relative;

  .cover-container {
    width: 50%;
    position: relative;
    z-index: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 20px;

    .cover {
      margin: 20px;
      padding-right: 30px;
      width: 100%;
      height: 100%;
      background-image: url(${Cover});
      background-size: contain;
      object-fit: contain;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: 40px;
      left: 0;
      z-index: -2;
    }

    .brand-container {
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .logo-image {
        width: 70px;
      }

      .brand-name {
        color: var(--theme1);
        margin-top: 10px;
      }
    }
  }

  .separator {
    width: 1px;
    height: 85%;
    position: absolute;
    background-color: var(--theme1-alt);
    left: 55%;
    top: 50%;
    transform: translateY(-50%);
  }

  .content-container {
    width: 48%;
    height: 100%;
    padding: 20px;
    padding-top: 30px;
    position: relative;
    left: 20px;

    .close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;

      .close-btn-icon {
        width: 12px;
        transition: all 0.3s ease;
      }

      &:hover {
        .close-btn-icon {
          transform: scale(1.04);
        }
      }
    }

    .title {
      font-size: var(--heading);
      font-family: var(--font-family1);
      font-weight: var(--font-w-700);
      color: var(--theme1);
      text-transform: uppercase;
      text-align: center;
    }

    .content {
      width: 100%;
      height: 90%;
      padding: 30px 10px;
      overflow-y: auto;

      p {
        font-size: var(--small);
        text-align: center;
        margin-bottom: 20px;
        color: var(--theme1);
        font-weight: var(--font-w-400);
        opacity: 0.7;
      }

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--theme1-alt);
      }
    }
  }

  @media only screen and (max-width: 860px) {
    width: 700px;
    height: 450px;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 50%;
  }

  @media only screen and (max-width: 680px) {
    width: 50%;
    padding: 0;

    .cover-container {
      display: none;
    }

    .separator {
      display: none;
    }

    .content-container {
      flex: 1;
      left: 0;
    }
  }

  @media only screen and (max-width: 520px) {
    width: 80%;
    height: 60%;

    .content-container {
      padding-top: 20px;
    }
  }
`;
