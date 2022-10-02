import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import * as animationData from "../../assets/Lotties/submit-loading.json";

//images
import User from "../../assets/user.png";

const API_URL = "http://localhost:5000";
// const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function UserTile({ userData, id, componentRerender }) {
  const [selectionClicked, setSelectionClicked] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    isClickToPauseDisabled: true,
  };

  const onUpdateClick = () => {
    setLoading(true);
    if (selectedStatus !== userData.status) {
      axios
        .put(`${API_URL}/updateStatus`, {
          status: selectedStatus,
          id: id,
        })
        .then((res) => {
          if (!res.data.error) {
            setLoading(false);
            componentRerender({ statusUpdates: true });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const onDeleteClick = () => {
    setDeleteLoading(true);

    axios
      .delete(`${API_URL}/deleteUser`, {
        headers: {
          userid: id,
        },
      })
      .then((res) => {
        if (!res.data.error) {
          setDeleteLoading(false);
          componentRerender({ userDeleted: true });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Container>
      <div className="profile-wrapper">
        <div className="profile-container">
          <img src={User} alt="user" />
        </div>
        <div className="content-container">
          <div className="name item">
            <span>Name: </span>
            {userData.firstName + " " + userData.lastName}
          </div>
          <div className="email item">
            <span>Email: </span>
            {userData.email}
          </div>
          <div className="address item">
            <span>Phone Number: </span>
            {userData.phone}
          </div>
          <div className="nic item">
            <span>NIC No: </span>
            {userData.nic}
          </div>
          <div className="job-types-preffered item">
            <span>Job types: </span>
            {userData.jobTypes}
          </div>
          <div className="status item">
            <span>Status: </span>
            {userData.status}
          </div>
        </div>
      </div>
      <div className="btn-container">
        <a href={`mailto:${userData.email}`} className="contact btn">
          Contact the User
        </a>
        <div className="delete btn" onClick={() => setDeleteClicked(true)}>
          Delete the User
        </div>
        <div className={`selection-status btn ${selectionClicked ? "active" : ""}`} onClick={() => (!selectionClicked ? setSelectionClicked(true) : setSelectionClicked(false))}>
          <select defaultValue={"none"} onChange={(e) => (e.target.value !== userData.status ? setSelectedStatus(e.target.value) : setSelectedStatus(""))}>
            <option value="none" hidden disabled>
              Select Status
            </option>
            <option value="Registered">Registered</option>
            <option value="First Payment">First Payment</option>
            <option value="Second Payment">Second Payment</option>
            <option value="Job offer given">Job offer given</option>
            <option value="Third Payment">Third Payment</option>
            <option value="Visa">Visa</option>
          </select>
        </div>
        {selectedStatus ? (
          <div className="update-user btn" onClick={() => onUpdateClick()}>
            {!loading ? "Update the status" : <Lottie options={lottieOptions} width={50} />}
          </div>
        ) : (
          <></>
        )}
      </div>
      {deleteClicked ? (
        <div className="delete-confirmation">
          <div className="container">
            <div className="content">Delete the User from Database</div>
            <div className="btn-container-delete">
              <div className="btn yes" onClick={() => (!deleteLoading ? onDeleteClick() : "")}>
                {deleteLoading ? <Lottie options={lottieOptions} width={50} /> : "Yes"}
              </div>
              <div className="btn no" onClick={() => setDeleteClicked(false)}>
                No
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
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
  position: relative;

  .delete-confirmation {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      background-color: var(--theme1);
      width: 45%;
      min-width: 250px;
      height: max-content;
      padding: 20px 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      border-radius: 12px;

      .content {
        color: var(--white);
        font-size: var(--small);
      }

      .btn-container-delete {
        display: flex;
        margin-top: 10px;
        column-gap: 10px;
        width: 100%;

        .btn {
          width: 100%;
          background-color: var(--btn-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--small);
          color: var(--white);
          height: 40px;
          cursor: pointer;

          &.yes {
            background-color: var(--btn-red);

            &:hover {
              background-color: var(--btn-red-alt);
            }
          }

          &:hover {
            background-color: var(--btn-color-alt);
          }
        }
      }
    }
  }

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
      margin-bottom: 5px;

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
    row-gap: 5px;

    .btn {
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
      color: var(--theme1);

      &.delete {
        background-color: var(--btn-red);

        &:hover {
          background-color: var(--btn-red-alt);
        }
      }

      &:hover {
        background-color: var(--btn-color-alt);
      }
    }

    .contact {
      text-decoration: none;
    }

    .update-user {
      background-color: var(--btn-red);

      &:hover {
        background-color: var(--btn-red-alt);
      }
    }

    .selection-status {
      width: 100%;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 12px;
        height: 8px;
        background-color: var(--theme1);
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        right: 20px;
        transition: all 0.3s ease;
      }

      &.active {
        &::after {
          clip-path: polygon(50% 0, 0 100%, 100% 100%);
        }
      }

      select {
        background-color: transparent;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        text-align: center;
        position: relative;
        appearance: none;
        padding: 0 1em 0 1em;
        font-size: var(--small);
        color: var(--theme1);
        font-weight: var(--font-w-500);

        &::-ms-expand {
          display: none;
        }
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
