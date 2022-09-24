import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Lottie from "react-lottie";
import * as animationData from "../../assets/Lotties/submit-loading.json";

//components
import InputFeild from "../InputFeild";

//images
import Done from "../../assets/checked.png";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function AddAdministrator() {
  const [loading, setLoading] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [err, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [nic, setNIC] = useState("");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    setLoading(true);
    if (firstName && nic && lastName && address && phone && email && password && position) {
      axios
        .post(`${API_URL}/admin-registration`, {
          firstName,
          lastName,
          address,
          phone,
          email,
          nic,
          password,
          position,
        })
        .then((result) => {
          if (result.data.message === "done") {
            localStorage.setItem("user", result.data.userId);
            setUserAdded(true);
            setLoading(false);
            document.getElementById("reset-btn").click();
            setTimeout(() => {
              setUserAdded(false);
            }, 2000);
          }
        })
        .catch((err) => {
          if (err.response.status >= 400) {
            setLoading(false);
            setError(err.response.data.message);
            setEmailError(err.response.data.emailError);
            setPhoneError(err.response.data.phoneError);
          }
        });
    } else {
      setError("One or more Fields missing");
      setLoading(false);
    }
  };

  const onResetClick = () => {
    setError("");
    setEmailError(false);
    setPhoneError(false);
    setFirstName("");
    setLastName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setPassword("");
    setPosition("");
    setLoading(false);
  };

  return (
    <Container>
      <div className="title">Add Administrator</div>
      <form className="form-container">
        <div className="name-container half-container">
          <InputFeild type="text" content="First name" id="admin-first-name" onChange={(e) => setFirstName(e.target.value)} />
          <InputFeild type="text" content="Last name" id="admin-last-name" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="tel-address half-container">
          <InputFeild type="text" content="address" id="admin-address" onChange={(e) => setAddress(e.target.value)} />
          <InputFeild type="tel" content="Contact Number" id="admin-phone" error={phoneError} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="email-password-container half-container">
          <InputFeild type="text" content="NIC no" id="admin-nic" onChange={(e) => setNIC(e.target.value)} />
          <InputFeild type="email" content="Email" id="admin-email" error={emailError} onChange={(e) => setEmail(e.target.value)} />
          <InputFeild type="password" content="Password" id="admin-password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <InputFeild type="text" content="Job Position" id="job-position" onChange={(e) => setPosition(e.target.value)} />
        {err ? <div className="error-container">*{err}</div> : <></>}
        <div className="btn-container">
          <button type="submit" className="submit btn" onClick={(e) => (!loading ? onSubmitClick(e) : "")}>
            {loading ? <Lottie options={lottieOptions} width={50} height={30} /> : "Submit"}
          </button>
          <button type="reset" id="reset-btn" className="reset btn" onClick={() => onResetClick()}>
            Reset
          </button>
        </div>
      </form>
      {userAdded ? (
        <div className="user-added-container">
          <div className={`content ${userAdded ? "active" : ""}`}>
            <img src={Done} alt="done" />
            Successfully added the Administrator
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default AddAdministrator;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    text-align: center;
    margin-bottom: 20px;
    color: var(--theme1);
    font-size: var(--heading);
    font-weight: var(--font-w-700);
    text-transform: uppercase;
  }

  .form-container {
    width: 70%;

    .half-container {
      /* display: flex; */
      /* align-items: center;
      justify-content: center; */
      /* column-gap: 30px; */
    }

    .error-container {
      font-size: var(--small);
      color: var(--btn-red);
      text-align: center;
      margin-top: 20px;
    }
  }

  .user-added-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);

    .content {
      width: max-content;
      height: max-content;
      padding: 20px 50px;
      background-color: var(--theme1);
      font-size: var(--small);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 20px;
      transition: all 0.3s ease;
      transform-origin: center;
      opacity: 0;
      animation: zoomInOut 1s alternate infinite ease-in-out;

      img {
        width: 20px;
      }

      &.active {
        opacity: 1;
      }

      @keyframes zoomInOut {
        0% {
          transform: scale(0.98);
        }

        100% {
          transform: scale(1);
        }
      }
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
    margin-top: 20px;

    .btn {
      flex: 1;
      height: 45px;
      background-color: var(--theme1);
      font-size: var(--small);
      color: var(--white);
      border: none;
      outline: none;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--btn-color-alt);
      }

      &.reset {
        background-color: var(--btn-red);

        &:hover {
          background-color: var(--btn-red-alt);
        }
      }
    }
  }

  @media only screen and (max-width: 630px) {
    .form-container {
      width: 100%;
    }
  }
`;
