import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputFeild from "../InputFeild";
import UserTile from "./UserTile";
import Lottie from "react-lottie";
import * as animationData from "../../assets/Lotties/submit-loading.json";

//components
import Loading from "../../Screens/Loading";
import ContentNotFound from "../../Screens/ContentNotFound";

const API_URL = "http://localhost:5000";
// const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function Users() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [onUpadteChange, setUpdateChange] = useState({ statusUpdates: false, userDeleted: false });
  const [searchUserNotFound, setSearchUserNotFound] = useState({ found: false });
  const [searchContentEmpty, setSearchContentEmpty] = useState({ content: false });
  const [resetBtnInserted, setResetBtnInserted] = useState(false);
  const [nic, setNIC] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [statusClicked, setStatusClicked] = useState(false);
  const [status, setStatus] = useState("");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    isClickToPauseDisabled: true,
  };

  useEffect(() => {
    setLoading(true);
    setSearchClicked(false);
    if (!searchUserNotFound.found) {
      setError("");
    }
    onUpadteChange.statusUpdates = false;
    onUpadteChange.userDeleted = false;
    searchUserNotFound.found = false;
    searchContentEmpty.content = false;

    axios
      .get(`${API_URL}/getNormalUsers`)
      .then((res) => {
        if (!res.data.error) {
          setLoading(false);
          if (res.data.userData.length === 0) {
            setContentLoaded(false);
          } else {
            setContentLoaded(true);
            setUsers(res.data.userData);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [onUpadteChange, searchUserNotFound, searchContentEmpty]);

  const onSearchClick = () => {
    setLoading(true);
    setContentLoaded(false);
    setSearchClicked(true);

    if (nic || status) {
      axios
        .get(`${API_URL}/searchByNic`, {
          headers: {
            nic: nic,
            status: status,
          },
        })
        .then((res) => {
          if (!res.data.error) {
            setError("");
            setUsers(res.data.userData);
            setLoading(false);
            setSearchClicked(false);
            setContentLoaded(true);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.error) {
            setError("NIC incorrect or Users not found with the status");
            setSearchUserNotFound({ found: true });
          }
        });
    } else {
      setSearchClicked(false);
      setError("Insert an NIC or Select an user Status");
      setSearchUserNotFound({ found: true });
    }
  };

  const onResetClick = () => {
    setNIC("");
    setError("");
    setResetBtnInserted(false);
    setSearchContentEmpty({ content: true });
    document.getElementById("search-item").value = "";
  };

  return (
    <Container>
      <div className="input-container">
        <InputFeild
          maxlength={12}
          type="text"
          content="Search the User by NIC"
          id="search-item"
          onInput={(e) => {
            setNIC(e.target.value);
            if (e.target.value) {
              setResetBtnInserted(true);
            } else {
              setResetBtnInserted(false);
              setSearchContentEmpty({ content: true });
            }
          }}
        />

        <div className="btn-container">
          <div className="category">
            <div className={`select ${statusClicked ? "active" : ""}`} onClick={() => (!statusClicked ? setStatusClicked(true) : setStatusClicked(false))}>
              <select name="job-type" id="job-type" className="job-type" defaultValue={"none"} onChange={(e) => setStatus(e.target.value)}>
                <option value="none" hidden className="select-item">
                  User Status
                </option>
                <option value="Registered" className="select-item">
                  Registered
                </option>
                <option value="First Payment" className="select-item">
                  First Payment
                </option>
                <option value="Second Payment" className="select-item">
                  Second Payment
                </option>
                <option value="Job offer given" className="select-item">
                  Job offer given
                </option>
                <option value="Third Payment" className="select-item">
                  Third Payment
                </option>
                <option value="Visa" className="select-item">
                  Visa
                </option>
              </select>
            </div>
          </div>
          <div className="btn" onClick={() => onSearchClick()}>
            {searchClicked ? <Lottie options={lottieOptions} width={50} /> : "Search"}
          </div>
          {resetBtnInserted ? (
            <div className="btn reset" onClick={() => onResetClick()}>
              Reset
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {error ? <div className="error-container">*{error}</div> : <></>}
      <div className="users-container">
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : contentLoaded ? (
          <>
            {users.map((user) => (
              <UserTile componentRerender={setUpdateChange} userData={user.data} key={user.id} id={user.id} />
            ))}
          </>
        ) : (
          <div className="no-users">
            <ContentNotFound content="Users" />
          </div>
        )}
      </div>
    </Container>
  );
}

export default Users;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  .error-container {
    color: var(--btn-red);
    font-size: var(--small);
    margin-bottom: 20px;
    text-align: center;
  }

  .input-container {
    display: flex;
    align-items: center;
    column-gap: 30px;
    margin-bottom: 20px;

    .btn-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 20px;

      .category {
        .select {
          width: 100%;
          min-width: 170px;
          background-color: var(--white);
          height: 50px;
          border-radius: 8px;
          cursor: pointer;
          position: relative;

          &::after {
            content: "";
            width: 0.8rem;
            height: 0.6rem;
            background-color: var(--theme1);
            clip-path: polygon(0 0, 100% 0, 50% 100%);
            position: absolute;
            right: 15px;
            bottom: 50%;
            transform: translateY(50%);
            transition: all 0.3s ease;
          }

          &.active {
            &::after {
              clip-path: polygon(50% 0, 0 100%, 100% 100%);
            }
          }

          .job-type {
            background-color: transparent;
            appearance: none;
            border: none;
            padding: 0 1em 0 1em;
            width: 100%;
            height: 50px;
            font-family: inherit;
            font-size: var(--normal);
            cursor: inherit;
            line-height: inherit;
            outline: none;
            color: gray;
            font-weight: var(--font-w-500);

            &::-ms-expand {
              display: none;
            }
          }
        }
      }

      .btn {
        width: 100%;
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

      .reset {
        background-color: var(--btn-red);

        &:hover {
          background-color: var(--btn-red-alt);
        }
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

    .loading-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .no-users {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--theme1);
    }
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
