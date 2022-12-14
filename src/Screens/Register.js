import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as animationData from "../assets/Lotties/submit-loading.json";

//component
import Header from "../Components/Header";
import Login from "../Components/Login";
import Contact from "../Components/Contact";
import AboutUs from "../Components/AboutUs";
import InputFeild from "../Components/InputFeild";

//images
import Wallpaper from "../assets/wallpaper3.jpg";
import Logo from "../assets/logo.png";

// const API_URL = "http://localhost:5000";
const API_URL = "https://janiromoving-backend.herokuapp.com";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [aboutUsClicked, setAboutUsClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nicError, setNICError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTypes, setJobTypes] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNIC] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [professionalQualifications, setProfessionalQualifications] = useState("");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  });

  const onSubmitClick = (e) => {
    e.preventDefault();
    setLoading(true);
    if (firstName && password && nic && lastName && address && email && phone && jobTypes && qualifications && professionalQualifications) {
      setError("");
      axios
        .post(`${API_URL}/register`, {
          firstName,
          lastName,
          password,
          address,
          email,
          phone,
          nic,
          jobTypes,
          qualifications,
          professionalQualifications,
        })
        .then((result) => {
          if (result.status === 201) {
            localStorage.setItem("user", result.data.userId);
            document.getElementById("reset-btn").click();
            setLoading(false);
            navigate("/");
          } else {
            console.log(result);
          }
        })
        .catch((err) => {
          if (err.response.status >= 400) {
            setLoading(false);
            setError(err.response.data.message);
            setEmailError(err.response.data.emailError);
            setPhoneError(err.response.data.phoneError);
            setNICError(err.response.data.nicError);
          }
        });
    } else {
      setError("One or more fields missing");
      setLoading(false);
    }
  };

  const onResetClick = () => {
    setEmailError(false);
    setPhoneError(false);
    setError(false);
    setFirstName("");
    setLastName("");
    setAddress("");
    setEmail("");
    setPhone("");
    setJobTypes("");
    setPassword("");
    setQualifications("");
    setProfessionalQualifications("");
  };

  return (
    <Container id="register-container">
      <Header scrolled={scrolled} loginClick={setLoginClicked} aboutUsClick={setAboutUsClicked} contactClick={setContactClicked} registerPage={true} />
      {aboutUsClicked || contactClicked || loginClicked ? (
        <div className="container-wrapper">
          <div className="blured-background">
            <img src={Logo} alt="company-logo" />
          </div>
          {loginClicked ? <Login loginClick={setLoginClicked} /> : contactClicked ? <Contact contactClick={setContactClicked} /> : aboutUsClicked ? <AboutUs aboutUsClick={setAboutUsClicked} /> : <></>}
        </div>
      ) : (
        <></>
      )}
      <div className="background-tint"></div>
      <RegisterContainer>
        <div className="brand">
          <div className="brand-logo">
            <img src={Logo} alt="company-logo" />
          </div>
          <div className="brand-name">Jeniro International Holding Pvt Ltd</div>
        </div>
        <div className="register-container">
          <div className="title">Registration</div>
          <div className="form">
            <div className="left-side-container">
              <div className="name-container half-container">
                <InputFeild type="text" content="First Name" id="first-name" onChange={(e) => setFirstName(e.target.value)} />
                <InputFeild type="text" content="Last Name" id="last-name" onChange={(e) => setLastName(e.target.value)} />
              </div>
              <InputFeild type="text" content="Address" id="address" onChange={(e) => setAddress(e.target.value)} />
              <div className="contact-container half-container">
                <InputFeild type="email" content="Email" id="email" onChange={(e) => setEmail(e.target.value)} error={emailError} />
                <InputFeild type="tel" content="Contact No." id="phone" onChange={(e) => setPhone(e.target.value)} error={phoneError} />
              </div>
              <div className="qul-passoword-container half-container">
                <InputFeild type="text" content="NIC No." onChange={(e) => setNIC(e.target.value)} error={nicError} />
                <InputFeild type="password" content="Password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <InputFeild type="text" content="Job Types preffered (comma separated)" id="job-types" onChange={(e) => setJobTypes(e.target.value)} />
              <InputFeild type="text" content="Maximum Educational Qualification (eg: Bachelors, Masters, Advanced Level)" id="edu-qualification" onChange={(e) => setQualifications(e.target.value)} />
              {/* <div className="btn-container">
                <div className="edu-qualifications-btn btn">
                  <input type="file" name="edu-qualifcations-upload" id="edu-qualifications-upload" />
                  Upload Educational Certificates
                </div>
                <div className="passport-copy-btn btn">
                  <input type="file" name="passport-copy-upload" id="passport-copy-upload" />
                  upload passport copy
                </div>
              </div> */}
              <textarea name="professional-qualifications" id="professional-qualifications" placeholder="Professional Qualifications" onChange={(e) => setProfessionalQualifications(e.target.value)}></textarea>
              {error ? <div className="error-container">*{error}</div> : <></>}
              <div className="btn-container">
                <div className="submit btn" onClick={(e) => (!loading ? onSubmitClick(e) : "")}>
                  {loading ? <Lottie options={lottieOptions} width={50} height={30} /> : "Submit"}
                </div>
                <button type="reset" id="reset-btn" className="reset btn" onClick={() => onResetClick()}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </RegisterContainer>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  height: max-content;
  background-image: url(${Wallpaper});
  background-size: cover;
  background-position: center;
  object-fit: cover;
  background-repeat: no-repeat;
  position: relative;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--theme1);
  }

  .container-wrapper {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .blured-background {
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }

  .background-tint {
    background-color: var(--theme1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.7;
    z-index: -1;
  }
`;

const RegisterContainer = styled.form`
  width: 55%;
  height: max-content;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 70px;
  margin: 0 auto;
  margin-bottom: 100px;
  z-index: -1;

  .brand {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;

    .brand-logo {
      img {
        width: 80px;
      }
    }

    .brand-name {
      color: var(--white);
      text-shadow: 0 3px 4px var(--theme1);
      text-transform: capitalize;
    }
  }

  .register-container {
    padding: 20px;
    width: 100%;
    height: 80%;
    background-color: var(--white);
    box-shadow: 0 0 10px 0 var(--theme1);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .title {
      text-align: center;
      font-size: 1.3rem;
      text-transform: uppercase;
      color: var(--theme1);
      font-weight: var(--font-w-700);
    }

    .form {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      column-gap: 30px;
      margin-bottom: 20px;

      .left-side-container {
        width: 100%;
        height: 100%;

        .half-container,
        .btn-container {
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 30px;
        }

        .btn-container {
          width: 100%;
          margin-top: 20px;

          .btn {
            width: 100%;
            height: 50px;
            background-color: var(--theme1);
            color: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--small);
            text-align: center;

            input[type="file"] {
              display: none;
            }
          }
        }

        textarea {
          margin-top: 20px;
          width: 100%;
          height: 200px;
          resize: none;
          border: 1px solid var(--theme1);
          outline: none;
          background-color: var(--white);
          font-size: var(--normal);
          font-family: var(--font-family1);

          &::placeholder {
            font-size: var(--small);
            font-family: var(--font-family1);
          }
        }

        .btn-container {
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 30px;

          .btn {
            width: 100%;
            height: 50px;
            cursor: pointer;
            color: var(--white);
            font-size: var(--small);

            &.submit {
              background-color: var(--btn-color);

              &:hover {
                background-color: var(--btn-color-alt);
              }
            }

            &.reset {
              background-color: var(--btn-red);
              outline: none;
              border: none;

              &:hover {
                background-color: var(--btn-red-alt);
              }
            }
          }
        }

        .error-container {
          width: 100%;
          text-align: center;
          color: var(--btn-red);
          font-size: var(--small);
        }
      }
    }
  }

  @media only screen and (max-width: 930px) {
    width: 80%;
  }

  @media only screen and (max-width: 500px) {
    width: 85%;
    top: 100px;
    margin-bottom: 150px;

    .brand {
      display: none;
    }

    .register-container {
      .form {
        .left-side-container {
          .half-container,
          .btn-container {
            flex-direction: column;
          }

          .btn-container {
            row-gap: 20px;
          }
        }
      }
    }
  }
`;
