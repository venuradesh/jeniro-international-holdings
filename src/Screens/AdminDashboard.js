import React, { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

//components
import AdminHeader from "../Components/Admin/AdminHeader";
import PanelTile from "../Components/Admin/PanelTile";

//images
import Slide from "../assets/slide.png";

function AdminDashboard() {
  const panelTitles = ["Home", "Users", "Add job", "Show Jobs", "Add News", "Show news", "Add Administrator", "Settings"];
  const [tileClicked, setTileClicked] = useState("Home");
  const [leftPanelClicked, setLeftPanelClicked] = useState(false);

  return (
    <Container>
      <AdminHeader />
      <div className={`slide-panel ${leftPanelClicked ? "active" : ""}`} onClick={() => (leftPanelClicked ? setLeftPanelClicked(false) : setLeftPanelClicked(true))}>
        <img src={Slide} alt="slide-left" />
      </div>
      <div className={`left-panel ${leftPanelClicked ? "active" : ""}`}>
        <div className="brand-container">
          <div className="title">Jeniro</div>
          <div className="sub-title">International</div>
        </div>
        {panelTitles.map((title, index) => (
          <PanelTile
            title={title}
            key={index}
            className={tileClicked === title ? "active" : ""}
            onClick={() => {
              setTileClicked(title);
              setLeftPanelClicked(false);
            }}
          />
        ))}
      </div>
      <div className="middle-container">
        <Outlet />
      </div>
    </Container>
  );
}

export default AdminDashboard;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
  position: relative;

  .slide-panel {
    display: none;
  }

  .left-panel {
    width: 20vw;
    height: 100%;
    background-color: var(--theme1);
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;

    &::-webkit-scrollbar {
      width: 0;
    }

    .brand-container {
      width: 100%;
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        font-size: var(--heading);
        text-transform: uppercase;
        font-weight: var(--font-w-700);
        color: var(--white);
        text-align: center;
      }

      .sub-title {
        font-size: var(--small);
        color: var(--white);
        font-weight: var(--font-w-300);
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 10px;
        margin-top: 10px;
      }
    }
  }

  .middle-container {
    width: calc(100vw - 20vw);
    height: calc(100vh - 50px);
    position: relative;
    left: 20vw;
    top: 50px;
    padding: 30px;
    z-index: 0;
  }

  @media only screen and (max-width: 1280px) {
    .left-panel {
      .brand-container {
        .sub-title {
          letter-spacing: 3px;
        }
      }
    }
  }

  @media only screen and (max-width: 680px) {
    .slide-panel {
      display: block;
      background-color: var(--theme1);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -12px;
      z-index: 110;
      padding: 10px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      cursor: pointer;
      transition: all 0.5s ease;

      img {
        width: 30px;
        transform: rotateZ(180deg);
        position: relative;
        transition: all 0.5s ease;
      }

      &.active {
        left: calc(200px - 10px);

        img {
          transform: rotateZ(0deg);
          left: 10px;
        }
      }
    }

    .left-panel {
      min-width: 200px;
      left: -200px;
      z-index: 1000;
      transition: all 0.5s ease;

      &.active {
        left: 0;
      }
    }

    .middle-container {
      width: 100vw;
      left: 0;
    }
  }
`;
