import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function PanelTile({ title, onClick, className }) {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        onClick();
        navigate(title === "Home" ? "/admin" : `/admin/${title.split(" ").join("").toLowerCase()}`);
      }}
      className={className}
    >
      <div className="icon"></div>
      <div className="tileTitle">{title}</div>
    </Container>
  );
}

export default PanelTile;

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  cursor: pointer;
  position: relative;

  &.active {
    background-color: var(--white);

    .tileTitle {
      color: var(--theme1);
    }

    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 50px;
      border-bottom-right-radius: 40px;
      background-color: transparent;
      right: 0;
      bottom: 100%;
      box-shadow: 0 20px 0 0 var(--white);
    }

    &::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 50px;
      border-top-right-radius: 40px;
      right: 0;
      top: 100%;
      background-color: transparent;
      box-shadow: 0 -20px 0 0 var(--white);
    }
  }

  .tileTitle {
    color: var(--white);
    transition: all 0.3s ease;
  }
`;
