import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import InputFeild from "../InputFeild";
import Lottie from "react-lottie";
import animationData from "../../assets/Lotties/submit-loading.json";

//images
import Done from "../../assets/checked.png";

const API_URL = "http://localhost:5000";
// const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function AddJobs() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentAdded, setContentAdded] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [companyOverview, setCompanyOverview] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [jobOverview, setJobOverview] = useState("");
  const [jobRes, setJobRes] = useState("");
  const [jobReq, setJobReq] = useState("");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    isClickToPauseDisabled: true,
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    setLoading(true);
    if (companyName && workLocation && companyOverview && companyEmail && companyLogo && jobTitle && jobType && applicationDeadline && jobOverview && jobReq) {
      setError("");
      const formData = new FormData();
      formData.append("companyLogo", companyLogo, companyLogo.name);
      formData.append("companyName", companyName);
      formData.append("workLocation", workLocation);
      formData.append("companyOverview", companyOverview);
      formData.append("companyEmail", companyEmail);
      formData.append("companyPhone", companyPhone);
      formData.append("jobTitle", jobTitle);
      formData.append("jobType", jobType);
      formData.append("applicationDeadline", applicationDeadline);
      formData.append("salary", salary);
      formData.append("experience", experience);
      formData.append("jobOverview", jobOverview);
      formData.append("jobRes", jobRes);
      formData.append("jobReq", jobReq);
      formData.append("jobCreateBy", localStorage.getItem("user"));

      axios
        .post(`${API_URL}/addjob`, formData)
        .then((result) => {
          if (!result.data.error) {
            setContentAdded(true);
            setTimeout(() => {
              setLoading(false);
              setContentAdded(false);
              document.getElementById("reset-btn").click();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("You cannot leave required Fields Empty");
      setLoading(false);
    }
  };

  const onResetBtnClick = () => {
    setError("");
    setCompanyName("");
    setWorkLocation("");
    setCompanyOverview("");
    setCompanyEmail("");
    setCompanyPhone("");
    setCompanyLogo(null);
    setJobTitle("");
    setJobType("");
    setApplicationDeadline("");
    setSalary("");
    setExperience("");
    setJobOverview("");
    setJobRes("");
    setJobReq("");
    setLoading(false);
  };

  return (
    <>
      <Container>
        <div className="title-container">Add a Job</div>
        <form className="form-container">
          <div className="company-info item">
            <InputFeild type="text" content="*Company Name" id="*company-name" onInput={(e) => setCompanyName(e.target.value)} />
            <InputFeild type="text" content="*Work Location" id="*location" onInput={(e) => setWorkLocation(e.target.value)} />
          </div>
          <textarea name="company-overview" id="company-overview" className="company-overview overview" placeholder="*Company Overview" onInput={(e) => setCompanyOverview(e.target.value)}></textarea>
          <div className="company-email item">
            <InputFeild type="text" content="*Company email (not visible)" id="company-email" onInput={(e) => setCompanyEmail(e.target.value)} />
            <InputFeild type="tel" content="Company phone (not visible)" id="company-phone" onInput={(e) => setCompanyPhone(e.target.value)} />
          </div>
          <div className="company-logo" onClick={() => document.getElementById("company-logo").click()}>
            {companyLogo ? companyLogo.name : "*Add Company Logo"}
            <input type="file" name="company-logo" id="company-logo" accept="image/jpeg, image/jpg, image/png" onChange={(e) => setCompanyLogo(e.target.files[0])} />
          </div>
          <div className="job-main item">
            <InputFeild type="text" content="*Job Title" id="job-title" onInput={(e) => setJobTitle(e.target.value)} />
            <InputFeild type="text" content="*Job Type (Full Time, Part Time, Remote)" id="job-type" onInput={(e) => setJobType(e.target.value)} />
          </div>
          <div className="job-details item">
            <InputFeild type="text" content="*Application Deadline (YYYY-MM-DD)" id="application-deadline" onInput={(e) => setApplicationDeadline(e.target.value)} />
            <InputFeild type="number" content="Salary Per Month in $" id="Salary per month" onInput={(e) => setSalary(e.target.value)} />
            <InputFeild type="text" content="Working Experiance Required" id="*working-experience" onInput={(e) => setExperience(e.target.value)} />
          </div>
          <div className="job-overview item">
            <textarea name="job-overview" id="job-overview" className="job-overview overview" placeholder="*Job Overview (max 120ch)" onInput={(e) => setJobOverview(e.target.value)} maxLength={120}></textarea>
            <textarea name="job-resp" id="job-resp" className="job-resp overview" placeholder="Job Responsibilities" onInput={(e) => setJobRes(e.target.value)}></textarea>
          </div>
          <textarea name="job-req" id="job-req" className="job-req overview" placeholder="*Job Requirements" onInput={(e) => setJobReq(e.target.value)}></textarea>
          {error ? <div className="error-container">*{error}</div> : <></>}
          <div className="btn-container item">
            <button type="submit" className="submit btn" onClick={(e) => (!loading ? onSubmitClick(e) : "")}>
              {loading ? <Lottie options={lottieOptions} width={50} /> : "Submit"}
            </button>
            <button type="reset" id="reset-btn" className="reset btn" onClick={() => onResetBtnClick()}>
              Reset
            </button>
          </div>
        </form>
      </Container>
      {contentAdded ? (
        <SuccessContainer>
          <div className="content">
            <img src={Done} alt="done" />
            Successfully added the Job
          </div>
        </SuccessContainer>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddJobs;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  padding-bottom: 20px;
  position: relative;

  .title-container {
    font-size: var(--heading);
    text-transform: uppercase;
    color: var(--theme1);
    text-align: center;
    margin-bottom: 10px;
  }

  .item {
    width: 100%;
    display: flex;
    column-gap: 30px;
  }

  .overview {
    resize: none;
    width: 100%;
    height: 100px;
    margin-top: 20px;
    background-color: transparent;
    border: 1px solid var(--theme1);
    outline: none;
    font-family: var(--font-family1);
    padding: 10px;
    border-radius: 12px;

    &::placeholder {
      font-weight: var(--font-w-400);
    }
  }

  .company-logo {
    width: 100%;
    height: 50px;
    background-color: var(--theme1);
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);

    input[type="file"] {
      display: none;
    }
  }

  .error-container {
    font-size: var(--small);
    color: var(--btn-red);
    text-align: center;
    margin-top: 20px;
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    .btn {
      background-color: transparent;
      border: none;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--theme1);
      padding: 10px 40px;
      color: var(--white);
      cursor: pointer;

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
      .job-details {
        flex-direction: column;
      }
    }
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    padding-right: 0;

    .form-container {
      .item {
        flex-direction: column;
      }

      .btn-container {
        row-gap: 20px;
      }
    }
  }
`;

const SuccessContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    background-color: var(--theme1);
    padding: 20px 50px;
    display: flex;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
    font-size: var(--small);
    box-shadow: 0 0 5px 0 var(--gray);
    color: var(--white);
    animation: zoomInOut 1s alternate infinite ease-in-out;

    img {
      width: 15px;
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
`;
