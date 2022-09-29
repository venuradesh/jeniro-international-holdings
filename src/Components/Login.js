import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import * as AnimationData from "../assets/Lotties/submit-loading.json";
import emailjs from "@emailjs/browser";

//images
import Cover from "../assets/wallpaper2.jpg";
import Logo from "../assets/logo.png";
import Close from "../assets/close.png";
import Back from "../assets/back.png";

//components
import InputFeild from "./InputFeild";

const API_URL = "http://localhost:5000";
// const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function Login({ loginClick, loginRequired = false }) {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNIC] = useState("");
  const [forgotPassowordClick, setForgotPasswordClick] = useState(false);
  let jobid = useParams().id;

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onSubmitClick = () => {
    setLoading(true);
    if (email && password && nic) {
      axios
        .get(`${API_URL}/login`, {
          headers: {
            email: email,
            password: password,
            nic: nic,
          },
        })
        .then((result) => {
          if (result.data.access === "granted") {
            setEmailError(false);
            setPasswordError(false);
            localStorage.setItem("user", result.data.userId);
            loginClick(false);
            if (result.data.admin === true) {
              localStorage.setItem("adminLogged", true);
              navigate("/admin");
            } else {
              if (loginRequired) {
                navigate(`/job/${jobid}`);
              } else {
                navigate("/");
              }
            }
            setLoading(false);
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err.response.data.access === "denied") {
            if (err.response.data.emailError) {
              setEmailError(true);
            } else if (err.response.data.passwordError) {
              setEmailError(false);
              setPasswordError(true);
            }
          }
          setLoading(false);
          setErr(err.response.data.message);
        });
    } else {
      setErr("One or more fields missing");
      setLoading(false);
    }
  };

  const sendEmailClick = () => {
    setErr("");
    setLoading(true);
    setEmailError(false);

    if (email) {
      axios
        .get(`${API_URL}/checkemail`, {
          headers: {
            email,
          },
        })
        .then((res) => {
          if (!res.data.error) {
            const newPassword = Date.now();
            emailjs
              .send(
                "service_67en5i3",
                "forgot_password101",
                {
                  client_email: email,
                  password: newPassword,
                },
                "E-GOGf90UO7IZEPmO"
              )
              .then((status) => {
                if (status.text === "OK") {
                  axios
                    .put(`${API_URL}/resetPassword`, {
                      newPassword: `${newPassword}`,
                      email: email,
                    })
                    .then((response) => {
                      if (response.data.status === "OK") {
                        setLoading(false);
                        setErr("Email sent. Check your email");
                      }
                    })
                    .catch((resetError) => console.log(resetError));
                }
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data.error) {
            setErr(err.response.data.message);
          }
        });
    } else {
      setErr("Enter your email");
      setLoading(false);
      setEmailError(true);
    }
  };

  return (
    <Container>
      <div className="cover-container">
        <div className="cover"></div>
        <div className="tint"></div>
        <div className="brand-container">
          <img src={Logo} alt="logo" className="logo-image" />
          <div className="brand-name">Jeniro International Holding Pvt Ltd</div>
        </div>
      </div>
      <div className="content-container">
        <div
          className="close-btn"
          onClick={() => {
            loginClick(false);
          }}
        >
          <img src={Close} alt="close-btn" className="close-btn-icon" />
        </div>
        <div className={`reset-container ${forgotPassowordClick ? "active" : ""}`}>
          <div className="title">Reset Password</div>
          <div className="input-items-container">
            <InputFeild type="email" content="Enter your email" id="reset-email" onChange={(e) => setEmail(e.target.value)} error={emailError} />
            <div className="content">
              <div className="ins">We'll send you an email with reseted password. You can use it to login and once you logged in, you can change the password at your profile.</div>
            </div>
          </div>
          {err ? <div className="error-container">*{err}</div> : <></>}

          <div className="btn-container">
            <div className="submit" onClick={() => (!loading ? sendEmailClick() : "")}>
              {loading ? <Lottie options={lottieOptions} width={60} height={30} /> : "Send Email"}
            </div>
            <div
              className="back-btn"
              onClick={() => {
                setForgotPasswordClick(false);
                setErr("");
                setEmailError(false);
                setEmail("");
              }}
            >
              <img src={Back} alt="back" />
            </div>
          </div>
        </div>

        <div className={`login-container ${!forgotPassowordClick ? "active" : ""}`}>
          <div className="title">Login</div>
          <div className="input-items-container">
            <InputFeild type="email" content="Email" id="email" onChange={(e) => setEmail(e.target.value)} error={emailError} />
            <InputFeild type="password" content="Password" id="password" onChange={(e) => setPassword(e.target.value)} error={passwordError} />
            <InputFeild type="NIC" content="NIC No" id="nic" onChange={(e) => setNIC(e.target.value)} error={passwordError} />
          </div>
          {err ? <div className="error-container">*{err}</div> : <></>}
          <div className="btn-container">
            <div
              className="forgot-password"
              onClick={() => {
                setForgotPasswordClick(true);
                setErr("");
                setEmailError(false);
                setEmail("");
              }}
            >
              Forgot password
            </div>
            <div className="submit" onClick={() => (!loading ? onSubmitClick() : "")}>
              {loading ? <Lottie options={lottieOptions} width={60} height={30} /> : "Submit"}
            </div>
          </div>
          <div className="create-acc" onClick={() => navigate("/register")}>
            create an account
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 800px;
  height: 500px;
  background-color: var(--white);
  display: flex;
  border-radius: 12px;
  box-shadow: 0 0 10px 0 var(--theme1);
  overflow: hidden;

  .cover-container {
    flex: 2;
    position: relative;
    z-index: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 30px;

    .cover {
      width: 100%;
      height: 100%;
      background-image: url(${Cover});
      background-size: cover;
      object-fit: cover;
      background-position: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
    }

    .tint {
      width: 100%;
      height: 100%;
      background-color: var(--theme1);
      opacity: 0.7;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .brand-container {
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .brand-name {
        color: var(--white);
        margin-top: 10px;
      }
    }
  }

  .content-container {
    width: 40%;
    height: 100%;
    padding: 20px;
    position: relative;

    .close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
      z-index: 10;

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

    .login-container,
    .reset-container {
      visibility: hidden;
      position: absolute;
      top: 0px;
      left: 100%;
      right: -100%;
      bottom: 0px;
      padding: 20px;
      transition: all 0.5s ease;
      background-color: var(--white);

      .title {
        font-size: var(--heading);
        text-transform: uppercase;
        font-weight: var(--font-w-600);
        color: var(--theme1);
        text-align: center;
      }

      .input-items-container {
        width: 100%;
      }

      .content {
        font-size: var(--ex-small);
        font-weight: var(--font-w-600);
        color: var(--btn-red);
        margin-top: 20px;
        text-align: center;
      }

      .error-container {
        text-align: center;
        font-size: var(--small);
        color: var(--btn-red);
        margin-top: 10px;
      }

      .btn-container {
        width: 100%;
        margin-top: 20px;

        .forgot-password {
          font-size: var(--small);
          text-align: center;
          margin-bottom: 20px;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;

          &:hover {
            text-decoration: underline;
            opacity: 1;
          }
        }

        .submit {
          width: 100%;
          height: 45px;
          background-color: var(--theme1);
          font-weight: var(--font-w-500);
          font-size: var(--small);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background-color: var(--theme1-alt);
          }
        }
      }

      &.active {
        visibility: visible;
        left: 0px;
        right: 0px;
      }
    }

    .reset-container {
      top: 20px;

      .btn-container {
        .back-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--theme1);
          border-radius: 50%;
          margin-top: 30px;
          cursor: pointer;

          img {
            width: 15px;
          }
        }
      }
    }

    .create-acc {
      position: absolute;
      bottom: 20px;
      font-size: var(--small);
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media only screen and (max-width: 860px) {
    width: 700px;
    height: 450px;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    max-height: 400px;
    height: 50%;
  }

  @media only screen and (max-width: 680px) {
    width: 50%;

    .cover-container {
      display: none;
    }

    .content-container {
      flex: 1;
    }
  }

  @media only screen and (max-width: 520px) {
    width: 80%;
    height: 60%;
  }
`;
