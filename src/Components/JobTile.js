import React from "react";
import styled from "styled-components";

//images
import CompanyLogo from "../assets/company-logo.jpg";
import Location from "../assets/location.png";
import Time from "../assets/time.png";

function JobTile({ admin = false }) {
  return (
    <Container>
      <div className="job-overview">
        <div className="company-logo"></div>
        <div className="content-container">
          <div className="job-title">
            Software Developer <span className="dash">-</span>
            <span> Toyota New Zealand</span>
          </div>
          <div className="job-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis hic modi animi dolore, autem enim sequi excepturi recusandae unde cum rem harum aliquid laudantium, error necessitatibus, suscipit inventore ipsam placeat.</div>
          <div className="items">
            <div className="location item">
              <img src={Location} alt="location" />
              Colombo, Sri Lanka
            </div>
            <div className="time item">
              <img src={Time} alt="expiring time" />
              Expires on 2022-11-02
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <div className="view-btn btn">View Job</div>
        {!admin ? <div className="apply-btn btn">Apply Now</div> : <div className="delete-btn btn">Delete Job</div>}
      </div>
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
      background-image: url(${CompanyLogo});
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
        width: 600px;
        height: 20px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--ex-small);
        color: var(--btn-color-alt);

        @media only screen and (max-width: 1430px) {
          width: 400px;
        }

        @media only screen and (max-width: 1140px) {
          width: 300px;
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
