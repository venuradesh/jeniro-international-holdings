import React from "react";
import styled from "styled-components";
import InputFeild from "../InputFeild";
import UserTile from "./UserTile";

function Users() {
  return (
    <Container>
      <div className="input-container">
        <InputFeild type="text" content="Search the User by name" id="search-item" />
        <div className="btn">Search</div>
      </div>
      <div className="users-container">
        <UserTile />
        <UserTile />
        <UserTile />
        <UserTile />
      </div>
    </Container>
  );
}

export default Users;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  .input-container {
    display: flex;
    align-items: center;
    column-gap: 30px;
    margin-bottom: 30px;

    .btn {
      width: 30%;
      background-color: var(--theme1);
      color: var(--white);
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-w-300);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--theme1-alt);
      }
    }
  }

  .users-container {
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 50px;
  }

  @media only screen and (max-width: 500px) {
    .input-container {
      flex-direction: column;
      justify-content: center;
      row-gap: 20px;

      .btn {
        width: 50%;
      }
    }
  }

  @media only screen and (max-width: 550px) {
    .users-container {
      height: 80%;
    }
  }

  @media only screen and (max-width: 370px) {
    .input-container {
      .btn {
        width: 100%;
      }
    }
  }
`;
