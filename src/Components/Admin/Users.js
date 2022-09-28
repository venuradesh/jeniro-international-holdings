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

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

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

    if (nic) {
      axios
        .get(`${API_URL}/searchByNic`, {
          headers: {
            nic: nic,
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
            setError("NIC incorrect or Users not found with the NIC");
            setSearchUserNotFound({ found: true });
          }
        });
    } else {
      setSearchClicked(false);
      setError("NIC not inserted");
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
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 20px;

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
