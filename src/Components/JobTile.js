import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

//images
import Location from "../assets/location.png";
import Time from "../assets/time.png";

// const API_URL = "http://localhost:5000";
const API_URL = "https://jeniro-international-holdings.herokuapp.com";

function JobTile({ admin = false, jobDetails, id, componentRerender }) {
  const [deleteClicked, setDeleteClicked] = useState(false);

  useEffect(() => {
    console.log(jobDetails);
    console.log("within");
  });

  const onDeleteBtnClick = () => {
    axios
      .delete(`${API_URL}/deleteJob`, {
        headers: {
          jobid: id,
          filepath: jobDetails.logoPath,
        },
      })
      .then((response) => {
        console.log(response);
        if (!response.data.error) {
          setDeleteClicked(false);
          componentRerender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container cover={jobDetails.companyLogo}>
      <div className="job-overview">
        <div className="company-logo"></div>
        <div className="content-container">
          <div className="job-title">
            {jobDetails.jobTitle} <span className="dash">-</span>
            <span> {jobDetails.companyName}</span>
          </div>
          <div className="job-desc">{jobDetails.jobOverview}</div>
          <div className="items">
            <div className="location item">
              <img src={Location} alt="location" />
              {jobDetails.workLocation}
            </div>
            <div className="time item">
              <img src={Time} alt="expiring time" />
              Expires on {jobDetails.applicationDeadline}
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <div className="view-btn btn">View Job</div>
        {!admin ? (
          <div className="apply-btn btn">Apply Now</div>
        ) : (
          <div
            className="delete-btn btn"
            onClick={() => {
              setDeleteClicked(true);
            }}
          >
            Delete Job
          </div>
        )}
      </div>
      {deleteClicked ? (
        <DeleteConfirmation>
          <div className="delete-container">
            <div className="content">Do you want really to Delete this Job? (You cannot recover it later)</div>
            <div className="btn-container-on-delete">
              <div className="btn yes" onClick={() => onDeleteBtnClick()}>
                {" "}
                Yes
              </div>
              <div className="btn no" onClick={() => setDeleteClicked(false)}>
                No
              </div>
            </div>
          </div>
        </DeleteConfirmation>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default JobTile;

const Container = styled.div`
  width: 100%;
  height: max-content;
  background-color: white;
  box-shadow: 0 0 5px 0 var(--gray);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  position: relative;

  .job-overview {
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: 20px;

    .company-logo {
      width: 150px;
      height: 100px;
      background-image: url(${(props) => props.cover});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      object-fit: cover;
    }

    .content-container {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;

      @media only screen and (max-width: 1180px) {
        flex: 1;
      }

      .job-title {
        display: flex;
        align-items: center;
        font-size: var(--normal);
        font-weight: var(--font-w-700);
        color: var(--theme1);
        column-gap: 10px;
      }

      .job-desc {
        width: 100%;
        max-width: 90%;
        height: 40px;
        display: flex;
        align-items: flex-start;
        overflow: hidden;
        font-size: var(--ex-small);
        color: var(--btn-color-alt);

        @media only screen and (max-width: 1430px) {
          /* width: 400px; */
        }

        @media only screen and (max-width: 1140px) {
          /* width: 300px; */
        }
      }

      .items {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 50px;

        .item {
          font-size: var(--ex-small);
          display: flex;
          align-items: center;
          column-gap: 10px;

          img {
            width: 15px;
          }
        }
      }
    }
  }

  .btn-container {
    width: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;

    .btn {
      background-color: var(--theme1);
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      font-size: var(--small);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--btn-color-alt);
      }
    }
  }

  @media only screen and (max-width: 1080px) {
    .job-overview {
      .content-container {
        .job-title {
          width: 100%;
          flex-direction: column;
          text-align: center;

          .dash {
            display: none;
          }

          span {
            font-size: var(--small);
          }
        }

        .job-desc {
          display: none;
        }

        .items {
          flex-direction: column;
          row-gap: 10px;
        }
      }
    }
  }

  @media only screen and (max-width: 950px) {
    flex-direction: column;

    .job-overview {
      align-items: flex-start;

      .company-logo {
        width: 70px;
        height: 70px;
      }

      .content-container {
        height: 70px;

        .job-title {
          width: 100%;
          text-align: center;
          flex-direction: row;

          .dash {
            display: block;
          }
        }

        .job-desc {
          display: block;
          height: 20px;
        }

        .items {
          flex-direction: row;
        }
      }
    }

    .btn-container {
      flex-direction: row;
      column-gap: 20px;
      margin-top: 10px;
      width: 100%;

      .btn {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 570px) {
    .job-overview {
      .company-logo {
        width: 80px;
        height: 80px;
      }

      .content-container {
        height: max-content;

        .job-title {
          width: 100%;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;

          .dash {
            display: none;
          }

          span {
            font-size: var(--small);
          }
        }

        .job-desc {
          display: none;
        }

        .items {
          flex-direction: column;
          row-gap: 5px;
          align-items: flex-start;

          .item {
            img {
              width: 10px;
            }
          }
        }
      }
    }
  }
`;

const DeleteConfirmation = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  .delete-container {
    width: 45%;
    height: 70%;
    background-color: var(--theme1);
    min-width: 250px;
    border-radius: 12px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content {
      font-size: var(--small);
      color: var(--white);
      font-weight: var(--font-w-500);
      text-align: center;
    }

    .btn-container-on-delete {
      display: flex;
      width: 100%;
      column-gap: 20px;
      margin-top: 15px;

      .btn {
        flex: 1;
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
        font-size: var(--small);
        cursor: pointer;
        transition: all 0.3s ease;

        &.no {
          background-color: var(--btn-color);

          &:hover {
            background-color: var(--btn-color-alt);
          }
        }

        &.yes {
          background-color: var(--btn-red);

          &:hover {
            background-color: var(--btn-red-alt);
          }
        }
      }
    }
  }
`;
