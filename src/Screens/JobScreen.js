import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

//images
import Back from "../assets/back.png";
import Loading from "./Loading";
import Point from "../assets/point.png";
import JobApply from "../Components/JobApply";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function JobScreen({ admin = false }) {
  const jobid = useParams().id;
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState(null);
  const [jobRequirements, setJobRequirements] = useState([]);
  const [jobResponsibilities, setJobResponsibilities] = useState([]);
  const [applyBtnClicked, setApplyBtnClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/job`, {
        headers: {
          jobid: jobid,
        },
      })
      .then((res) => {
        setLoading(false);
        if (!res.data.error) {
          setJobDetails(res.data.jobData);
          setJobRequirements(res.data.jobData.requirements ? res.data.jobData.requirements.split("\n") : []);
          setJobResponsibilities(res.data.jobData.responsibilities ? res.data.jobData.responsibilities.split("\n") : []);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobid]);

  return (
    <Container>
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <>
          <div className="back-btn" onClick={() => navigate(-1)}>
            <img src={Back} alt="back-btn" />
          </div>
          <LeftSection cover={jobDetails.jobCover}>
            <div className="cover-section">
              <div className="tint"></div>
            </div>
            <div className="content">
              <div className="title">{jobDetails.jobTitle}</div>
              <div className="job-overview">{jobDetails.jobOverview}</div>
              <div className="btn-container">
                {admin ? (
                  <></>
                ) : (
                  <>
                    <div className="apply btn" onClick={() => setApplyBtnClicked(true)}>
                      Apply Now
                    </div>
                    {applyBtnClicked ? <JobApply jobName={jobDetails.jobTitle} setApply={setApplyBtnClicked} /> : <></>}
                  </>
                )}
              </div>
            </div>
          </LeftSection>
          <MiddleSection>
            <div className="requirements item">
              <div className="title">Job Requirements</div>
              <div className="content">
                {jobRequirements.length !== 0 &&
                  jobRequirements.map((req, key) => (
                    <div className="container" key={key}>
                      <img src={Point} alt="point" />
                      {req}
                    </div>
                  ))}
              </div>
            </div>
            <div className="job-res item">
              <div className="title">Job Responsibilities</div>
              <div className="content">
                {jobResponsibilities.length !== 0 &&
                  jobResponsibilities.map((res, key) => (
                    <div className="container" key={key}>
                      <img src={Point} alt="point" />
                      {res}
                    </div>
                  ))}
              </div>
            </div>
          </MiddleSection>
          <RightSection>
            <div className="job-cat item">
              Job Category: <span>{jobDetails.jobCategroy}</span>
            </div>
            <div className="job-type item">
              Job Type: <span>{jobDetails.jobType}</span>
            </div>
            <div className="salary item">
              Salary: <span>{jobDetails.salary ? `$ ${jobDetails.salary}` : "not mentioned"}</span>
            </div>
            <div className="experience item">
              Experience Required: <span>{jobDetails.experience}</span>
            </div>
            <div className="deadline item">
              Application deadline: <span>{jobDetails.applicationDeadline}</span>
            </div>
          </RightSection>
        </>
      )}
    </Container>
  );
}

export default JobScreen;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  column-gap: 50px;
  padding: 50px 30px;
  background-color: var(--white);
  z-index: 0;

  .loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-btn {
    background-color: var(--theme1);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }

    img {
      width: 30px;
    }
  }

  @media only screen and (max-width: 1250px) {
    column-gap: 20px;
  }

  @media only screen and (max-width: 1080px) {
    flex-direction: column;
    row-gap: 30px;
    height: max-content;
    width: 100vw;
    min-height: 100vh;
  }
`;

const LeftSection = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  flex: 1;
  box-shadow: 0 0 5px 0 var(--gray);
  height: max-content;

  .cover-section {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: var(--theme1);
    background-image: url(${(props) => props.cover});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    object-fit: cover;
    position: relative;

    .tint {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--theme1);
      opacity: 0.5;
    }
  }

  .content {
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .title {
      font-size: var(--heading);
      font-weight: var(--font-w-600);
      color: var(--theme1);
      text-align: center;
      line-height: 2.2rem;
    }

    .job-overview {
      text-align: center;
      font-size: var(--small);
      color: var(--btn-color-alt);
    }

    .btn-container {
      width: 100%;
      margin-top: auto;

      a {
        text-decoration: none;
      }

      .btn {
        width: 100%;
        height: 50px;
        background-color: var(--theme1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        color: var(--white);
        font-size: var(--small);
        font-weight: var(--font-w-700);
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }
    }
  }

  @media only screen and (max-width: 1080px) {
    flex: 1;
    display: flex;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    max-height: 300px;
    align-items: center;

    .cover-section {
      flex: 1;
      width: 100%;
      height: 100%;
    }

    .content {
      flex: 2;
      height: max-content;
      padding: 30px 50px;
    }
  }

  @media only screen and (max-width: 685px) {
    column-gap: 20px;

    .content {
      padding: 0;
    }
  }

  @media only screen and (max-width: 560px) {
    flex-direction: column;
    row-gap: 20px;
    height: max-content;
    max-height: max-content;

    .cover-section {
      flex: 0;
      width: 100%;
      aspect-ratio: 2/1;
    }

    .content {
      flex: 0;
    }
  }
`;

const MiddleSection = styled.div`
  flex: 2;
  background-color: white;
  /* height: max-content; */
  padding: 20px 20px;
  border-radius: 12px;
  box-shadow: 0 0 5px 0 var(--gray);
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  .item {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .title {
      font-size: var(--heading);
      color: var(--theme1);
      font-weight: var(--font-w-700);
    }

    .content {
      font-size: var(--small);
      color: var(--theme1);
      font-weight: var(--font-w-300);
      line-height: 25px;

      .container {
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-left: 20px;

        img {
          width: 15px;
        }
      }
    }
  }

  @media only screen and (max-width: 1080px) {
    flex: 0;
    row-gap: 30px;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }

  @media only screen and (max-width: 560px) {
    .item {
      text-align: center;
    }
  }
`;

const RightSection = styled.div`
  flex: 1;
  background-color: var(--theme1);
  height: max-content;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .item {
    display: flex;
    align-items: flex-end;
    font-size: var(--small);
    color: var(--white);
    font-weight: var(--font-w-300);

    span {
      font-weight: var(--font-w-700);
      font-size: var(--normal);
      margin-left: 15px;
    }
  }

  @media only screen and (max-width: 1250px) {
    .item {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 10px;

      span {
        margin-left: 0;
      }
    }
  }

  @media only screen and (max-width: 1080px) {
    flex: 0;
    height: max-content;
    width: 100%;

    .item {
      flex-direction: row;

      span {
        margin-left: 20px;
      }
    }
  }
`;
