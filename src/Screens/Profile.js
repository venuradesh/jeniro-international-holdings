import React, { useState } from "react";
import styled from "styled-components";

//images
import User from "../assets/user.png";
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import Header from "../Components/Header";
import InputFeild from "../Components/InputFeild";
import Login from "../Components/Login";

function Profile() {
  const [loginClicked, setLoginClicked] = useState(false);
  const [aboutUsClicked, setAboutUsClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);

  return (
    <Container>
      <Header scrolled={true} loginClick={setLoginClicked} aboutUsClick={setAboutUsClicked} contactClick={setContactClicked} />
      {aboutUsClicked || contactClicked || loginClicked ? (
        <div className="container-wrapper">
          <div className="blured-background"></div>
          {loginClicked ? <Login loginClick={setLoginClicked} /> : contactClicked ? <Contact contactClick={setContactClicked} /> : aboutUsClicked ? <AboutUs aboutUsClick={setAboutUsClicked} /> : <></>}
        </div>
      ) : (
        <></>
      )}
      <LeftPanel>
        <div className="user-cover">
          <img src={User} alt="user" />
        </div>
        <div className="name-container">Venura Warnasooriya</div>
        <div className="status-container">Registered</div>
        <div className="basic-info">
          <div className="nic item">981912063V</div>
          <div className="address item">Gampola, Sri Lanka</div>
          <div className="email item">venurawarnasooriya@gmail.com</div>
          <div className="phone item">0701500544</div>
        </div>
      </LeftPanel>
      <RightSection>
        <div className="other-information">
          <div className="education item">
            Education: <span>BCS</span>
          </div>
          <div className="job-type item">
            Job Type: <span>Nurse</span>{" "}
          </div>
          <div className="professional item">
            Professional Qualifications: <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ut quisquam optio ab nemo nam eaque, odit natus corporis laboriosam est reprehenderit molestiae. Enim neque ipsum quae. Vel, a adipisci.</span>
          </div>
        </div>
        <div className="edit-section">
          <div className="title">Edit Section</div>
          <div className="content">
            <div className="password-edit edit">
              <div className="section-about">Edit Password: </div>
              <InputFeild type="text" content={"Current Passowrd"} id="current-pass" />
              <InputFeild type="text" content={"New Passowrd"} id="new-pass" />
            </div>
            <div className="email-edit edit">
              <div className="section-about">Edit Email: </div>
              <InputFeild type="email" content="New Email" id="new-email" />
            </div>
            <div className="edit-phone edit">
              <div className="section-about">Edit Phone Number: </div>
              <InputFeild type="tel" content="New Phone Number" id="new-phone" />
            </div>
            <div className="edit edit-edu">
              <div className="section-about">Edit maximum Education: </div>
              <InputFeild type="text" content="Maximum Education" id="max-edt" />
            </div>
            {/* <div className="error-container">*No inputs to update</div> */}
            <div className="btn-container">
              <div className="update btn">Update</div>
              <div className="reset btn">Reset</div>
            </div>
          </div>
        </div>
      </RightSection>
    </Container>
  );
}

export default Profile;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
  position: relative;
  padding: 30px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 50px;

  .container-wrapper {
    width: 100%;
    height: 100vh;
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
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  height: 90%;
  max-width: 330px;
  min-width: 300px;
  background-color: var(--theme1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: relative;
  top: 40px;
  margin-top: auto;
  margin-bottom: auto;

  .user-cover {
    width: 50%;
    margin-inline: auto;
    aspect-ratio: 1/1;
    margin-top: 10%;
    padding: 20px;

    img {
      width: 100%;
      position: relative;
      left: 8%;
    }
  }

  .name-container {
    font-size: var(--heading);
    padding-inline: 20px;
    text-align: center;
    color: var(--white);
    margin-top: -20px;
  }

  .status-container {
    font-size: var(--small);
    color: var(--white);
    width: 80%;
    text-align: center;
    margin-inline: auto;
    background-color: var(--btn-red);
    padding: 15px 0;
    border-radius: 50px;
  }

  .basic-info {
    height: 100%;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .item {
      color: var(--white);
      font-size: var(--small);
    }
  }
`;

const RightSection = styled.div`
  flex: 2;
  height: 90%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: relative;
  top: 40px;
  margin-top: auto;
  margin-bottom: auto;

  .other-information {
    background-color: white;
    box-shadow: 0 0 5px 0 var(--gray);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    color: var(--theme1);

    .item {
      font-size: var(--small);
      font-weight: var(--font-w-300);

      span {
        font-weight: var(--font-w-700);
      }
    }
  }

  .edit-section {
    height: max-content;
    background-color: white;
    box-shadow: 0 0 5px 0 var(--gray);
    border-radius: 12px;
    padding: 40px;

    .title {
      font-size: var(--heading);
      color: var(--theme1);
      font-weight: var(--font-w-700);
    }

    .edit {
      display: flex;
      align-items: flex-end;
      column-gap: 30px;
      font-size: var(--small);

      .section-about {
        width: max-content;
        white-space: nowrap;
      }
    }

    .error-container {
      margin-top: 20px;
      margin-bottom: -10px;
      color: var(--btn-red);
      text-align: center;
      font-size: var(--small);
    }

    .btn-container {
      display: flex;
      width: 100%;
      margin-top: 30px;
      column-gap: 20px;
      justify-content: space-between;

      .btn {
        flex: 1;
        padding: 15px 20px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--white);
        font-size: var(--small);

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
`;
