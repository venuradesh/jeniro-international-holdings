import React from "react";
import styled from "styled-components";

//images
import User from "../../assets/user.png";

function UserTile() {
  return (
    <Container>
      <div className="profile-wrapper">
        <div className="profile-container">
          <img src={User} alt="user" />
        </div>
        <div className="content-container">
          <div className="name item">
            <span>Name: </span>Venura Warnasooriya
          </div>
          <div className="email item">
            <span>Email: </span>venurawarnasooriya@gmail.com
          </div>
          <div className="address item">
            <span>Address: </span>B-49, Wickrambahu 2nd lane, Gampola
          </div>
          <div className="job-types-preffered item">
            <span>Job types: </span>Full stack Web developer, Full stack Web developer, Fronend Web developer
          </div>
          <div className="job-count item">
            <span>Applied Job count: </span>3
          </div>
        </div>
      </div>
      <div className="btn-container">
        <div className="contact btn">Contact the User</div>
        <div className="delete btn">Delete the User</div>
      </div>
    </Container>
  );
}

export default UserTile;

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  height: max-content;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 var(--gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 30px;

  .profile-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;

    .profile-container {
      background-color: var(--theme1);
      width: max-content;
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      img {
        width: 100px;
        position: relative;
        left: 10px;
      }
    }
  }

  .content-container {
    height: 80%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    .item {
      font-size: var(--small);
      color: var(--btn-color-alt);
      font-weight: var(--font-w-700);

      span {
        font-weight: var(--font-w-300);
        margin-right: 10px;
      }
    }
  }

  .btn-container {
    width: 20%;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .contact,
    .delete {
      width: 100%;
      min-width: 150px;
      height: 40px;
      background-color: var(--btn-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--small);
      font-weight: var(--font-w-700);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: var(--btn-color-alt);
      }
    }
  }

  @media only screen and (max-width: 1180px) {
    flex-direction: column;
    justify-content: space-around;
    min-height: max-content;

    .btn-container {
      margin-top: 20px;
      flex-direction: row;
      column-gap: 30px;
      width: 100%;
    }
  }

  @media only screen and (max-width: 780px) {
    .profile-wrapper {
      .profile-container {
        width: 100px;
        height: 100px;

        img {
          width: 60px;
          left: 5px;
        }
      }
    }
  }

  @media only screen and (max-width: 500px) {
    min-height: max-content;

    .profile-wrapper {
      height: max-content;

      .profile-container {
        width: 60px;
        height: 60px;

        img {
          width: 40px;
          left: 5px;
        }
      }
    }

    .btn-container {
      margin-top: 20px;

      .btn {
        min-width: 100px;
      }
    }
  }

  @media only screen and (max-width: 390px) {
    .profile-wrapper {
      .profile-container {
        display: none;
      }

      .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 10px;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
    }
    .btn-container {
      flex-direction: column;
      row-gap: 10px;

      .btn {
        width: 100%;
      }
    }
  }
`;
