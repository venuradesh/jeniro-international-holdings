import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

//images
import Wallpaper from "../assets/wallpaper1.jpg";
import DownArraw from "../assets/down-arrow.png";
import Header from "../Components/Header";
import AboutUs from "../Components/AboutUs";
import Contact from "../Components/Contact";
import Login from "../Components/Login";
import JobTile from "../Components/JobTile";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function LandingPage() {
  const [jobTypeClicked, setJobTypeClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [aboutUsClicked, setAboutUsClicked] = useState(false);
  const [contactClicked, setContactClicked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

    axios
      .get(`${API_URL}/getJobs`)
      .then((result) => {
        if (!result.data.error) {
          if (result.data.jobs.length === 0) {
          } else {
            setResults(result.data.jobs);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
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
      <div className="background-image"></div>
      <div className="background-tint"></div>
      <HeroContainer>
        <div className="content-container">
          <div className="title">
            <div>Browse. Apply.</div>
            <div>Prepare for your Future</div>
          </div>
          <div className="desc">Find jobs, Employment and Career opportunities</div>
          <div className="input-field-container">
            <input placeholder="Job Title" type="text" name="keyword" id="job-title" className="job-title" />
            <div className={`select ${jobTypeClicked ? "active" : ""}`} onClick={() => (!jobTypeClicked ? setJobTypeClicked(true) : setJobTypeClicked(false))}>
              <select name="job-type" id="job-type" className="job-type" defaultValue={"none"}>
                <option value="none" hidden className="select-item">
                  Job Type
                </option>
                <option value="Nursing" className="select-item">
                  Nursing
                </option>
                <option value="Engineering" className="select-item">
                  Engineering
                </option>
                <option value="Doctor" className="select-item">
                  Doctor
                </option>
              </select>
            </div>
            <div className="search-btn">Search</div>
          </div>
        </div>
        <div className="scroll-down">
          <img src={DownArraw} alt="move-down" />
        </div>
      </HeroContainer>
      <JobContainer>
        <div className="jobs-panel">
          {results.length !== 0 &&
            results.map((job) => (
              <>
                <JobTile jobDetails={job.jobDetails} id={job.id} key={job.id} />
              </>
            ))}
        </div>
      </JobContainer>
      <Footer>&copy;2022, Jeniro International Holdings Pvt Ltd</Footer>
    </Container>
  );
}

export default LandingPage;

const Container = styled.div`
  width: 100vw;
  height: max-content;
  position: relative;
  z-index: 0;

  .background-image {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${Wallpaper});
    background-position: center;
    background-size: cover;
    object-fit: cover;
    z-index: -1;
  }

  .background-tint {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--theme1);
    opacity: 0.7;
    z-index: -1;
  }

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

const HeroContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 20vh;
  position: relative;

  .scroll-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--white);
    font-weight: var(--font-w-300);
    display: flex;
    align-items: center;
    column-gap: 10px;

    img {
      width: 30px;
      position: relative;
      animation: moveDown 0.5s ease-in-out alternate infinite;
    }

    @keyframes moveDown {
      0% {
        top: -5px;
      }

      100% {
        top: 5px;
      }
    }
  }

  .content-container {
    display: flex;
    flex-direction: column;

    .title {
      div {
        font-size: var(--main-heading);
        color: var(--white);
        font-weight: var(--font-w-600);
        text-transform: capitalize;
      }
    }

    .desc {
      font-size: var(--normal);
      color: var(--white);
      font-weight: var(--font-w-300);
      margin-top: 15px;
    }

    .input-field-container {
      margin-top: 25px;
      display: flex;
      align-items: center;
      column-gap: 20px;

      .job-title {
        width: 200px;
        height: 50px;
        border-radius: 8px;
        background-color: var(--white);
        border: none;
        outline: none;
        padding: 5px 10px;
        font-size: var(--normal);
      }

      .select {
        width: 200px;
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

      .search-btn {
        width: 200px;
        height: 50px;
        background-color: var(--btn-color);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        font-size: var(--normal);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }
    }
  }

  @media only screen and (max-width: 1080px) {
    padding: 0;
    justify-content: center;
  }

  @media only screen and (max-width: 768px) {
    .content-container {
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div {
          text-align: center;
        }
      }

      .desc {
        text-align: center;
        margin-bottom: 20px;
      }

      .input-field-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        row-gap: 20px;
      }
    }
  }

  @media only screen and (max-width: 425px) {
    .content-container {
      .input-field-container {
        .job-title {
          width: 85%;
        }

        .select {
          width: 85%;

          .job-type {
            width: 100%;
          }
        }

        .search-btn {
          width: 85%;
        }
      }
    }
  }
`;

const JobContainer = styled.div`
  height: max-content;
  padding-top: 30px;
  padding-inline: 30px;
  display: flex;
  column-gap: 30px;
  align-items: flex-start;

  .jobs-panel {
    width: 80%;
    margin-inline: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    row-gap: 20px;
    padding: 10px;
  }

  @media only screen and (max-width: 980px) {
    .jobs-panel {
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
