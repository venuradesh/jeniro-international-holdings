import React from "react";
import styled from "styled-components";
import InputFeild from "../InputFeild";

function AddJobs() {
  return (
    <Container>
      <div className="title-container">Add a Job</div>
      <form className="form-container">
        <div className="company-info item">
          <InputFeild type="text" content="Company Name" id="company-name" />
          <InputFeild type="text" content="Work Location" id="location" />
        </div>
        <textarea name="company-overview" id="company-overview" className="company-overview overview" placeholder="Company Overview"></textarea>
        <div className="company-email item">
          <InputFeild type="text" content="Company email (not visible)" id="company-email" />
          <InputFeild type="tel" content="Company phone (not visible)" id="company-phone" />
        </div>
        <div className="company-logo" onClick={() => document.getElementById("company-logo").click()}>
          Add Company Logo
          <input type="file" name="company-logo" id="company-logo" accept="image/jpeg, image/jpg, image/png" />
        </div>
        <div className="job-main item">
          <InputFeild type="text" content="Job Title" id="job-title" />
          <InputFeild type="text" content="Job Type (Full Time, Part Time, Remote)" id="job-type" />
        </div>
        <div className="job-details item">
          <InputFeild type="text" content="Application Deadline (YYYY-MM-DD)" id="application-deadline" />
          <InputFeild type="number" content="Salary Per Month in $" id="Salary per month" />
          <InputFeild type="text" content="Working Experiance Required" id="working-experience" />
        </div>
        <div className="job-overview item">
          <textarea name="job-overview" id="job-overview" className="job-overview overview" placeholder="Job Overview"></textarea>
          <textarea name="job-resp" id="job-resp" className="job-resp overview" placeholder="Job Responsibilities"></textarea>
        </div>
        <textarea name="job-req" id="job-req" className="job-req overview" placeholder="Job Requirements"></textarea>
        <div className="btn-container item">
          <button type="submit" className="submit btn">
            Submit
          </button>
          <button type="reset" className="reset btn">
            Reset
          </button>
        </div>
      </form>
    </Container>
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
