import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import * as animationData from "../assets/Lotties/submit-loading.json";

//images
import User from "../assets/user.png";
import Cover from "../assets/wallpaper3.jpg";
import Done from "../assets/checked.png";

//components
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import InputFeild from "../Components/InputFeild";
import Login from "../Components/Login";
import Loading from "./Loading";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Profile() {
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [aboutUsClicked, setAboutUsClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [componentRerender, setComponentRerender] = useState({ status: false });
  const [updateclicked, setUpdateClicked] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [porfQul, setProfQul] = useState([]);

  useEffect(() => {
    setLoading(true);
    componentRerender.status = false;

    window.addEventListener("scroll", () => {
      if (window.scrollY >= 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

    axios
      .get(`${API_URL}/getUser`, {
        headers: {
          userid: localStorage.getItem("user"),
        },
      })
      .then((res) => {
        setLoading(false);
        setUserData(res.data.userData);
        setProfQul(res.data.userData.professionalQualifications ? res.data.userData.professionalQualifications.split("\n") : []);
        if (res.data.userData.status === "Registered") {
          setStatus(["Registered"]);
        } else if (res.data.userData.status === "First Payment") {
          setStatus(["Registered", "First Payment"]);
        } else if (res.data.userData.status === "Second Payment") {
          setStatus(["Registered", "First Payment", "Second Payment"]);
        } else if (res.data.userData.status === "Job offer given") {
          setStatus(["Registered", "First Payment", "Second Payment", "Job offer given"]);
        } else if (res.data.userData.status === "Third Payment") {
          setStatus(["Registered", "First Payment", "Second Payment", "Job offer given", "Third Payment"]);
        } else {
          setStatus(["Registered", "First Payment", "Second Payment", "Job offer given", "Third Payment", "Visa"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [componentRerender]);

  const onUpdateClick = (e) => {
    e.preventDefault();
    setError("");
    setUpdateClicked(true);
    if ((currentPassword && newPassword) || email || newPhone) {
      const formData = new FormData();

      formData.append("oldPassword", currentPassword);
      formData.append("newPassword", newPassword);
      formData.append("email", email);
      formData.append("phone", newPhone);
      formData.append("userid", localStorage.getItem("user"));

      axios
        .put(`${API_URL}/updateUserInfo`, formData)
        .then((response) => {
          if (!response.data.error) {
            document.getElementById("reset-btn").click();
            onResetBtnClick();
            setUpdateComplete(true);
            setUpdateClicked(false);
            setTimeout(() => {
              setComponentRerender({ status: true });
              setUpdateComplete(false);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log("err: ", err);
          if (err.response.data.error) {
            setError(err.response.data.message);
            setUpdateClicked(false);
          }
        });
    } else {
      setUpdateClicked(false);
      setError("No inputs to update");
    }
  };

  const onResetBtnClick = () => {
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setEmail("");
    setNewPhone("");
    setUpdateClicked(false);
  };

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <Container>
            <Header scrolled={scrolled} loginClick={setLoginClicked} aboutUsClick={setAboutUsClicked} contactClick={setContactClicked} />
            {aboutUsClicked || contactClicked || loginClicked ? (
              <div className="container-wrapper">
                <div className="blured-background"></div>
                {loginClicked ? <Login loginClick={setLoginClicked} /> : contactClicked ? <Contact contactClick={setContactClicked} /> : aboutUsClicked ? <AboutUs aboutUsClick={setAboutUsClicked} /> : <></>}
              </div>
            ) : (
              <></>
            )}
            <UpperPanel>
              <div className="cover">
                <div className="tint"></div>
              </div>
              <div className="profile">
                <div className="user-cover">
                  <img src={User} alt="user" />
                </div>
                <div className="name-container">
                  <div className="name">{userData.firstName + " " + userData.lastName}</div>
                  <div className="nic item">NIC: {userData.nic}</div>
                  <div className="email item">{userData.email}</div>
                </div>
              </div>
            </UpperPanel>
            <StausContainer>
              <div className={`status registered ${status.includes("Registered") ? "active" : ""}`}>
                <div className="dot"></div>
                <div className="content">Registered</div>
              </div>
              <div className={`status first-payment ${status.includes("First Payment") ? "active" : ""}`}>
                <div className="dot"></div>
                <div className="content">First Payment</div>
              </div>
              <div className={`status sec-payment ${status.includes("Second Payment") ? "active" : ""}`}>
                <div className="dot"></div>
                <div className="content">Second Payment</div>
              </div>
              <div className={`status job-offer ${status.includes("Job offer given") ? "active" : ""}`}>
                <div className="dot"></div>
                <div className="content">Job offer given</div>
              </div>
              <div className={`status third-payment ${status.includes("Third Payment") ? "active" : ""}`}>
                <div className="dot"></div>
                <div className="content">Third Payment</div>
              </div>
              <div className={`status visa ${status.includes("Visa") ? "active" : ""}`}>
                <div className="dot"></div>
                <div className="content">Visa</div>
              </div>
            </StausContainer>
            <RightSection>
              <div className="basic-info">
                <div className="address item">
                  Address: <span>{userData.address}</span>
                </div>
                <div className="phone item">
                  Contact no: <span>{userData.phone}</span>
                </div>
                <div className="education item">
                  Education: <span>{userData.education}</span>
                </div>
                <div className="job-type item">
                  Job Type: <span>{userData.jobTypes}</span>{" "}
                </div>
                <div className="professional item">
                  <div className="title">Professional Qualifications:</div>
                  {porfQul.length !== 0 &&
                    porfQul.map((qul, key) => (
                      <div className="content" key={key}>
                        <span>{qul}</span>
                      </div>
                    ))}
                </div>
              </div>
              <form className="edit-section">
                <div className="title">Edit Section</div>
                <div className="content">
                  <div className="password-edit edit">
                    <div className="section-about">Edit Password: </div>
                    <InputFeild type="text" content={"Current Passowrd"} id="current-pass" onInput={(e) => setCurrentPassword(e.target.value)} />
                    <InputFeild type="text" content={"New Passowrd"} id="new-pass" onInput={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div className="email-edit edit">
                    <div className="section-about">Edit Email: </div>
                    <InputFeild type="email" content="New Email" id="new-email" onInput={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="edit-phone edit">
                    <div className="section-about">Edit Phone Number: </div>
                    <InputFeild type="tel" content="New Phone Number" id="new-phone" onInput={(e) => setNewPhone(e.target.value)} />
                  </div>
                  {error ? <div className="error-container"> *{error}</div> : <></>}
                  <div className="btn-container">
                    <button type="submit" id="reset-btn" className="update btn" onClick={(e) => (!updateclicked ? onUpdateClick(e) : "")}>
                      {updateclicked ? <Lottie options={lottieOptions} width={30} /> : "Update"}
                    </button>
                    <button type="reset" className="reset btn" onClick={() => onResetBtnClick()}>
                      Reset
                    </button>
                  </div>
                </div>
                {updateComplete ? (
                  <div className="popup-container">
                    <div className="content">
                      <img src={Done} alt="checked" />
                      Updated Successfully!
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </RightSection>
          </Container>
          <Footer>&copy;2022, Jeniro International Holdings Pvt Ltd</Footer>
        </>
      )}
    </>
  );
}

export default Profile;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: max-content;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const UpperPanel = styled.div`
  width: 100%;
  position: relative;

  .cover {
    width: 100%;
    height: 30%;
    max-height: 400px;
    min-height: 300px;
    background-image: url(${Cover});
    background-size: cover;
    background-position: center;
    position: relative;

    .tint {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: var(--theme1);
      opacity: 0.7;
    }
  }

  .profile {
    display: flex;
    align-items: flex-start;
    column-gap: 20px;
    position: absolute;
    top: 60%;
    left: 10%;

    .user-cover {
      background-color: var(--theme1);
      padding: 20px;
      border-radius: 12px;

      img {
        position: relative;
        left: 5%;
      }
    }

    .name-container {
      .name {
        font-size: var(--heading);
        color: var(--white);
      }

      .nic,
      .email {
        color: var(--btn-color-alt);
        font-size: var(--small);
      }
    }
  }

  @media only screen and (max-width: 930px) {
    .cover {
      min-height: 400px;
    }

    .profile {
      top: 50%;
      transform: translateY(-50%);
      left: 30px;
      align-items: center;

      .user-cover {
        img {
          width: 70px;
          left: 8%;
        }
      }
    }
  }

  @media only screen and (max-width: 730px) {
    .profile {
      .user-cover {
        padding: 10px;

        img {
          width: 50px;
        }
      }

      .name-container {
        .name {
          font-size: var(--normal);
        }

        .nic,
        .email {
          font-size: var(--ex-small);
        }
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .profile {
      top: 100px;
      left: 50%;
      transform: translateX(-50%);

      .name-container {
        .name {
          font-size: var(--heading);
        }
      }
    }
  }
`;

const StausContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  display: flex;

  .status {
    display: flex;
    column-gap: 10px;
    flex-direction: column;
    row-gap: 10px;
    display: flex;
    align-items: center;
    width: 130px;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--white);
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 100px;
        border-bottom: 2px dashed var(--white);
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .content {
      font-size: var(--small);
      color: var(--white);
    }

    &.active {
      .dot {
        background-color: #54ff80;

        &:after {
          border-bottom: 2px dashed #54ff80;
        }
      }

      .content {
        color: #54ff80;
      }
    }

    &.visa {
      .dot {
        &::after {
          width: 0;
          border: none;
        }
      }
    }
  }

  @media only screen and (max-width: 930px) {
    flex-direction: column;
    row-gap: 30px;
    right: 30px;

    .status {
      flex-direction: row;

      .dot {
        &::after {
          width: 0px;
          height: 30px;
          border: none;
          border-left: 2px dashed var(--white);
          left: 40%;
          /* transform: translateX(-50%); */
          top: 28px;
        }
      }

      &.active {
        .dot {
          &::after {
            border: none;
            border-right: 2px dashed #54ff80;
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    row-gap: 20px;
    width: max-content;

    .status {
      width: max-content;

      .dot {
        &::after {
          height: 20px;
          top: 22px;
        }
      }
    }
  }
`;

const RightSection = styled.div`
  position: relative;
  top: 80px;
  padding: 0 10%;
  display: flex;
  column-gap: 50px;

  .basic-info {
    width: 40%;
    height: max-content;
    background-color: white;
    box-shadow: 0 0 5px 0 var(--gray);
    padding: 20px;
    border-radius: 12px;

    .item {
      font-size: var(--small);
      margin-bottom: 10px;
      color: var(--theme1);
      font-weight: var(--font-w-300);

      span {
        font-weight: var(--font-w-500);
        margin-left: 10px;
      }

      &.professional {
        .title {
          margin-bottom: 10px;
        }
      }

      &.professional {
        display: flex;
        flex-direction: column;

        span {
          margin-top: 10px;
          margin-left: 20px;
          line-height: 20px;
        }
      }
    }
  }

  .edit-section {
    width: calc(60% - 20px);
    box-shadow: 0 0 5px 0 var(--gray);
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    height: max-content;
    position: relative;

    .popup-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;

      .content {
        width: 60%;
        height: 60px;
        background-color: var(--theme1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 20px;
        font-size: var(--small);
        color: var(--white);
        animation: zoomInOut 1s alternate infinite ease-in-out;

        img {
          width: 20px;
        }
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

    .title {
      font-size: var(--heading);
      color: var(--theme1);
    }

    .content {
      .edit {
        display: flex;
        column-gap: 20px;
        align-items: flex-end;
        font-size: var(--small);

        .section-about {
          white-space: nowrap;
        }
      }
    }

    .error-container {
      font-size: var(--small);
      color: var(--btn-red);
      text-align: center;
      margin-top: 20px;
      margin-bottom: -10px;
    }

    .btn-container {
      display: flex;
      align-items: center;
      margin-top: 30px;
      column-gap: 20px;

      .btn {
        flex: 1;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        outline: none;

        &.update {
          background-color: var(--btn-color);

          &:hover {
            background-color: var(--btn-color-alt);
          }
        }

        &.reset {
          background-color: var(--btn-red);

          &:hover {
            background-color: var(--btn-red-alt);
          }
        }
      }
    }
  }

  @media only screen and (max-width: 930px) {
    flex-direction: column;
    row-gap: 30px;
    top: 20px;
    padding: 0 30px;
    margin-inline: auto;

    .basic-info {
      width: 100%;
    }

    .edit-section {
      width: 100%;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--theme1);
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: var(--small);
`;
